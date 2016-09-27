<template>
  <div class="template-one">
    <!--        <div class="head">
                <span>全 国</span>
                <span>首 页</span>
                <span>附近券</span>
            </div>-->
    <!--banner-->
    <div class="preview-banner">
      <div class="swiper-container banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="item in previewData.banner.data">
            <img :src="item.imageUrl" :linkTo="item.linkTo" @click="open"/>
          </div>
          <!--                    <div class="swiper-slide">
                                  <img src="http://image.5icrc-uat-dmz.crc.com.cn:21203/Tools/Images/show?img_id=148663&origin=1" @click="open"/>
                              </div>
                              <div class="swiper-slide">
                                  <img src="http://image.5icrc-uat-dmz.crc.com.cn:21203/Tools/Images/show?img_id=148663&origin=1" @click="open"/>
                              </div>-->
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <!--ad_1-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData.ad_1.title}}</span><span class="icon-angle-right"></span>
      </div>
      <div class="pre-ad-img-1">
        <img :src="previewData.ad_1.rows[0].items[0].imageUrl" :linkTo="previewData.ad_1.rows[0].items[0].linkTo"
             @click="open">
      </div>
      <div class="pre-ad-img-2">
        <div>
          <img :src="previewData.ad_1.rows[1].items[0].imageUrl" :linkTo="previewData.ad_1.rows[1].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_1.rows[1].items[1].imageUrl" :linkTo="previewData.ad_1.rows[1].items[1].linkTo"
               @click="open">
        </div>
      </div>
      <div class="pre-ad-img-2">
        <div>
          <img :src="previewData.ad_1.rows[2].items[0].imageUrl" :linkTo="previewData.ad_1.rows[2].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_1.rows[2].items[1].imageUrl" :linkTo="previewData.ad_1.rows[2].items[1].linkTo"
               @click="open">
        </div>
      </div>
    </div>
    <!--ad-2-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData.ad_2.title}}</span><span class="icon-angle-right"></span>
      </div>
      <div class="pre-ad-img-1-1">
        <img :src="previewData.ad_2.rows[0].items[0].imageUrl" :linkTo="previewData.ad_2.rows[0].items[0].linkTo"
             @click="open">
      </div>
      <div class="pre-ad-img-3">
        <div>
          <img :src="previewData.ad_2.rows[1].items[0].imageUrl" :linkTo="previewData.ad_2.rows[1].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_2.rows[1].items[1].imageUrl" :linkTo="previewData.ad_2.rows[1].items[1].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_2.rows[1].items[2].imageUrl" :linkTo="previewData.ad_2.rows[1].items[2].linkTo"
               @click="open">
        </div>
      </div>
    </div>
    <!--ad-3-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData.ad_4.title}}</span><span class="icon-angle-right"></span>
      </div>
      <div class="pre-ad-img-4">
        <div>
          <img :src="previewData.ad_3.rows[0].items[0].imageUrl" :linkTo="previewData.ad_3.rows[0].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[0].items[1].imageUrl" :linkTo="previewData.ad_3.rows[0].items[1].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[0].items[2].imageUrl" :linkTo="previewData.ad_3.rows[0].items[2].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[0].items[3].imageUrl" :linkTo="previewData.ad_3.rows[0].items[3].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[0].items[4].imageUrl" :linkTo="previewData.ad_3.rows[0].items[4].linkTo"
               @click="open">
        </div>
      </div>
      <div class="pre-ad-img-3">
        <div>
          <img :src="previewData.ad_3.rows[1].items[0].imageUrl" :linkTo="previewData.ad_3.rows[1].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[1].items[1].imageUrl" :linkTo="previewData.ad_3.rows[1].items[1].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[1].items[2].imageUrl" :linkTo="previewData.ad_3.rows[1].items[2].linkTo"
               @click="open">
        </div>
      </div>
      <div class="pre-ad-img-3">
        <div>
          <img :src="previewData.ad_3.rows[2].items[0].imageUrl" :linkTo="previewData.ad_3.rows[2].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[2].items[1].imageUrl" :linkTo="previewData.ad_3.rows[2].items[1].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_3.rows[2].items[2].imageUrl" :linkTo="previewData.ad_3.rows[2].items[2].linkTo"
               @click="open">
        </div>
      </div>
    </div>
    <!--ad-4-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData.ad_4.title}}</span><span class="icon-angle-right"></span>
      </div>
      <div class="pre-ad-img-5">
        <div class="swiper-container ad-4-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img :src="previewData.ad_4.rows[0].items[0].imageUrl" :linkTo="previewData.ad_4.rows[0].items[0].linkTo"
                   @click="open">
            </div>
            <div class="swiper-slide">
              <img :src="previewData.ad_4.rows[0].items[1].imageUrl" :linkTo="previewData.ad_4.rows[0].items[1].linkTo"
                   @click="open">
            </div>
            <div class="swiper-slide">
              <img :src="previewData.ad_4.rows[0].items[2].imageUrl" :linkTo="previewData.ad_4.rows[0].items[2].linkTo"
                   @click="open">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="pre-ad-img-3">
        <div>
          <img :src="previewData.ad_4.rows[1].items[0].imageUrl" :linkTo="previewData.ad_4.rows[1].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_4.rows[1].items[1].imageUrl" :linkTo="previewData.ad_4.rows[1].items[1].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_4.rows[1].items[2].imageUrl" :linkTo="previewData.ad_4.rows[1].items[2].linkTo"
               @click="open">
        </div>
      </div>
    </div>
    <!--ad-5-->
    <div class="preview-ads">
      <div class="pre-ad-title">
        <span>{{previewData.ad_5.title}}</span><span class="icon-angle-right"></span>
      </div>
      <div class="pre-ad-img-1-1">
        <img :src="previewData.ad_5.rows[0].items[0].imageUrl" :linkTo="previewData.ad_5.rows[0].items[0].linkTo"
             @click="open">
      </div>
      <div class="pre-ad-img-3">
        <div>
          <img :src="previewData.ad_5.rows[1].items[0].imageUrl" :linkTo="previewData.ad_5.rows[1].items[0].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_5.rows[1].items[1].imageUrl" :linkTo="previewData.ad_5.rows[1].items[1].linkTo"
               @click="open">
        </div>
        <div>
          <img :src="previewData.ad_5.rows[1].items[2].imageUrl" :linkTo="previewData.ad_5.rows[1].items[2].linkTo"
               @click="open">
        </div>
      </div>
    </div>
  </div>
