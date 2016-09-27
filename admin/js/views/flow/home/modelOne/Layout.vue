<style scoped>
  .reference-model {
    width: 322px;
    color: #cccccc;
    text-align: center;
    border: 1px solid #C1C1C1;
  }

  .model-head {
    height: 45px;
    line-height: 45px;
    font-size: 18px;
  }

  .model-banner {
    height: 125px;
    line-height: 125px;
    width: 100%;
    margin-bottom: 10px;
    border: 1px dashed #cccccc;
  }

  .model-ads {
    margin-bottom: 10px;
    border: 1px dashed #cccccc;
    overflow-x: hidden;
  }

  .model-ad-title {
    padding: 10px;
    text-align: left;
  }

  .model-ad-img-1 {
    border: 1px dashed #cccccc;
    border-radius: 4px;
    height: 80px;
    line-height: 80px;
    margin: 0 10px 5px 10px;
  }

  .model-ad-img-2 {
    margin: 0 10px 5px 10px;
  }

  .model-ad-img-2 div {
    width: 147px;
    height: 75px;
    line-height: 75px;
    border-radius: 4px;
    border: 1px dashed #cccccc;
    display: inline-block;
  }

  .model-ad-img-2 div:last-child {
    float: right;
  }

  .model-ad-img-3 {
    margin: 0 10px 5px 10px;
  }

  .model-ad-img-3 div {
    width: 96px;
    height: 105px;
    line-height: 105px;
    border-radius: 4px;
    border: 1px dashed #cccccc;
    display: inline-block;
    margin-right: 1px;
  }

  .model-ad-img-3 div:last-child {
    margin-right: 0;
  }

  .model-ad-img-4 {
    margin: 0 10px 5px 10px;
  }

  .model-ad-img-4 div {
    width: 52px;
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
    border: 1px dashed #cccccc;
    display: inline-block;
    margin-right: 5px;
  }

  .model-ad-img-4 div:last-child {
    margin-right: 0;
  }

  .model-ad-img-5 {
    margin: 0 10px 5px 10px;
    width: 850px;
  }

  .model-ad-img-5 div {
    width: 275px;
    height: 125px;
    line-height: 125px;
    border-radius: 4px;
    border: 1px dashed #cccccc;
    display: inline-block;
    margin-right: 7px;
  }

  .model-ad-img-5 div:last-child {
    margin-right: 0;
  }
</style>

<template>
  <div class="reference-model">
    <!--此处放于预览内容-->
    <div class="model-head">
      <span>首 页</span>
    </div>
    <!--banner-->
    <div class="model-banner">首页Banner</div>
    <!--ad_1-->
    <div class="model-ads">
      <div class="model-ad-title">广告位一</div>
      <div class="model-ad-img-1">图1-1-1</div>
      <div class="model-ad-img-2">
        <div>图1-2-1</div>
        <div>图1-2-2</div>
      </div>
      <div class="model-ad-img-2">
        <div>图1-3-1</div>
        <div>图1-3-2</div>
      </div>
    </div>
    <!--ad-2-->
    <div class="model-ads">
      <div class="model-ad-title">广告位二</div>
      <div class="model-ad-img-1">图2-1-1</div>
      <div class="model-ad-img-3">
        <div>图2-2-1</div>
        <div>图2-2-2</div>
        <div>图2-2-3</div>
      </div>
    </div>
    <!--ad-3-->
    <div class="model-ads">
      <div class="model-ad-title">广告位三</div>
      <div class="model-ad-img-4">
        <div>图3-1-1</div>
        <div>图3-1-2</div>
        <div>图3-1-3</div>
        <div>图3-1-4</div>
        <div>图3-1-5</div>
      </div>
      <div class="model-ad-img-3">
        <div>图3-2-1</div>
        <div>图3-2-2</div>
        <div>图3-2-3</div>
      </div>
      <div class="model-ad-img-3">
        <div>图3-3-1</div>
        <div>图3-3-2</div>
        <div>图3-3-3</div>
      </div>
    </div>
    <!--ad-4-->
    <div class="model-ads">
      <div class="model-ad-title">广告位四</div>
      <div class="model-ad-img-5">
        <div>图4-1-1</div>
        <div>图4-1-2</div>
        <div>图4-1-3</div>
      </div>
      <div class="model-ad-img-3">
        <div>图4-2-1</div>
        <div>图4-2-2</div>
        <div>图4-2-3</div>
      </div>
    </div>
    <!--ad-5-->
    <div class="model-ads">
      <div class="model-ad-title">广告位五</div>
      <div class="model-ad-img-1">
        <div>图5-1-1</div>
      </div>
      <div class="model-ad-img-3">
        <div>图5-2-1</div>
        <div>图5-2-2</div>
        <div>图5-2-3</div>
      </div>
    </div>

  </div>
</template>

<script>
  module.exports = {
    props: {},
    data: function () {
      return {}
    },
    methods: {}
  }
</script>
