<style scoped>
  .title{
    line-height: 45px;
    font-size: 16px;
    font-weight: bold;
  }

  .add-banner{
    border: 1px dashed #c1c1c1;
    padding: 10px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .add-banner:hover{
    background-color: #f9f9f9;
  }
</style>

<template>
  <!--banner图片配置-->
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12 title">
          首页banner广告
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Ad-cell-group :cell-list="adData.data"></Ad-cell-group>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="add-banner" @click="addCell">+添加banner</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import swal from 'sweetalert';
  import AdCellGroup from '../AdCellGroup';
  import store from '../../../../store/store';
  import * as  acction from '../../../../actions/actions'

  import baseLib from './baseLib';

  module.exports = {
    props: {},
    data: function () {
      return {
        adData:this.$select('homeAd.modelOneData.data')[0],
      }
    },

    components: {
      AdCellGroup: AdCellGroup
    },
    methods: {
      addCell: function () {
        if (this.adData.data.length < 5) {
          this.adData.data.push(baseLib.initBannerAdCellData())
        } else {
          swal("Banner最多只能添加五张图！", "", "error");
        }
      }
    },
    events: {}
  }
</script>
