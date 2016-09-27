/*
* 图片上传编辑单元组件
* props
* @imgCellData {object} 包含编辑单元的相关配置项，其中属性如下：
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
</style>
<template>
  <div class="panel panel-default image-item">
    <div
            class="panel-heading sm"
            :class="{'hideBtn':imgCellData.hideBtn}">
      {{imgCellData.name+(index+1)}}*
      <div class="icon-remove" @click="deleteCell"></div>
    </div>
    <div class="panel-body">
      <Img-upload
              :url-data="imgCellData"
              :size="imgCellData.size"
              :weight="imgCellData.weight"
              :set-url="setUrl">
      </Img-upload>
      <div class="image-tips">{{imgCellData.tips}}</div>
      <div class="form-inline">
        <span>链接类型：</span>
        <select class="form-control" v-model="imgCellData.type">
          <option v-for="option in urlTypes" :value="option.typeValue" v-if="option.typeValue!=5">{{option.typeName}}
          </option>
        </select>
      </div>
      <div class="url-wrapper">
        <span>{{cUrlTypeLabel}}：</span>
        <input name="linkTo" placeholder="" class="form-control" type="text" v-model="cLinkTo">
        <input type="hidden" name="imageUrl" v-model="imgCellData.imageUrl">
      </div>
    </div>
  </div>
</template>

<script>
  var ImgUpload = require('../../../common/js/components/ImgUpload');
  var $ = require('jquery');
  import hrtAdminConfig from '../../../common/js/config/admin.config';
  module.exports = {
    props: {
      index: Number,
      imgCellData: Object
    },
    data: function () {
      return {
        urlTypes: hrtAdminConfig.urlType.data
      }
    },
    computed: {
      cLinkTo: {
        get: function () {
          var prefix = hrtAdminConfig.urlType.getTypeData(this.imgCellData.type).prefix;
          return this.imgCellData.linkTo.split(prefix)[1] || "";
        },
        set: function (val) {
          var prefix = hrtAdminConfig.urlType.getTypeData(this.imgCellData.type).prefix;
          this.imgCellData.linkTo = prefix + val;
        }
      },
      cUrlTypeLabel: {
        get: function () {
          return hrtAdminConfig.urlType.getTypeData(this.imgCellData.type).typeLabel;
        }
      },
    },
    components: {
      ImgUpload: ImgUpload
    },
    methods: {
      setUrl: function (data) {
        if (data.state != 'SUCCESS') {
          swal("上传图片失败，请重新上传！", data.state, "error")
        } else {
          this.imgCellData.imageUrl = data.origin_img_url;
        }
      },
      deleteCell: function (event) {
        this.$dispatch('delete', this.imgCellData)
      }
    },
    events: {
      'image-upload-error': function (msg) {
        this.imgCellData.imageUrl = '';
        this.imgCellData.src = '请选择图片！';
      }
    }
  }
</script>
