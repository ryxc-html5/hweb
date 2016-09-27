/*
 * 店铺管理-店铺信息单元
 * lxw
 * 2016-07-28
 **/
<style scoped>
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">店铺信息</h4>
    </div>
    <div class="panel-body">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="shopName" class="col-sm-2 control-label">店铺名称</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="shopName" v-model="shopName" readonly>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">店铺标志</label>
          <div class="col-sm-10">
            <Img-upload :url-data="uploadImg.flag"
                        :size="uploadImg.flag.size"
                        :weight="uploadImg.flag.weight"
                        :set-url="setUrl"
                        :set-url-param="{type:'flag'}"
                        :img-url="shopFlagPath"
                        :show-img="1"
                        :show-tips="1"></Img-upload>
            <input type="hidden" v-model="shopFlagPath">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">LOGO</label>
          <div class="col-sm-10">
            <Img-upload :url-data="uploadImg.logo"
                        :size="uploadImg.logo.size"
                        :weight="uploadImg.logo.weight"
                        :set-url="setUrl"
                        :set-url-param="{type:'logo'}"
                        :img-url="shopLogo"
                        :show-img="1"
                        :show-tips="1"></Img-upload>
            <input type="hidden" name="imageUrl" v-model="shopLogo">
          </div>
        </div>
        <div class="form-group">
          <label for="siKefuMobile" class="col-sm-2 control-label">客服电话</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="siKefuMobile" v-model="siKefuMobile" maxLength="20">
          </div>
        </div>
        <div class="form-group">
          <label for="siKefuQq" class="col-sm-2 control-label">客服QQ</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="siKefuQq" v-model="siKefuQq" maxLength="20">
          </div>
        </div>
        <div class="form-group">
          <label for="shopDesc" class="col-sm-2 control-label">店铺介绍</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="5" id="shopDesc" v-model="shopDesc" @keyup="checkLength" @blur="checkLength"></textarea>
            <p class="help-block">最多输入200字</p>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-2">
            <button type="submit" class="btn btn-primary btn-lg" @click.prevent="save" data-loading-text="Loading..." autocomplete="off">保 存</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  // import Mock from 'mockjs';
  import ImgUpload from '../../../../common/js/components/ImgUpload';

  var ajaxUrl = {
    getInfo: '/Shop/ContentManagement/getBaseInfo',
    setInfo: '/Shop/ContentManagement/saveBaseInfo'
  };

  /*
  Mock.mock(ajaxUrl.getInfo, {
    code: '0',
    data: {
      'shopDesc': '@name',
      'shopLogoPath': '',
      'shopName': '@name',
      'siKefuMobile|22222222-99999999': 22228888,
      'siKefuQq|10000-99999': 10000
    },
    msg: ''
  });

  Mock.mock(ajaxUrl.setInfo, {
    code: '0',
    data: {},
    msg: ''
  });
  */

  module.exports = {
    data: function() {
      return {
        username: '',
        shopId: '',
        shopDesc: '',
        shopName: '',
        siKefuMobile: '',
        siKefuQq: '',
        shopLogo: '',
        shopFlagPath: '',
        uploadImg: {
          flag: hrtCommon.getUploadObj({
            width: 1080,
            height: 200,
            imgType: 'logo'
          }),
          logo: hrtCommon.getUploadObj({
            width: 180,
            height: 80,
            imgType: 'logo'
          })
        }
      }
    },
    components: {
      ImgUpload: ImgUpload
    },
    methods: {
      setUrl: function(data, param) {
        if (data.state != 'SUCCESS') {
          swal('上传失败', data.state, 'warning');
        } else {
          if (param.type == 'flag') {
            this.shopFlagPath = data.origin_img_url;
          }
          if (param.type == 'logo') {
            this.shopLogo = data.origin_img_url;
          }
        }
      },
      checkLength: function() {
        if (this.shopDesc.length > 200) {
          this.shopDesc = this.shopDesc.substr(0,200);
        }
      },
      save: function(e) {
        if (!this.shopFlagPath) {
          swal('保存失败', '请上传店铺标志', 'warning');
          return false;
        }
        if (!this.shopLogo) {
          swal('保存失败', '请上传LOGO图片', 'warning');
          return false;
        }
        if (!$.trim(this.siKefuMobile)) {
          swal('保存失败', '请填写客服电话', 'warning');
          return false;
        }
        if (!$.trim(this.siKefuQq)) {
          swal('保存失败', '请填写客服QQ', 'warning');
          return false;
        }
        if (!this.siKefuQq.match(/^[1-9][0-9]{4,}$/)) {
          swal('保存失败', '请正确填写客服QQ', 'warning');
          return false;
        }
        if (!$.trim(this.shopDesc)) {
          swal('保存失败', '请填写店铺介绍', 'warning');
          return false;
        }
        var $this = $(e.target);
        var setData = {
          shopId: this.shopId,
          shopDesc: this.shopDesc,
          shopLogo: this.shopLogo,
          siKefuMobile: this.siKefuMobile,
          siKefuQq: this.siKefuQq,
          shopFlagPath: this.shopFlagPath
        };
        $.ajax({
          url: ajaxUrl.setInfo,
          type: 'POST',
          data: setData,
          dataType: 'json',
          beforeSend: function() {
            $this.button('loading');
            hrtCommon.showLoading(true);
          }
        }).done(function(data) {
          if (data.code == '0') {
            swal('保存成功', '', 'success');
          } else {
            swal('保存失败', data.msg, 'warning');
          }
        }).fail(function(xhr, exception) {
          hrtCommon.ajaxFail(xhr, exception, '保存失败');
        }).always(function() {
          $this.button('reset');
          hrtCommon.hideLoading(true);
        });
      }
    },
    ready: function() {
      var _this = this;
      $.ajax({
        url: ajaxUrl.getInfo,
        type: 'GET',
        data: {},
        dataType: 'json',
        beforeSend: function() {
          hrtCommon.showLoading();
        }
      }).done(function(data) {
        var json = data.data;
        if (data.code == '0') {
          _this.username = json.siContact;
          _this.shopId = json.shopId;
          _this.shopDesc = json.shopDesc;
          _this.shopName = json.shopName;
          _this.siKefuMobile = json.siKefuMobile;
          _this.siKefuQq = json.siKefuQq;
          _this.shopLogo = json.shopLogoPath;
          _this.shopFlagPath = json.shopFlagPath;
        } else {
          swal('读取失败', data.msg, 'warning');
        }
      }).fail(function(xhr, exception) {
        hrtCommon.ajaxFail(xhr, exception, '读取失败');
      }).always(function() {
        hrtCommon.hideLoading();
      });
    }
  }
</script>
