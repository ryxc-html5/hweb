/*
 * 店铺管理-主图设置单元
 * lxw
 * 2016-07-28
 **/
<style scoped>
  .hrt-shopimgs-head {
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">主图设置</h4>
    </div>
    <div class="panel-body">
      <div class="row hrt-shopimgs-head">
        <div class="col-sm-8">首页轮播图：<a class="btn btn-info" @click="addImg">新增轮播图</a></div>
        <div class="col-sm-4 text-right"><a class="btn btn-primary btn-lg" @click="save">发布</a></div>
      </div>
      <Shop-img-cell v-for="imgCellData in focusImgs"
                    transition="fade"
                    transition-mode="out-in"
                    :img-cell-data="imgCellData"
                    :index="$index"
                    :len="focusImgs.length"></Shop-img-cell>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  // import Mock from 'mockjs';
  import ShopImgCell from './ShopImgCell';

  var ajaxUrl = {
    getInfo: '/Shop/ContentManagement/getHomePageInfo',
    setInfo: '/Shop/ContentManagement/saveHomePageInfo'
  };

  /*
  Mock.mock(ajaxUrl.getInfo, {
    code: '0',
    data: [
      {
        "shopId":"6",
        "stsPath":"http:\/\/image1.5icrc.com\/Public\/Tpl\/mall\/default\/images\/login-719.jpg",
        "stsLink":"http:\/\/image1.5icrc.com\/Public\/Tpl\/mall\/default\/images\/login-719.jpg",
        "stsOrder":"1",
        "stId":"1",
        "stsTitle":"\u8054\u7cfb\u4eba\u90ae\u7bb1"
      }
    ],
    msg: ''
  });

  Mock.mock(ajaxUrl.setInfo, {
    code: '0',
    data: {},
    msg: ''
  });
  */

  // 获取初始化数据
  function GetCellInitData() {
    return {
      shopId: '',
      stsPath: '',
      stsLink: '',
      stsOrder: '',
      stId: 0,
      stsTitle: ''
    }
  }

  // 轮播图调序
  function orderSwap(arr, iOld, iNew) {
    // 这样上下调序没有过渡效果
    // arr[iOld] = arr.splice(iNew, 1, arr[iOld])[0];

    // 操作有时间差 加上过渡效果
    var elOld = arr.splice(iOld, 1)[0];
    setTimeout(function() {
      arr.splice(iNew, 0, elOld);
    }, 300);
  }

  module.exports = {
    data: function() {
      return {
        focusImgs: []
      }
    },
    components: {
      ShopImgCell: ShopImgCell
    },
    methods: {
      addImg: function() {
        if (this.focusImgs.length < 5) {
          this.focusImgs.push(GetCellInitData());
        } else {
          swal('新增失败', '最多只能添加5张主图', 'warning');
        }
      },
      save: function(e) {
        var i;
        var l;
        var data = this.focusImgs;
        for (i = 0, l = data.length; i < l; i++) {
          var index = i + 1;
          data[i].stsOrder = index;
          if (!$.trim(data[i].stsPath) || !$.trim(data[i].stsLink) || !$.trim(data[i].stsTitle)) {
            swal('发布失败', '请填写完整主图' + index + '的信息', 'warning');
            return false;
          }
        }
        var $this = $(e.target);
        var setData = {
          slide: data
        };
        $.ajax({
          url: ajaxUrl.setInfo,
          type: 'POST',
          data: setData,
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
      delImg: function(index) {
        var _this = this;
        if (this.focusImgs.length > 1) {
          swal({
            title: '确定要删除主图' + (index+1) + '吗？',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }, function() {
            _this.focusImgs.$remove(_this.focusImgs[index]);
          });
        } else {
          swal('删除失败', '最少需要设置一张主图', 'warning');
        }
      },
      orderUp: function(index) {
        if (index == 0) {
          return;
        }
        // var indexNew = index - 1;
        // this.focusImgs[index] = this.focusImgs.splice(indexNew, 1, this.focusImgs[index])[0];
        orderSwap(this.focusImgs, index, index - 1);
      },
      orderDn: function(index) {
        if (index == this.focusImgs.length - 1) {
          return;
        }
        // var indexNew = index + 1;
        // this.focusImgs[index] = this.focusImgs.splice(indexNew, 1, this.focusImgs[index])[0];
        orderSwap(this.focusImgs, index, index + 1);
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
          _this.focusImgs = data.data;
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
