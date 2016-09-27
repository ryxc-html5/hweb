<style lang="less" scoped>
  @backgroundColor:#F4F4F4;
  @white:#fffffF;

  .hrzz-preview{
    background-color: @backgroundColor;
  }

  .hrzz-preview .row{
    margin: 0;
    padding: 0;
  }

  .hrzz-preview .col-sm-12,
  .hrzz-preview .col-sm-7,
  .hrzz-preview .col-sm-5
  {
    padding: 0;
  }

  .banner img {
    width: 640px;
    height: 220px;
  }

  .preview-ads{
    margin: 10px 0;
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

  .cotegory-item{
    width: 140px;
    height: 100%;
    display: inline-block;
    float: left;
    cursor: pointer;
  }


  .cotegory-item.selected,
  .cotegory-item:hover{
    background-color:orange;
    color: #FFFFFF;

  }

  .cotegory-item .image{
    padding: 5px;
  }
  .cotegory-item .image img{
    width: 30px;
    height: 20px;
  }

  .cotegory-item .name{
    height: 30px;
    line-height: 30px;
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
    height: 286px;
  }

  .goodTitle,.goodSubTitle,.goodPrice{
    height: 40px;
    line-height: 40px;
    padding-left: 10px!important;
  }

  .goodTitle{
    color: #0f0f0f;
    font-weight: bold;
  }

  .goodSubTitle{
    color: #8f8f8f;
  }

  .goodPrice{
    color: orange;
  }

</style>

<template>
  <div class="hrzz-preview">
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
    <!--人气推荐-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData[1].title}}</span>
      </div>
      <div class="row good" v-for="good in previewData[1].rows[0].items">
        <div class="col-sm-5">
          <img :src="good.imageUrl" class="goodImg">
        </div>
        <div class="col-sm-7">
          <div class="row">
            <div class="col-sm-12 goodTitle">{{good.title}}</div>
          </div>
          <div class="row">
            <div class="col-sm-12 goodSubTitle">{{good.subTitle}}</div>
          </div>
          <div class="row">
            <div class="col-sm-12 goodPrice">{{good.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--品类单品-->
    <div class="preview-ads">
      <div class="pre-ad-title-tie">
        <div class="swiper-container ad-4-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide cotegory-item"
                 v-bind:class="[$index==0 ? 'selected' : '']"
                 v-for="category in previewData[2].categorys"
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
             :class="['', ($index%2==0) ? 'good-left' : 'good-right']"
             v-for="good in categoryGoods">
          <div class="row">
            <div class="col-sm-12">
              <img :src="good.imageUrl" class="goodImg">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="col-sm-12 goodTitle">{{good.title}}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="col-sm-12 goodSubTitle">{{good.subTitle}}</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 goodPrice">{{good.price}}</div>
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
          if(this.previewData[2].categorys[this.categoryIndex]){
            list=this.previewData[2].categorys[this.categoryIndex].items
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
