<style scoped>
  .title {
    height: 34px;
    line-height: 34px;
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="title">
          <div class="form-group">
            <label class="col-sm-2 control-label text-left"></label>

            <div class="col-sm-4">
            </div>
            <div class="col-sm-6">
              <button type="submit" class="btn btn-default" @click="addGroup">新增广告</button>
              最多{{countLimit}}款
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-12" v-for="item in tabData.groups" track-by="$index">
            <group-b :group-data="item"
                     :del="deleteGroup"
                     :up="up"
                     :down="down"></group-b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var swal = require('sweetalert');
  import GroupB from './GroupB';

  module.exports = {
    props: {
      tabData: Object
    },
    data: function () {
      return {
        countLimit:10
      }
    },
    computed: {},
    components: {
      GroupB: GroupB
    },
    methods: {
      /**
       * 新增单品
       */
      addGroup: function () {
        if (this.tabData.groups.length > (this.countLimit-1)) {
          swal("最多只能增加"+this.countLimit+"款!", "", "error");
          return;
        }

        this.tabData.groups.push({
          type:"group-b",
          items:[
            {
              "title": "",//主标题
              "subTitle":"",//副标题
              "desc":"",//描述

              "shareUrl": "",//暂时无用
              "name": "",//暂时无用
              "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
              "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

              "hideBtn": true,//是否显示删除按钮
              "type": "1",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
              "linkTo": "",//如果type是0（图片），则不需要填该属性值
              "imageUrl": "",//图片地址
              "size": {
                "width": 1020,
                "height": 360
              },
              "weight": 100
            },
            {
              "title": "",//主标题
              "subTitle":"",//副标题
              "desc":"",//描述

              "shareUrl": "",//暂时无用
              "name": "",//暂时无用
              "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
              "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

              "hideBtn": true,//是否显示删除按钮
              "type": "1",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
              "linkTo": "",//如果type是0（图片），则不需要填该属性值
              "imageUrl": "",//图片地址
              "size": {
                "width": 502,
                "height": 255
              },
              "weight": 70
            },
            {
              "title": "",//主标题
              "subTitle":"",//副标题
              "desc":"",//描述

              "shareUrl": "",//暂时无用
              "name": "",//暂时无用
              "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
              "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

              "hideBtn": true,//是否显示删除按钮
              "type": "1",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
              "linkTo": "",//如果type是0（图片），则不需要填该属性值
              "imageUrl": "",//图片地址
              "size": {
                "width": 502,
                "height": 255
              },
              "weight": 70
            }
          ]
        })
      },
      deleteGroup: function (data) {
        var thiz = this;
        swal({
          title: "是否确定删除该楼层?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            let items = thiz.tabData.groups;
            items.$remove(data);
            swal("成功删除", "", "success");
          } else {
            swal("已取消", "", "error");
          }
        });

      },
      up: function (data) {
        let index = 0;
        let items = this.tabData.groups;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }

        if (index == 0) {
          return
        } else {
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp = items[index - 1];
          items.$set(index - 1, items[index]);
          items.$set(index, temp);
        }
      },
      down: function (data) {
        let index = 0;
        let items = this.tabData.groups;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }

        if (index == items.length - 1) {
          return
        } else {
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp = items[index + 1];
          items.$set(index + 1, items[index]);
          items.$set(index, temp);
        }
      }
    },
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    ready: function () {

    }

  }
</script>
