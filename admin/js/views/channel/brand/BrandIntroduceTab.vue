<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <span class="title">
            品牌介绍图：
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <Brand-banner-image :image-data="introduceData.data[0]"></Brand-banner-image>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .title {
    height: 40px;
    line-height: 40px;
  }
</style>
<script>
  import BrandBannerImage from './BrandBannerImage.vue';
  module.exports = {
    props: {
      introduceData:Object
    },
    data: function () {
      return {}
    },
    computed: {},
    components: {
      BrandBannerImage: BrandBannerImage
    },
    methods: {}
  }
</script>
