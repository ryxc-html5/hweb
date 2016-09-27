<template>
  <!--广告位4-->
  <div adl-id="4" class="adv-part">
    <div class="form-item-name">广告位四</div>
    <div class="adv-name-wrapper form-inline">
      <span>广告名称：</span><input placeholder="请输入1-4个汉字的广告名" class="form-control" type="text" name="title"
                               v-model="ad_4.title">
    </div>
    <Img-group type="ad" column="1" :img-cell-list="ad_4.rows[0].items"></Img-group>
    <Img-group type="ad" column="3" :img-cell-list="ad_4.rows[1].items"></Img-group>
  </div>
</template>
<style>

</style>
<script>
  var swal = require('sweetalert');
  var ImgGroup = require('../../components/ImgGroup');
  import { getHomeAdsOne_ad4 } from '../../vuex/action_index'
  module.exports = {
    props: {
      imgCellList: Array
    },
    data: function () {
      return {}
    },
    vuex: {
      getters: {
        ad_4: getHomeAdsOne_ad4
      }
    },
    components: {
      ImgGroup: ImgGroup
    },
    methods: {},
    events: {}
  }
</script>
