<style scoped>
  .image-wraper {
    border: 1px solid #cccccc;
    padding-top: 10px;
  }

  .image-wraper .img-container {
    border: 1px solid #cccccc;
  }

  .hrt-tips {
    padding: 10px;
    color: #cccccc;
  }

  .btn-wrapper{
    height: 40px;
    line-height: 40px;
  }

  .form-group{

    margin: 0 3px 3px 3px!important;
  }
</style>

<template>
  <div class="container-fluid image-wraper" >
    <div class="row">
      <div class="col-md-4">
        <img :src="imageData.imageUrl"
             style="width:100%;height:100%">
        <input type="file"
               class="dn"
               @change="change($event)"
               accept="image/gif, image/jpeg, image/png">
      </div>
<!--    </div>
    <div class="row">-->
      <div class="col-md-8 text-left">
        <div class="form-horizontal">
          <div class="form-group">
            <label class="col-sm-4 control-label">链接类型</label>
            <div class="col-sm-8">
              <select class="form-control" v-model="imageData.type">
                <option v-for="option in urlTypes" :value="option.typeValue" v-if="option.typeValue!=5">{{option.typeName}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label">{{cUrlTypeLabel}}</label>
            <div class="col-sm-8">
              <input v-model="cLinkTo" type="text" class="form-control" placeholder="">
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-4 control-label">图片描述</label>
            <div class="col-sm-8">
              <input v-model="imageData.desc" type="text" class="form-control" placeholder="最多输入20个字">
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-left hrt-tips">
        &nbsp;图片尺寸：{{imageData.size.width}}*{{imageData.size.height}} 大小：不超过{{imageData.weight}}KB
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center btn-wrapper">
        <button class="btn btn-primary btn-sm" type="button" @click="upload">{{btnText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  var swal = require('sweetalert');
  var $ = require('jquery');
  import hrtAdminConfig from '../../../../../../common/js/config/admin.config';

  module.exports = {
    props: {
      imageData:Object,//size(width,height),weight,imageUrl,desc
      //上传成功回调函数
      success: {
        type: Function,
        default: function () {
        }
      },
      //上传失败回调函数
      fail: {
        type: Function,
        default: function () {
          this.imageData.imageUrl='';
          this.imageData.src='请选择图片！';
        }
      },

      progress: {
        type: Function,
        default: function () {
        }
      },

      useType: String,
      imgType: String
    },
    data: function () {
      return {
        urlData: {
          src: "请选择图片！"
        },
        urlTypes:hrtAdminConfig.urlType.data
      }
    },
    computed: {
      cLinkTo:{
        get:function(){
          var prefix=hrtAdminConfig.urlType.getTypeData(this.imageData.type).prefix;
          return this.imageData.linkTo.split(prefix)[1]||"";
        },
        set: function (val) {
          var prefix=hrtAdminConfig.urlType.getTypeData(this.imageData.type).prefix;
          this.imageData.linkTo=prefix+val;
        }
      },
      cUrlTypeLabel:{
        get:function () {
          return hrtAdminConfig.urlType.getTypeData(this.imageData.type).typeLabel;
        }
      },
      btnText: function () {
        if (!this.urlData || !this.urlData.src || this.urlData.src == '' || this.urlData.src == '请选择图片！') {
          return "上传图片"
        } else {
          return "重新上传图片"
        }
      },
      urlUseType: function () {
        return this.useType || 'admin';
      },
      urlImgType: function () {
        return this.imgType || 'ad';
      }
    },
    methods: {
      upload: function () {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent('click', true, true);
        $(this.$el).find('input')[0].dispatchEvent(evt);
      },
      change: function (e) {
        var thiz = this;

        if (!e.target.files.length) {
          return false;
        }
        try {
          var reader = new FileReader();
          var file = e.target.files[0];
          if (!file.type.match(/jpeg|jpg|png/)) {
            swal('上传失败', '图片仅支持 JPG、JPEG、PNG 格式', 'warning');
            $(thiz.$el).find('input')[0].value = "";
            thiz.fail('图片仅支持 JPG、JPEG、PNG 格式');
            return;
          }
          if (thiz.imageData.weight && thiz.imageData.weight * 1024 < file.size) {
            swal('上传失败', '图片大小超过限制!', 'warning');
            $(thiz.$el).find('input')[0].value = "";
            thiz.fail('图片大小超过限制');
            return;
          }
          var size = thiz.imageData.size;
          if (size) {
            reader.onload = function (e) {
              //图片尺寸判断
              var image = document.createElement('img');
              image.style.position = 'absolute';
              image.style.left = '-10000px';
              image.style.top = '-10000px';
              image.src = e.target.result;
              document.body.appendChild(image);
              setTimeout(function () {
                var res = getComputedStyle(image);
                if (!(parseInt(res.width) === size.width)) {
                  swal('上传失败', '图片尺寸不符合要求', 'warning');
                  $(thiz.$el).find('input')[0].value = "";
                  thiz.fail('图片尺寸不符合要求');
                  return;
                }
                if (size.height && !(parseInt(res.height) === size.height)) {
                  swal('上传失败', '图片尺寸不符合要求', 'warning');
                  $(thiz.$el).find('input')[0].value = "";
                  thiz.fail('图片尺寸不符合要求');
                  return;
                }
                this.toServer(file);
              }.bind(this), 10);
            }.bind(this);

            reader.readAsDataURL(file);
          } else {
            this.toServer();
          }
        } catch (e) {
          alert(JSON.stringify(arguments));
        }
      },
      toServer: function (file) {
        var fd = new FormData();
        var _this = this;
        fd.append("upload_imgs", file);
        var xhr = new XMLHttpRequest();
//        xhr.open('POST', 'http://'+hrtCommon.config.imageUploadServer+'/Tools/Ueditor/?action=uploadimage&encode=utf-8&use=' + this.urlUseType + '&img_action=' + this.urlImgType, true);
        xhr.open('POST', '/Tools/Ueditor/?action=uploadimage&encode=utf-8&use=' + this.urlUseType + '&img_action=' + this.urlImgType, true);

        if (this.progress) {
          xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
              var percentComplete = (e.loaded / e.total) * 100;
              _this.progress(percentComplete.toFixed(2));
            }
          };
        }
        xhr.onload = function () {
          var resp = JSON.parse(this.response);

          if (this.status === 200) {
            _this.urlData.src = resp.original;
//            $('img', _this.$el).attr('src', resp.origin_img_url);
            _this.imageData.imageUrl=resp.origin_img_url;
            _this.success(resp);//调用setUrl回调函数。
          } else {
            swal('上传图片失败，请重新上传！');
            _this.fail('上传图片失败，请重新上传！');
          }
        };
        xhr.send(fd);
      }
    }
  }
</script>
