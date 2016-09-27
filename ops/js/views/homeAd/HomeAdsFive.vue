<template>
  <!--广告位5-->
  <div adl-id="5" class="adv-part">
    <div class="form-item-name">广告位五</div>
    <div class="adv-name-wrapper form-inline">
      <span>广告名称：</span><input placeholder="请输入1-4个汉字的广告名" class="form-control" type="text" name="title"
                               v-model="ad_5.title">
    </div>
    <Img-group type="ad" column="1" :img-cell-list="ad_5.rows[0].items"></Img-group>
    <Img-group type="ad" column="3" :img-cell-list="ad_5.rows[1].items"></Img-group>
  </div>
</template>
<style>

</style>
<script>
  var swal = require('sweetalert');
  var ImgGroup = require('../../components/ImgGroup');
  import { getHomeAdsOne_ad5 } from '../../vuex/action_index'
  module.exports = {
    props: {
      imgCellList: Array
    },
    data: function () {
      return {}
    },
    vuex: {
      getters: {
        ad_5: getHomeAdsOne_ad5
      }
    },
    components: {
      ImgGroup: ImgGroup
    },
    methods: {},
    events: {}
  }
</script>
