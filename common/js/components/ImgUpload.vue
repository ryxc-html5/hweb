/*
 * 图片上传控件
 * props
 * @progress {function} 回掉函数百分比
 * @setUrl {function} 回掉设置URL的参数
 * @size {object} 图片长宽限制
 * @weight {number} KB为单位的图片大小限制
 * lc
 * 2016-07-07
 *
 * @urlData {object} 图片数据，包含以下属性
 *    @src {string}
 *    @useType {string} 用户类型，可选值：admin、shop，默认值：admin
 *    @imgType {string} 图片标签，可选值：logo、banner、goods、datum、other、ad等，默认值：ad
 * @imgUrl {string} 图片路径
 * @setUrlParam {object} 回调函数传参（当同一页面调用多个图片上传组件时，使用传参识别不同回调）
 * @showImg {number} 图片显示方式，0：不显示，1：上传后显示，2：上传前就已占位显示，默认不显示
 * @showImgStyle {object} 图片显示样式
 * @showImgAlt {string} 图片辅助文案
 * @showCenter {number} 是否居中显示，0：不居中，1：居中，默认不居中
 * @showTips {number} 是否显示提示文案，0：不显示，1：显示，默认不显示
 **/
<style scoped>
  .upload-img-main {
    position: relative;
    margin-bottom: 8px;
  }
  .upload-img-main > p {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-top: -15px;
    text-align: center;
    color: #aaa;
  }
  .upload-img-main > img {
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }
  .upload-center {
    text-align: center;
  }
</style>

<template>
  <div class="image-wraper" :class="{'upload-center': !!showCenter}">
    <div class="upload-img-main" v-show="isShow" :style="showImgStyle">
      <p>{{ showImgAlt }}</p>
      <img :src="imgUrl" v-show="!!imgUrl">
    </div>
    <span>
      <button class="btn btn-primary btn-sm" type="button" @click="upload">{{btnText}}</button>
    </span>
    <!--<span class="image-name">{{urlData.src}}</span>-->
    <input type="file" class="dn" @change="change($event)" accept="image/jpeg, image/png">
    <p class="help-block" v-if="!!showTips">{{ urlData.tips }}</p>
  </div>
</template>

<script>
  var swal = require('sweetalert');
  var $ = require('jquery');
  module.exports = {
    props: {
      size: Object,
      weight: Number,
      progress: Function,
      setUrl: Function,
      setUrlParam: Object,
      urlData: Object,
      imgUrl: String,
      showImg: Number,
      showImgStyle: Object,
      showImgAlt: String,
      showCenter: Number,
      showTips: Number
    },
    computed:{
      btnText: function () {
        if(!this.urlData || !this.urlData.src || this.urlData.src=='请选择图片！'){
          return "上传图片"
        }else{
          return "重新上传图片"
        }
      },
      useType: function() {
        return this.urlData && this.urlData.useType ? this.urlData.useType : 'admin';
      },
      imgType: function() {
        return this.urlData && this.urlData.imgType ? this.urlData.imgType : 'ad';
      },
      isShow: function() {
        return this.showImg == 2 || (this.imgUrl && this.showImg == 1);
      }
    },
    methods: {
      upload: function() {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent('click', true, true);
        $(this.$el).find('input')[0].dispatchEvent(evt);
      },
      change: function(e) {
        var thiz=this;

        if(!e.target.files.length) {
          return false;
        }
        try {
          var reader = new FileReader();
          var file = e.target.files[0];
          if (!file.type.match(/jpeg|jpg|png/)) {
            swal('上传失败', '图片仅支持 JPG、JPEG、PNG 格式', 'warning');
            $(thiz.$el).find('input')[0].value="";
            thiz.errorNotify('图片大小超过限制');
            return;
          }
          if (this.weight && this.weight * 1024 < file.size) {
            swal('上传失败', '图片大小超过限制', 'warning');
            $(thiz.$el).find('input')[0].value="";
            thiz.errorNotify('图片大小超过限制');
            return;
          }
          var size = this.size;
          if(size) {
            reader.onload = function(e) {
              //图片尺寸判断
              var image = document.createElement('img');
              image.style.position = 'absolute';
              image.style.left = '-10000px';
              image.style.top = '-10000px';
              image.src = e.target.result;
              document.body.appendChild(image);
              setTimeout(function() {
                var res = getComputedStyle(image);
                // console.log(parseInt(res.width), parseInt(res.height));
                if(!(parseInt(res.width) === size.width)) {
                  swal('上传失败', '图片尺寸不符合要求', 'warning');
                  $(thiz.$el).find('input')[0].value="";
                  thiz.errorNotify('图片尺寸不符合要求');
                  return;
                }
                if(size.height && !(parseInt(res.height) === size.height)) {
                  swal('上传失败', '图片尺寸不符合要求', 'warning');
                  $(thiz.$el).find('input')[0].value="";
                  thiz.errorNotify('图片尺寸不符合要求');
                  return;
                }
                this.toServer(file);
              }.bind(this),10);
            }.bind(this);

            reader.readAsDataURL(file);
          } else {
            this.toServer();
          }
        } catch(e) {
          alert(JSON.stringify(arguments));
        }
      },
      toServer: function(file) {
        var fd = new FormData();
        var _this = this;
        fd.append("upload_imgs", file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/Tools/Ueditor/?action=uploadimage&encode=utf-8&use=' + this.useType + '&img_action=' + this.imgType, true);

        if(this.progress) {
          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              var percentComplete = (e.loaded / e.total) * 100;
              _this.progress(percentComplete.toFixed(2));
            }
          };
        }
        xhr.onload = function() {
          var resp = JSON.parse(this.response);

          if (this.status === 200) {
            _this.urlData.src=resp.original;
            _this.imgUrl = resp.origin_img_url;
            _this.setUrl(resp, _this.setUrlParam);//调用setUrl回调函数。
          } else {
            swal('上传失败', '请重新上传', 'warning');
          }
        };
        xhr.send(fd);
      },
      errorNotify: function (msg) {
          this.$dispatch('image-upload-error', msg)
      }
    }
  }
</script>
