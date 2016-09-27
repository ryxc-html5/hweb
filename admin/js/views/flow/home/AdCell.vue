/*
* 图片上传编辑单元组件
* props
* @cellData {object} 包含编辑单元的相关配置项，其中属性如下：
* hideBtn {boolean} 是否显示可以删除按钮
* name {String} 编辑单元名称前缀
* size {object} 包含图片的宽高属性
* tips {String} 提示信息
* src {String} 图片名称，如果没有上传图片则显示“请选择图片！”
* linkTo {String} 跳转地址
* imageUrl {String} 图片上传后的地址
* type {String} 类型，1：网页，2单品，3模版，4搜索，默认网页
*
* yangfei
* 2016-07-16
**/
<style>
  .image-item .panel-heading.sm {
    position: relative;
  }
  .panel-heading .icon-remove {
    display: none;
  }
  .hideBtn.panel-heading .icon-remove {
    float: right;
    display: block;
    cursor: pointer;
  }
  .form-cell{
    line-height: 40px;
  }
</style>
<template>
  <div class="panel panel-default image-item">
    <div class="panel-heading sm" :class="{'hideBtn':cellData.hideBtn}">
      {{cellData.name+(index+1)}}*
      <div class="icon-remove" @click="deleteCell"></div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-12" :style="{ width: cellData.size.width/4+'px', height: cellData.size.height/4 + 'px' }">
          <img :src='cellData.imageUrl' style="width:100%;height:100%;">
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-cell">
          <input v-el:file
                 type="file"
                 class="dn"
                 @change="change($event)"
                 accept="image/gif, image/jpeg, image/png">
          <button class="btn btn-primary btn-sm" type="button" @click="upload">{{btnText}}</button>
          图片尺寸：{{cellData.size.width}}*{{cellData.size.height}} 大小：不超过{{cellData.weight}}KB
        </div>
      </div>

      <div class="form-inline">
        <span>        
          <select class="form-control" v-model="cellData.type" @change="changeType">
          <option v-for="option in urlTypes" :value="option.typeValue" v-if="option.typeValue!=5">
            {{option.typeName}}
          </option>
          </select>
        </span>
        <input class="form-control" type="text" v-model="cLinkTo">
      </div>

    </div>
  </div>
</template>

<script>
  var $ = require('jquery');
  import adminConfig from '../../../../../common/js/config/admin.config';
  module.exports = {
    props: {
      index: {
        type: Number,
        default: 0
      },
      cellData: Object,

      useType: String,
      imgType: String

    },
    data: function () {
      return {
        urlTypes: adminConfig.urlType.data
      }
    },
    computed: {
      btnText: function () {
        if (this.cellData.imageUrl=='') {
          return '上传图片'
        } else {
          return "重新上传图片"
        }
      },
      cLinkTo: {
        get: function () {
          var prefix = adminConfig.urlType.getTypeData(this.cellData.type).prefix;
          return this.cellData.linkTo.split(prefix)[1] || "";
        },
        set: function (val) {
          var prefix = adminConfig.urlType.getTypeData(this.cellData.type).prefix;
          this.cellData.linkTo = prefix + val;
        }
      },
      urlUseType: function () {
        return this.useType || 'admin';
      },
      urlImgType: function () {
        return this.imgType || 'ad';
      }
    },
    components: {},
    methods: {
      changeType:function () {
        this.cellData.linkTo='';
      },
      upload:function () {
        var evt = document.createEvent("MouseEvents");
        evt.initEvent('click', true, true);
        this.$els.file.dispatchEvent(evt);
      },
      failHandler:function (msg) {
        swal('上传失败', msg, 'warning');
        this.$els.file.value = "";
        this.cellData.imageUrl ="";
        return;
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
            thiz.failHandler('图片仅支持 JPG、JPEG、PNG 格式');
            return;
          }
          if (thiz.weight && thiz.weight * 1024 < file.size) {
            thiz.failHandler('图片大小超过限制');
            return;
          }
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
              if (!(parseInt(res.width) === thiz.width)) {
                thiz.failHandler('图片尺寸不符合要求');
                return;
              }
              if (thiz.height && !(parseInt(res.height) === thiz.height)) {
                thiz.failHandler('图片尺寸不符合要求');
                return;
              }
              this.toServer(file);
            }.bind(this), 10);
          }.bind(this);

          reader.readAsDataURL(file);

        } catch (e) {
          alert(JSON.stringify(arguments));
        }
      },
      toServer: function (file) {
        var fd = new FormData();
        var _this = this;
        fd.append("upload_imgs", file);
        var xhr = new XMLHttpRequest();
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
            _this.cellData.imageUrl = resp.origin_img_url;
          } else {
            _this.failHandler('上传图片失败，请重新上传！');
          }
        };
        xhr.send(fd);
      },

      deleteCell: function (event) {
        this.$dispatch('delete', this.cellData)
      }
    },
    events: {}
  }
</script>
