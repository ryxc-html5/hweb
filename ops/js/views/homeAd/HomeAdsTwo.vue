<template>
  <!--广告位2-->
  <div adl-id="2" class="adv-part">
    <div class="form-item-name">广告位二</div>
    <div class="adv-name-wrapper form-inline">
      <span>广告名称：</span><input placeholder="请输入1-4个汉字的广告名" class="form-control" type="text" name="title"
                               v-model="ad_2.title">
    </div>
    <Img-group type="ad" column="1" :img-cell-list="ad_2.rows[0].items"></Img-group>
    <Img-group type="ad" column="3" :img-cell-list="ad_2.rows[1].items"></Img-group>
  </div>
</template>
<style>

</style>
<script>
  var swal = require('sweetalert');
  var ImgGroup = require('../../components/ImgGroup');
  import { getHomeAdsOne_ad2 } from '../../vuex/action_index'
  module.exports = {
    props: {
      imgCellList: Array
    },
    data: function () {
      return {}
    },
    vuex: {
      getters: {
        ad_2: getHomeAdsOne_ad2
      }
    },
    components: {
      ImgGroup: ImgGroup
    },
    methods: {},
    events: {}
  }
</script>
