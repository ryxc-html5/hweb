<template>
  <!--广告位1-->
  <div adl-id="1" class="adv-part">
    <div class="form-item-name">广告位一</div>
    <div class="adv-name-wrapper form-inline">
      <span>广告名称：</span><input placeholder="请输入1-4个汉字的广告名" class="form-control" type="text" name="title"
                               v-model="ad_1.title">
    </div>
    <Img-group type="ad" column="1" :img-cell-list="ad_1.rows[0].items"></Img-group>
    <Img-group type="ad" column="2" :img-cell-list="ad_1.rows[1].items"></Img-group>
    <Img-group type="ad" column="2" :img-cell-list="ad_1.rows[2].items"></Img-group>
  </div>
</template>
<style>

</style>
<script>
  var swal = require('sweetalert');
  var ImgGroup = require('../../components/ImgGroup');
  import { getHomeAdsOne_ad1 } from '../../vuex/action_index'
  module.exports = {
    props: {
      imgCellList: Array
    },
    data: function () {
      return {}
    },
    vuex: {
      getters: {
        ad_1: getHomeAdsOne_ad1
      }
    },
    components: {
      ImgGroup: ImgGroup
    },
    methods: {},
    events: {}
  }
</script>