</template>
<style>

  .swiper-pagination {
    background-color: initial !important;
  }

  .template-one {
    background-color: #f4f4f4;
  }

  .template-one img {
    height: 100%;
    cursor: pointer;
  }

  .template-one div {
    background-color: #ffffff;
  }

  .template-one .head {
    text-align: center;
    height: 66px;
    line-height: 66px;
    color: #333333;
    font-size: 28px;
  }

  .template-one .head span:first-child {
    background: url("../../../images/Pointer@3.png") no-repeat left 40%;
    background-size: 30px 30px;
    position: absolute;
    left: 15px;
    padding: 0 10px 0 30px;
    font-size: 21px;
    color: #999999;
  }

  .template-one .head span:last-child {
    font-size: 21px;
    color: #999999;
    position: absolute;
    right: 15px;
  }

  .preview-banner {
    height: 250px;
    width: 100%;
    margin-bottom: 15px;
    border: solid #e9e9e9;
    border-width: 1px 0;
  }

  .preview-banner img {
    height: 250px;
  }

  .preview-ads {
    margin-bottom: 15px;
    border: solid #e9e9e9;
    border-width: 1px 0;
  }

  .pre-ad-title {
    position: relative;
    padding: 15px;
    font-size: 21px;
    color: #999999;
    height: 60px;
  }

  .pre-ad-title span:last-child {
    float: right;
  }

  .pre-ad-img-1 {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    height: 205px;
    margin: 0 15px 10px 15px;
  }

  .pre-ad-img-2 {
    margin: 0 15px 10px 15px;
    height: 150px;
  }

  .pre-ad-img-2 div {
    width: 250px;
    height: 150px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
    display: inline-block;
  }

  .pre-ad-img-2 div:last-child {
    float: right;
  }

  .preview-ads .pre-ad-img-2:last-child {
    margin-bottom: 15px;
  }

  .pre-ad-img-1-1 {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    height: 135px;
    margin: 0 15px 10px 15px;
  }

  .pre-ad-img-3 {
    margin: 0 15px 10px 15px;
  }

  .pre-ad-img-3 div {
    width: 165px;
    height: 180px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
    display: inline-block;
    margin-right: 1px;
  }

  .pre-ad-img-3 div:last-child {
    margin-right: 0;
  }

  .preview-ads .pre-ad-img-3:last-child {
    margin-bottom: 15px;
  }

  /*------------------------------------------------------------*/
  .pre-ad-img-4 {
    margin: 0 15px 10px 15px;
  }

  .pre-ad-img-4 div {
    width: 101px;
    height: 172px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
    display: inline-block;
    margin-right: -4px;
  }

  .pre-ad-img-4 div:last-child {
    margin-right: 0;
  }

  /*---------------------------------*/
  .pre-ad-img-5 {
    margin: 0 15px 10px 15px;
    /*width: 1345px;*/
  }

  .pre-ad-img-5 .ad-4-swiper .swiper-wrapper div {
    width: 440px;
    height: 200px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
    /*display: inline-block;*/
    margin-right: 7px;
  }

  .pre-ad-img-5 div:last-child {
    margin-right: 0;
  }
</style>
<script>
  var $ = require('jquery');

  module.exports = {
    props: {
      previewData: Object
    },
    data: function () {
      return {}
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

    }
  }
</script>
