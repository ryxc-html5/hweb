/*
 * 店铺管理-门店信息
 * 2016-09-02
 **/
<style scoped>
  .hrt-shopstores-head {
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">门店信息管理</h4>
    </div>
    <div class="panel-body">
      <div class="row hrt-shopstores-head">
        <div class="col-sm-12 form-group">
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="storeEnabled" :value="0" v-model="storeEnable" @click="enableStore"> 停用
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="storeEnabled" :value="1" v-model="storeEnable" @click="enableStore"> 启用
                    </label>
                    <p class="help-block">启用后，可在编辑商品时选择是否在商详展示门店信息</p>
                </div>
        </div>
        <div class="col-sm-12">
          <a class="btn btn-info" @click="addStore">新增</a>
          <a class="btn btn-info" @click="save">保存</a>
           <span class="help-inline">点击新增，添加可编辑的门店信息列表</span>
        </div>
      </div>
      <Shop-Store-Cell v-for="storeCellData in storelist"
                    :enable-onchange.sync="enableOnchange"
                    :store-cell-data="storeCellData"
                    :index="$index"
                    :len="storelist.length"></Shop-Store-Cell>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  //import Mock from 'mockjs';
  import ShopStoreCell from './ShopStoreCell';

  var ajaxUrl = {
    storeEnable: '/Shop/Store/getStoreEnableById', //查询是否启用门店
    enableStore:'/Shop/Store/enableStoreAddress',//设置门店启用状态
    getInfo: '/Shop/Store/getStoreAddress',  //获取店铺是否启用门店以及门店信息列表
    saveStore: '/Shop/Store/saveStoreAddress',   //保存门店信息列表
    delStore:'/Shop/Store/delStoreAddress'     //删除门店
  };


  // 获取初始化数据
  function GetCellInitData() {
    return {
      storeId:'',
      storeName: '',
      storeMobile: '',
      storeAddressProvince: '',
      storeAddressCity: '',
      storeAddressArea: 0,
      storeAddressDetail: '',
      storeAddressProvinceStr:'',
      storeAddressCityStr:'',
      storeAddressAreaStr:'',
      storeLongitude:'',
      storeLatitude:''
    }
  }


  module.exports = {
    data: function() {
      return {
          storeEnable:0,      
          storelist:[],
          enableOnchange:false
      }
    },
    components: {
      ShopStoreCell: ShopStoreCell
    },
    methods: {
   
      addStore: function() {
        this.storelist.push(GetCellInitData());
      },
      //启用门店
      enableStore:function(e){
        var _this=this;
        var postData={shopStoreEnable:Math.abs(_this.storeEnable-1)};
        console.log(Math.abs(_this.storeEnable-1));
        var $this = $(e.target);
        $.ajax({
              url: ajaxUrl.enableStore,
              type: 'POST',
              data: postData,
              dataType: 'json',
              beforeSend: function() {
                $this.button('loading');
                hrtCommon.showLoading(true);
              }
            }).done(function(data) {
              if (data.code == '0') {
                swal('操作成功', '', 'success');
              } else {
                swal('操作失败', data.msg, 'warning');
              }
            }).fail(function(xhr, exception) {
              hrtCommon.ajaxFail(xhr, exception, '操作失败');
            }).always(function() {
              $this.button('reset');
              hrtCommon.hideLoading(true);
            });
      },
      save: function(e) {
            var i;
            var l;
            var data = this.storelist;
            for (i = 0, l = data.length; i < l; i++) {
              //var index = i + 1;
              //data[i].stsOrder = index;

              if (!$.trim(data[i].storeName) || !$.trim(data[i].storeMobile) || !$.trim(data[i].storeAddressProvince)|| !$.trim(data[i].storeAddressCity) || !$.trim(data[i].storeAddressArea)||!$.trim(data[i].storeAddressDetail) || !$.trim(data[i].storeLongitude)|| !$.trim(data[i].storeLatitude)) {


                swal('发布失败', '请填写完整的门店' + index + '的信息', 'warning');
                return false;
              }
            }
            var $this = $(e.target);
            var postData = {
              storeInfo: data
            };
            console.log(postData);
            $.ajax({
              url: ajaxUrl.saveStore,
              type: 'POST',
              data: postData,
              dataType: 'json',
              beforeSend: function() {
                $this.button('loading');
                hrtCommon.showLoading(true);
              }
            }).done(function(data) {
              if (data.code == '0') {
                swal('保存成功', '', 'success');
              } else {
                swal('保存失败', data.msg, 'warning');
              }
            }).fail(function(xhr, exception) {
              hrtCommon.ajaxFail(xhr, exception, '保存失败');
            }).always(function() {
              $this.button('reset');
              hrtCommon.hideLoading(true);
            });

        }
    },
    events: {
      delStore: function(index) {
        var _this = this;
        
          swal({
            title: '确定要删除门店' + (index+1) + '吗？',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }, function() {
            console.log(index);
            var _storeId=_this.storelist[index].storeId;
            
            _this.storelist.$remove(_this.storelist[index]);
            if(_storeId&&_storeId!=''){
            var postData={storeId:_storeId};
            $.ajax({
              url: ajaxUrl.delStore,
              type: 'POST',
              data: postData,
              dataType: 'json',
              beforeSend: function() {
                //$this.button('loading');
                hrtCommon.showLoading(true);
              }
            }).done(function(data) {
              if (data.code == '0') {
                swal('删除成功', '', 'success');
              } else {
                swal('删除失败', data.msg, 'warning');
              }
            }).fail(function(xhr, exception) {
              hrtCommon.ajaxFail(xhr, exception, '删除失败');
            }).always(function() {
              //$this.button('reset');
              hrtCommon.hideLoading(true);
            });
            }
            
          });
      }
    },
    ready: function() {
      var child=this.$children;
      console.log('parent ready......');
      console.log(child);

      var _this = this;
      //console.log(_this.enableOnchange);
      $.ajax({
        url: ajaxUrl.getInfo,
        type: 'GET',
        data: {},
        dataType: 'json',
        beforeSend: function() {
          hrtCommon.showLoading();
        }
      }).done(function(data) {
      var reuslt=data.data;
    
        if (data.code == '0') {
        _this.storelist=reuslt.list;
          _this.storeEnable = reuslt.status;
           
          
           //console.log(_this.storeEnable);
        } else {
          swal('读取失败', data.msg, 'warning');
        }
      }).fail(function(xhr, exception) {
        hrtCommon.ajaxFail(xhr, exception, '读取失败');
      }).always(function() {
        hrtCommon.hideLoading();
      });
    }
  }
</script>
