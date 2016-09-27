/*
 * 商品管理-商品类目选择单元
 * lxw
 * 2016-08-03
 **/
<style scoped>
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">类目选择</h4>
    </div>
    <div class="panel-body">
      <div class="hrt-good-type">
        <Good-type-select-cell :type-cell-data="levelList0"
                               :level="0"></Good-type-select-cell>
        <Good-type-select-cell :type-cell-data="levelList1"
                               :level="1"
                                transition="fade"
                                transition-mode="out-in"></Good-type-select-cell>
        <Good-type-select-cell :type-cell-data="levelList2"
                               :level="2"
                                transition="fade"
                                transition-mode="out-in"></Good-type-select-cell>
      </div>
    </div>
    <div class="panel-footer">
      <a class="btn btn-primary" :class="{disabled: !isSelected}" @click="addGood">去添加商品</a>
    </div>
  </div>
</template>

<script>
  import store from '../../store/store';
  import * as acction from '../../actions/actions';
  import $ from 'jquery';
  import GoodTypeSelectCell from './GoodTypeSelectCell';

  var ajaxUrl = {
      getInfo: '/Ucenter/ShopGoods/getGoodsCategories'
  };

  module.exports = {
    data: function() {
      return {
        levelList0: [],
        levelList1: [],
        levelList2: [],
        isSelected: false,
        selected: {
          cateID: '',
          typeID: ''
        }
      }
    },
    components: {
      GoodTypeSelectCell: GoodTypeSelectCell
    },
    methods: {
      addGood: function() {
          var thiz=this;

          thiz.$route.router.go({
              'name':'goodDeploy',
              'params': {
                  typeId: thiz.selected.cateID + '-' + thiz.selected.typeID
              }
          });
      }
    },
    events: {
      selType: function(level, id) {
        var i;
        var l;
        switch (level) {
          case 0:
            this.isSelected = false;
            this.levelList2 = [];
           
            for (i = 0, l = this.levelList0.length; i < l; i++) {
              if (this.levelList0[i].gc_id == id) {
                if (this.levelList0[i].children) {
                  this.levelList1 = this.levelList0[i].children;
                } else {
                  this.levelList1 = [];
                }
                break;
              }
            }
            break;
          case 1:
            this.isSelected = false;
             this.selected.cateID = id;
            for (i = 0, l = this.levelList1.length; i < l; i++) {
              if (this.levelList1[i].gc_id == id) {
                if (this.levelList1[i].children) {
                  this.levelList2 = this.levelList1[i].children;
                } else {
                  this.levelList2 = [];
                  swal('请先添加商品类型！', '', 'warning');
                }
                break;
              }
            }
            break;
          case 2:
            for (i = 0, l = this.levelList2.length; i < l; i++) {
              if (this.levelList2[i].gc_id == id) {
                this.isSelected = true;
                this.selected.typeID = id;
                break;
              }
            }
            break;
        }
      }
    },
    ready: function() {
      var _this = this;
      $.ajax({
        url: ajaxUrl.getInfo,
        type: 'GET',
        data: {},
        dataType: 'json',
        beforeSend: function() {
          hrtCommon.showLoading();
        }
      }).done(function(data) {
        if (data.code == '0') {
          _this.levelList0 = data.data.category_list_response;
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
