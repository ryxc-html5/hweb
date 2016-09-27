<template>
  <!--广告位1-->
  <div adl-id="1" class="adv-part">
    <div class="form-item-name">广告位 {{index+1}}</div>
    <div class="adv-name-wrapper form-inline">
      <span>广告名称：</span>
      <input placeholder="请输入1-6个字符的广告名"
             class="form-control"
             type="text"
             name="title"
             v-model="data.title">
    </div>
    <Img-group type="ad" column="1" :img-cell-list="data.rows[0].items"></Img-group>
  </div>
</template>
<style>

</style>
<script>
  var swal = require('sweetalert');
  var ImgGroup = require('../../components/ImgGroup');
  import { getCateAdsOne,getCateAdsOneByIndex } from '../../vuex/action_index'
  module.exports = {
    props: {
      index: Number,
      data: Object
    },
    data: function () {
      return {}
    },
    vuex: {
      getters: {},
      actions: {}
    },
    components: {
      ImgGroup: ImgGroup
    },
    methods: {},
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    }
  }
</script>
