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
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <img :src='imageSrc' style="width:100%;">
          </div>
          <div class="col-md-8 form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label" style="padding-top:0;"><button class="btn btn-default">获取单品</button></label>
              <div class="col-sm-10">
                <input v-model="cLinkTo" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">名称：</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="name">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">价格：</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="price">
              </div>
            </div>
          </div>
        </div>
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
      cellData: Object
    },
    data: function () {
      return {
        imageSrc:'',
        name:'',
        price:''
      }
    },
    computed: {
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
    },
    components: {},
    methods: {
      deleteCell:function () {

      }
    },
    events: {}
  }
</script>
