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
            <label class="col-sm-2 control-label text-left"></label>

            <div class="col-sm-4">
            </div>
            <div class="col-sm-6">
              <button type="submit" class="btn btn-default" @click="addGood">新增单品</button>
              最多添加{{limitedCount}}款
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-6" v-for="item in tieData.rows[0].items" track-by="$index">
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
  import AutoImageGood from '../common/AutoImageGood';

  module.exports = {
    props: {
      tieData: Object
    },
    data: function () {
      return {
        limitedCount:20
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
        if (this.tieData.rows[0].items.length > (this.limitedCount-1)) {
          swal("最多只能增加"+this.limitedCount+"个商品!", "", "error");
          return;
        }

        this.tieData.rows[0].items.push({
          "title": "",
          "subTitle": "",
          "desc": "",

          "shareUrl": "",
          "name": "",
          "tips": "",
          "src": "",

          "hideBtn": true,
          "type": "5",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
          "linkTo": ""//如果type是0（图片），则不需要填该属性值
        })
      },
      deleteGood: function (data) {
        let thiz=this;

        swal({
          title: "是否确定删除?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            let items = thiz.tieData.rows[0].items;
            items.$remove(data);
            swal("成功删除", "", "success");
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      up: function (data) {
        let index = 0;
        let items = this.tieData.rows[0].items;
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
        let items = this.tieData.rows[0].items;
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
    ready: function () {}
  }
</script>
