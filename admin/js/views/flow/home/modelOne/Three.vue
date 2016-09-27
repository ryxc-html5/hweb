<style scoped>
  .title{
    line-height: 45px;
    font-size: 16px;
    font-weight: bold;
  }
</style>

<template>
  <!--广告位三-->
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12 title">
          广告位三
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-horizontal" role="form">

          <div class="form-group">
            <label class="col-sm-2 control-label">广告名称</label>
            <div class="col-sm-10">
              <input v-model="adData.title" type="text" class="form-control" placeholder="请输入1-4个汉字的广告名">
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Ad-cell-group :cell-list="adData.rows[0].items"></Ad-cell-group>
          <Ad-cell-group :cell-list="adData.rows[1].items"></Ad-cell-group>
          <Ad-cell-group :cell-list="adData.rows[2].items"></Ad-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import swal from 'sweetalert';
  import AdCellGroup from '../AdCellGroup';
  import store from '../../../../store/store';
  import * as  acction from '../../../../actions/actions';

  module.exports = {
    props: {},
    data: function () {
      return {
        adData:this.$select('homeAd.modelOneData.data')[3]
      }
    },
    components: {
      AdCellGroup: AdCellGroup
    },
    methods: {},
    events: {}
  }
</script>
