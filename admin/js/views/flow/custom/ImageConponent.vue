<style scoped>
  .no-padding-top {
    padding-top: 0;
  }

  img{
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div class="form-group">
    <label class="col-sm-2 control-label no-padding-top">
      <button @click="upload" class="btn btn-default">{{btnText}}</button>
      <input type="file"
             class="dn"
             @change="change($event)"
             accept="image/gif, image/jpeg, image/png">
    </label>
    <div class="col-sm-10">
      <div style="width:510px;height:135px;border:1px solid #ccc;">
        <img :src="imageUrl">
      </div>
      <div>图片尺寸：{{width}}*{{height}} 大小：不超过{{weight}}KB</div>
    </div>
  </div>
</template>

<script>
  var swal = require('sweetalert');
  var $ = require('jquery');


  export default{
    props: {
      btnLabel:String,
      imageUrl: String,
      width: {
        type: Number,
        default: 1020
      },
      height: {
        type: Number,
        default: 270
      },
      weight: {
        type: Number,
        default: 500
      },
      //上传成功回调函数
      success: {
        type: Function,
        default: function (resp) {
        }
      },
      //上传失败回调函数
      fail: {
        type: Function,
        default: function () {

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

      }
    },
    computed: {
      btnText: function () {
        if (this.imageUrl=='') {
          return this.btnLabel
        } else {
          return "重新"+this.btnLabel
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
      failHandler:function (msg) {
        swal('上传失败', msg, 'warning');
        $(this.$el).find('input')[0].value = "";
        this.imageUrl ="";
        this.fail();
        return;
      },
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
            _this.imageUrl = resp.origin_img_url;
            _this.success(resp);//调用setUrl回调函数。
          } else {
            _this.failHandler('上传图片失败，请重新上传！');
          }
        };
        xhr.send(fd);
      }
    }
  }
</script>
