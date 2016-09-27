<style lang="less" scoped>
  @backgroundColor:#F4F4F4;
  @white:#fffffF;

  .brand-preview{
    background-color: @backgroundColor;
  }

  .brand-preview .row{
    margin: 0;
    padding: 0;
  }

  .brand-preview .col-sm-12,
  .brand-preview .col-sm-7,
  .brand-preview .col-sm-5
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
    position: relative;
    padding: 15px;
    font-size: 21px;
    color: #999999;
    height: 60px;
    text-align: center;
    background-color: @white;
    border-top:1px solid #FCD09F;
    margin-bottom: 5px;
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
  <div class="brand-preview">
    <!--banner-->
    <div class="row banner">
      <div class="col-sm-12">
        <img :src="previewData[0].data[0].imageUrl">
      </div>
    </div>
    <!--人气单品-->
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
    <!--并列单品-->
    <div class="preview-ads">
      <div class="pre-ad-title-tie">
        <div class="row">
          <div class="col-sm-4">价格</div>
          <div class="col-sm-4">销量</div>
          <div class="col-sm-4">新品</div>
        </div>
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
      return {}
    },
    computed:{},
    components: {},
    methods: {},
    events: {},
    ready: function () {
      return ;
    }
  }
</script>
