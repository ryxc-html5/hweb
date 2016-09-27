/*
 * 店铺管理-自提模板
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
      <h4 class="panel-title">自提模板管理</h4>
    </div>
    <div class="panel-body">
      <div class="row hrt-shopstores-head">
        <div class="col-sm-12">
          <a class="btn btn-info" @click="adddelivery">新增</a>
          <a class="btn btn-info" @click="save">保存</a>
           <span class="help-inline">点击新增，添加可编辑的自提点</span>
        </div>
      </div>
      <Shop-Delivery-Cell v-for="deliveryCellData in deliverylist"
                    :delivery-cell-data="deliveryCellData"
                    :index="$index"
                    :len="deliverylist.length"></Shop-Delivery-Cell>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  //import Mock from 'mockjs';
  import ShopDeliveryCell from './ShopDeliveryCell';

  var ajaxUrl = {
    getInfo: '/Shop/SelfDelivery/getSelfDeliveryTempList',  //查询列表
    saveDelivery: '/Shop/SelfDelivery/saveSelfDeliveryTemp',   //保存
    delDelivery:'/Shop/SelfDelivery/delSelfDeliveryTemp'     //删除
  };


  // 获取初始化数据
  function GetCellInitData() {
    return {
      addressArea:'',
      addressAreaStr: '',
      addressCity: '',
      addressCityStr: '',
      addressDetail: '',
      addressProvince: 0,
      addressProvinceStr: '',
      selfDeliveryId:'',
      selfDeliveryMobile:'',
      selfDeliveryName:''
    }
  }


  module.exports = {
    data: function() {
      return {     
          deliverylist:[]
      }
    },
    components: {
      ShopDeliveryCell: ShopDeliveryCell
    },
    methods: {
   
      adddelivery: function() {
      var _this = this;
        _this.deliverylist.push(GetCellInitData());
      },
      save: function(e) {
            var i;
            var l;
            var data = this.deliverylist;
            for (i = 0, l = data.length; i < l; i++) {
              if (!$.trim(data[i].selfDeliveryName) || !$.trim(data[i].selfDeliveryMobile) || !$.trim(data[i].addressDetail)) {


                swal('发布失败', '请填写完整的门店' + index + '的信息', 'warning');
                return false;
              }
            }
            var $this = $(e.target);
            var postData = {
              selfDeliveryInfo: data
            };
            console.log(postData);
            $.ajax({
              url: ajaxUrl.saveDelivery,
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
      delDelivery: function(index) {
        var _this = this;
        
          swal({
            title: '确定要删除自提点' + (index+1) + '吗？',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }, function() {
            console.log(index);
            var _deliveryId=_this.deliverylist[index].selfDeliveryId;
            
            _this.deliverylist.$remove(_this.deliverylist[index]);
            if(_deliveryId&&_deliveryId!=''){
            var postData={deliveryId:_deliveryId};
            $.ajax({
              url: ajaxUrl.delDelivery,
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
      var _this = this;
      /*
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
        _this.deliverylist=reuslt.list;
        } else {
          swal('读取失败', data.msg, 'warning');
        }
      }).fail(function(xhr, exception) {
        hrtCommon.ajaxFail(xhr, exception, '读取失败');
      }).always(function() {
        hrtCommon.hideLoading();
      });
      */
    }
  }
</script>
