<style scoped>
  .title {
    height: 40px;
    line-height: 40px;
  }

  .strong {
    font-weight: bold;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 title">
        <span class="strong">

        </span>
      </div>
      <div class="col-md-9 title text-right">
        <button class="btn btn-default" @click="add">新增广告图</button>
        <span>最多添加{{limitedCount}}个</span>
      </div>
    </div>
    <div class="row" v-for="image in tabData.rows[0].items">
      <div class="col-md-12 text-center">
        <Banner-image :image-data="image" :del="del" :up="up" :down="down"></Banner-image>
      </div>
    </div>
  </div>
</template>

<script>
  import BannerImage from '../common/BannerImage.vue';
  module.exports = {
    props: {
      tabData: Object
    },
    data: function () {
      return {
        limitedCount:10
      }
    },
    computed: {},
    components: {
      BannerImage: BannerImage
    },
    methods: {
      add: function () {
        if(this.tabData.rows[0].items.length>(this.limitedCount-1)){
          swal("最多只能增加"+this.limitedCount+"个商品!", "", "error");
          return;
        }

        this.tabData.rows[0].items.push({
          "title": "",//主标题
          "subTitle": "",//副标题
          "desc": "",//图片描述

          "shareUrl": "",//暂时无用
          "name": "",//暂时无用
          "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
          "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

          "hideBtn": true,//web端使用，是否显示删除按钮，true显示，false不显示
          "type": "1",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
          "linkTo": "",//跳转连接，如果type是0（图片），则不需要填该属性值
          "imageUrl": "",//图片地址
          "size": {
            "width": 1020,
            "height": 600
          },
          "weight": 100
        });
      },
      del: function (data) {
        var thiz = this;
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
            let items=thiz.tabData.rows[0].items;
            items.$remove(data);
            swal("成功删除", "", "success");
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      up: function (data) {
        let index=0;
        let items=this.tabData.rows[0].items;
        for(let i=0;i<items.length;i++){
          if(items[i]==data){
            index=i;
            break;
          }
        }

        if(index==0){
          return
        }else{
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp=items[index-1];
          items.$set(index-1, items[index]);
          items.$set(index, temp);
        }
      },
      down: function (data) {
        let index=0;
        let items=this.tabData.rows[0].items;
        for(let i=0;i<items.length;i++){
          if(items[i]==data){
            index=i;
            break;
          }
        }

        if(index==items.length-1){
          return
        }else{
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp=items[index+1];
          items.$set(index+1, items[index]);
          items.$set(index, temp);
        }
      }
    }
  }
</script>
