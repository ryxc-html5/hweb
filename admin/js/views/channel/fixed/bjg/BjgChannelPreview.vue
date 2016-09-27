<style lang="less" scoped>
  @backgroundColor:#F4F4F4;
  @white:#fffffF;

  .jjsh-preview{
    background-color: @backgroundColor;
  }

  .jjsh-preview .row{
    margin: 0;
    padding: 0;
  }

  .jjsh-preview .col-sm-12,
  .jjsh-preview .col-sm-4
  {
    padding: 0;
  }

  .banner{

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

  /*推荐活动*/
  .active-recommend{

  }

  .active-recommend .top-image img{
    height: 220px;
  }

  .active-recommend .bottom-images .good{
    width: 180px;
  }

  .active-recommend .bottom-images .good .good-image{
    width: 100%;
  }

  .active-recommend .bottom-images .good .good-title{
    text-align: left;
    color: #0f0f0f;
    font-weight: bold;
  }

  .active-recommend .bottom-images .good .good-price{
    text-align: left;
    color: orange;
    font-weight: bold;
  }

  /*精选活动*/
  .selection-activity {

  }
  .selection-activity .good{
    margin-bottom: 5px;
  }
  .selection-activity .good img{
    /*height: 110px;*/
  }

  /*精选单品*/
  .selection-good{

  }

  .selection-good .good .good-image{
    min-height: 98px;
  }
  .selection-good .good .good-image img{
    width: 100%;
  }

  .selection-good .good .good-title{
    text-align: left;
    color: #0f0f0f;
    font-weight: bold;
  }

  .selection-good .good .good-subtitle{
    text-align: left;
    color: #8f8f8f;
    font-weight: bold;
  }

  .selection-good .good .good-price{
    text-align: left;
    color: orange;
    font-weight: bold;
  }

  /*品类商品*/
  .category-good{
  }

  .category-good .pre-ad-title-tie{
    color: #999999;
    height: 60px;
    text-align: center;
    background-color: @white;
    border-top:1px solid #FCD09F;
    margin-bottom: 5px;
  }
  .category-good .cotegory-item{
    width: 140px;
    height: 100%;
    display: inline-block;
    float: left;
    cursor: pointer;
  }
  .category-good .cotegory-item.selected,
  .category-good .cotegory-item:hover{
    background-color:orange;
    color: #FFFFFF;

  }
  .category-good .cotegory-item .image{
    padding: 5px;
  }
  .category-good .cotegory-item .image img{
    width: 30px;
    height: 20px;
  }
  .category-good .cotegory-item .name{
    height: 30px;
    line-height: 30px;
  }

  .category-good .good{
    padding: 10px 0!important;
    background-color: @white;
  }

  .category-good .good-left,
  .category-good .good-right{
    background-color: @white;
    width: 49.5%!important;
    margin-bottom: 5px;
  }
  .category-good .good-right{
    float: right;
  }
  .category-good .good .good-image img{
    width: 100%;
    height: 286px;
  }
  .category-good .good .good-title{
    padding-left: 10px!important;
    color: #0f0f0f;
    height: 20px;
    line-height: 20px;
  }
  .category-good .good .good-subtitle{
    padding-left: 10px!important;
    color: #8f8f8f;
    height: 20px;
    line-height: 20px;
  }
  .category-good .good .good-price{
    padding-left: 10px!important;
    color: orange;
    height: 20px;
    line-height: 20px;
  }

</style>

<template>
  <div class="jjsh-preview">
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
    <!--活动推荐-->
    <div class="preview-ads active-recommend">
      <div class="pre-ad-title">
        <span>{{previewData[1].title}}</span>
      </div>
      <div class="row top-image">
        <div class="col-sm-12 ">
          <img :src="previewData[1].rows[0].items[0].imageUrl">
        </div>
      </div>
      <div class="row bottom-images">
        <div class="col-sm-12">
          <div class="swiper-container drag-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide good" v-for="item in previewData[1].rows[1].items">
                <img class="good-image" :src="item.imageUrl" :linkTo="item.linkTo" @click="open">
                <div class="good-title">{{item.title}}</div>
                <div class="good-price">{{item.price}}</div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </div>
    <!--精选活动-->
    <div class="preview-ads selection-activity">
      <div class="pre-ad-title">
        <span>{{previewData[2].title}}</span>
      </div>
      <div class="row" >
        <div class="col-sm-12 good" v-for="good in previewData[2].rows[0].items">
          <div class="row">
            <div class="col-sm-12">
              <img :src="good.imageUrl" class="goodImg">
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--精选单品-->
    <div class="preview-ads selection-good">
      <div class="pre-ad-title">
        <span>{{previewData[3].title}}</span>
      </div>
      <div class="row" >
        <div class="col-sm-4 good" v-for="good in previewData[3].rows[0].items">
          <div class="row">
            <div class="col-sm-12 good-image">
              <img :src="good.imageUrl" class="goodImg">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 good-title">
              {{good.title}}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 good-subtitle">
              {{good.subTitle}}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 good-price">
              {{good.price}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--品类楼层-->
    <div class="preview-ads category-good">
      <div class="pre-ad-title-tie">
        <div class="swiper-container drag-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide cotegory-item"
                 v-bind:class="[$index==0 ? 'selected' : '']"
                 v-for="category in previewData[4].categorys"
                 @click="selectCategory($event,$index)">
              <div class="image">
                <img :src="category.image.imageUrl">
              </div>
              <div class="name">
                {{category.name}}
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="row" >
        <div class="col-sm-6"
             :class="['good', ($index%2==0) ? 'good-left' : 'good-right']"
             v-for="good in categoryGoods">
          <div class="row">
            <div class="col-sm-12 good-image">
              <img :src="good.imageUrl" class="goodImg">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 good-title">
              {{good.title}}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 good-subtitle">
              {{good.subTitle}}
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 good-price">
              {{good.price}}
            </div>
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
      categoryGoods:{
        get: function () {
          let list=[];
          if(this.previewData[4].categorys[this.categoryIndex]){
            list=this.previewData[4].categorys[this.categoryIndex].items
          }
          return list;
        }
      }
    },
    components: {},
    methods: {
      selectCategory: function (e,categoryIndex) {
        this.categoryIndex=categoryIndex;
        $(".selected",this.$el).removeClass("selected");
        $(e.target).closest(".cotegory-item").addClass('selected');
      },
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
