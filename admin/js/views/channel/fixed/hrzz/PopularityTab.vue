<style scoped>
  .title {
    height: 34px;
    line-height: 34px;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="title">
          <div class="form-group">
            <label class="col-sm-2 control-label text-left"><!--自定义名称：--></label>

            <div class="col-sm-4">
              <!--<input type="text" class="form-control" v-model="tabData.title" placeholder="不超过10个字符">-->
            </div>
            <div class="col-sm-6">
              <button type="submit" class="btn btn-default" @click="addGood">新增单品</button>
              最多{{limitedCount}}款
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-6" v-for="item in tabData.rows[0].items" track-by="$index">
            <Auto-image-good :image-data="item" :delete-fun="deleteGood" :up-fun="up"
                             :down-fun="down"></Auto-image-good>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var swal = require('sweetalert');
  import AutoImageGood from '../../common/AutoImageGood';

  module.exports = {
    props: {
      tabData: Object
    },
    data: function () {
      return {
        limitedCount:8
      }
    },
    computed: {},
    components: {
      AutoImageGood: AutoImageGood
    },
    methods: {
      /**
       * 新增单品
       */
      addGood: function () {
        if (this.tabData.rows[0].items.length > (this.limitedCount-1)) {
          swal("最多只能增加"+this.limitedCount+"个商品!", "", "error");
          return;
        }

        this.tabData.rows[0].items.push({
          "title": "",//主标题
          "subTitle": "",//副标题
          "desc": "",//描述

          "shareUrl": "",//暂时无用
          "name": "",//暂时无用
          "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
          "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

          "hideBtn": true,//是否显示删除按钮
          "type": "5",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
          "linkTo": ""//如果type是0（图片），则不需要填该属性值

        })
      },
      deleteGood: function (data) {
        var thiz = this;
        swal({
          title: "是否确定删除该商品?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            let items = thiz.tabData.rows[0].items;
            items.$remove(data);
            swal("成功删除", "", "success");
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      up: function (data) {
        let index = 0;
        let items = this.tabData.rows[0].items;
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
        let items = this.tabData.rows[0].items;
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
