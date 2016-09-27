/*
 * 店铺管理-门店自提-自提模板单元
 * 2016-09-03
 **/
<style scoped>
  .hrt-shopimgs-body {
    background-color: #f6f6f6;
    position: relative;
    padding-top: 25px;
    padding-bottom: 0;
  }
  .hrt-shopimgs-title {
    position: absolute;
    top: 0;
    left: 5px;
    font-size: 20px;
    font-weight: bold;
    color: #999;
  }
  .hrt-shopimgs-delbtn {
    position: absolute;
    top: 0;
    right: 0;
  }
  .hrt-shopimgs-orderbtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>

<template>
  <div class="panel panel-default">
    <div class="panel-body hrt-shopimgs-body">
      <div class="form-horizontal">
        <div class="form-group">
          <label for="storeName" class="col-sm-2 control-label">自提点名称</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="selfDeliveryName" v-model="deliveryCellData.selfDeliveryName" maxLength="20" required="required">
          </div>
          <label for="storeMobile" class="col-sm-2 control-label">联系电话</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="storeMobile" v-model="deliveryCellData.selfDeliveryMobile" maxLength="11" required="required">
          </div>
        </div>
        <div class="form-group">
          <label for="storeAddressDetail" class="col-sm-2 control-label">详细地址</label>
          <div class="col-sm-3">
            <select class="form-control addressProvince" v-model="deliveryCellData.addressProvince" >
              <option v-for="data in ProvinceData" :value="data.crId" >{{ data.crName}}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <select id="addressCity" class="form-control" v-model="deliveryCellData.addressCity" >
              <option v-for="data in CityData" :value="data.crId" >{{ data.crName}}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <select class="form-control" v-model="deliveryCellData.addressArea"> 
              <option v-for="data in AreaData" :value="data.crId" >{{ data.crName}}</option>
            </select>
          </div>

        </div>
        <div class="form-group">
          <label for="addressDetail" class="col-sm-2 control-label"></label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="addressDetail" v-model="deliveryCellData.addressDetail" maxLength="20" required="required">
          </div>
        </div>
      </div>
      <div class="hrt-shopimgs-delbtn">
        <a class="btn btn-danger" @click="delDelivery"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
var ajaxUrl = {
    getData:'/Shop/Store/getCityRegion', //查询市信息
  };
  module.exports = {
    props: {
      deliveryCellData:Object,
      index: Number,
      len: Number
    },
    data: function() {
      return {
            ProvinceData:[],
            CityData:[],
            AreaData:[]
          }
    },
    computed: {
      
    },
    components: {

    },
    methods: {
    getCityRegion:function(postData,type){
      var _this=this;
      var _postData=postData;
          $.ajax({
          url: ajaxUrl.getData,
          type: 'GET',
          data: _postData,
          dataType: 'json',
          beforeSend: function() {
            //hrtCommon.showLoading();
          }
        }).done(function(data) {
          var json=data.data.data;
          if (data.code == '0') {
            switch(type){
              case 0:
                _this.ProvinceData=json;
              
              break;
              case 1:
                _this.CityData=json;
                 
              break;
              case 2:
                _this.AreaData=json;
              break;
              default:
              break;
            }

          } else {
            swal('读取失败', data.msg, 'warning');
          }
        }).fail(function(xhr, exception) {
          hrtCommon.ajaxFail(xhr, exception, '读取失败');
        }).always(function() {
          //hrtCommon.hideLoading();
        });
      },
      getProvinceData:function(){
        var postData={crParentId:1,crType:2};
          this.getCityRegion(postData,0)
      },
      getCityData:function(provinceId){
      //console.log(this.enableOnchange);
        if(this.enableOnchange){
            var postData={crParentId:provinceId,crType:3};
            this.getCityRegion(postData,1)
        } 
      },
      getAreaData:function(cityId){
      if(this.enableOnchange){
        var postData={crParentId:cityId,crType:4};
          this.getCityRegion(postData,2)
          }
      },
      delDelivery: function() {
        this.$dispatch('delDelivery', this.index);
      }
    },
    ready:function(){
      this.getProvinceData();
      }
  }
</script>
