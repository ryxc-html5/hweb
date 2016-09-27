<style lang="less" scoped>
  @backgroundColor:#F4F4F4;
  @white:#fffffF;

  .jfpd-preview{
    background-color: @backgroundColor;
  }

  .jfpd-preview .row{
    margin: 0;
    padding: 0;
  }

  .jfpd-preview .col-sm-12,
  .jfpd-preview .col-sm-7,
  .jfpd-preview .col-sm-5
  {
    padding: 0;
  }

  .banner img {
    width: 640px;
    height: 220px;
  }

  .preview-ads{
    margin: 10px 0;
    background-color: #FFFFFF;
  }

  .pre-ad-title {
    position: relative;
    padding: 15px;
    font-size: 21px;
    color: #999999;
    height: 60px;
    text-align: center;
    background-color: @white;
  }

  .pre-ad-title-tie{
    color: #999999;
    height: 60px;
    text-align: center;
    background-color: @white;
    border-top:1px solid #FCD09F;
    margin-bottom: 5px;
  }

  .ad-4-swiper{
    /*height: 140px;*/
    background-color: #FFFFFF;
  }

  .ad-4-swiper .swiper-wrapper{
    width: 180px;
  }

  .ad-4-swiper .swiper-wrapper img{
    width: 100%;
  }

  .ad-4-swiper .swiper-wrapper .good-title,
  .ad-4-swiper .swiper-wrapper .good-price{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .ad-4-swiper .swiper-wrapper .good-title{
    font-weight: bold;
  }

  .ad-4-swiper .swiper-wrapper .good-price{
    color: orange;
  }

  .good{
    border-top: 1px solid #cccccc;
    padding: 10px 0!important;
    background-color: @white;
  }

  .good-left,
  .good-right{
    background-color: @white;
    width: 49.5%!important;
    margin-bottom: 5px;
  }
  .good-right{
    float: right;
  }


  .goodImg{
    width: 100%;
    min-height: 120px;
  }

  .goodTitle,.goodSubTitle,.goodPrice{
    height: 40px;
    line-height: 40px;
    padding-left: 10px!important;
  }

  .row.group-a{
    border-top:1px solid green;
  }

  .group-a .col-sm-6,
  .group-a .col-sm-12
  {
    padding: 0;
  }
  .group-a img{
    height: 110px;
    width: 100%;
  }
  .group-a .top-left-image{
    height: 220px;
    width: 100%;
  }
  .group-a .cell{
    padding: 5px!important;
    overflow: hidden;
  }

  .group-b .col-sm-6,
  .group-b .col-sm-12
  {
    padding: 0;
  }
  .group-b img{
    height: 220px;
    width: 100%;
  }
  .group-b .cell{
    padding: 5px!important;
    overflow: hidden;
  }


</style>

<template>
  <div class="jfpd-preview">
    <!--banner-->
    <div class="row banner">
      <div class="swiper-container banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in previewData[0].data">
            <img :src="item.imageUrl" :linkTo="item.linkTo" @click="open"/>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!--限时抢兑-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData[1].title}}</span>
      </div>
      <div class="pre-ad-img-5">
        <div class="swiper-container ad-4-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in previewData[1].rows[0].items">
              <img :src="item.imageUrl" :linkTo="item.linkTo" @click="open">
              <div class="good-title">{{item.title}}</div>
              <div class="good-price">{{item.price}}</div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
    <!--积分营销-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData[2].title}}</span>
      </div>
      <div class="row" >
        <div class="col-sm-6"
             :class="['', ($index%2==0) ? 'good-left' : 'good-right']"
             v-for="good in previewData[2].rows[0].items">
          <div class="row">
            <div class="col-sm-12">
              <img :src="good.imageUrl" class="goodImg">
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--品类楼层-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData[3].title}}</span>
      </div>
      <div class="row group-a" v-for="group in previewData[3].groups">
        <div class="row">
          <div class="col-sm-6 cell">
            <img class="top-left-image" :src="group.items[0].imageUrl">
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-12 cell">
                <img :src="group.items[1].imageUrl">
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 cell">
                <img :src="group.items[2].imageUrl">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 cell">
            <img :src="group.items[3].imageUrl">
          </div>
          <div class="col-sm-6 cell">
            <img :src="group.items[4].imageUrl">
          </div>
        </div>
      </div>
    </div>
    <!--积分兑换品牌-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData[4].title}}</span>
      </div>
      <div class="row group-b" v-for="group in previewData[4].groups">
        <div class="row">
          <div class="col-sm-12 cell">
            <img :src="group.items[0].imageUrl">
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 cell">
            <img :src="group.items[1].imageUrl">
          </div>
          <div class="col-sm-6 cell">
            <img :src="group.items[2].imageUrl">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var $ = require('jquery');
  import Vue from 'vue';

  module.exports = {

    props: {
      previewData: Array
    },
    data: function () {
      return {
        categoryIndex:0
      }
    },
    computed:{


    },
    components: {},
    methods: {
      open: function (e) {
        var $this = $(e.target);
        var linkTo = $this.attr("linkTo");
        if (linkTo.startsWith('#type=url&url=')) {
          var url = linkTo.split('#type=url&url=')[1];
          window.open(url);
        } else {
          return;
        }
      }
    },
    events: {},
    ready: function () {
      return ;
    }
  }
</script>
