/*
 * 商家后台管理配置
 * lxw
 * 2016-08-03
 **/
import $ from 'jquery';

window.hrtCommon = {
  // 显示Loading效果
  showLoading: function() {
    $('#hrtPageLoading').show();
    $('#hrtPageContent').hide();
  },
  // 隐藏Loading效果
  hideLoading: function() {
    $('#hrtPageLoading').hide();
    $('#hrtPageContent').show();
  },
  // Ajax失败的回调函数
  ajaxFail: function(xhr, exception, title) {
    var msg = '';
    if (xhr.status === 0) {
      msg = 'Not connect.\n Verify Network.';
    } else if (xhr.status == 404) {
      msg = 'Requested page not found. [404]';
    } else if (xhr.status == 500) {
      msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
      msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
      msg = 'Time out error.';
    } else if (exception === 'abort') {
      msg = 'Ajax request aborted.';
    } else {
      msg = 'Uncaught Error.\n' + xhr.responseText;
    }
    swal(title, msg, 'warning');
  }
};

/*$(window).ajaxSend(function (e, xhr, opt) {
 opt.url = 'http://127.0.0.1:8888' + opt.url;
 });*/
 $(window).ajaxSend(function (e, xhr, opt) {
 opt.url = 'http://10.0.53.11' + opt.url;
 });
export default {
  menuList: [
    {
      head: '商品管理',
      body: [
        {
          text: '商品列表',
          link: {path:'/good/list'}
        }, {
          text: '商品列表',
          link: {}
        }
      ]
    }, {
      head: '订单管理',
      body: [
        {
          text: '订单列表',
          link: {}
        }, {
          text: '售后列表',
          link: {}
        }
      ]
    }, {
      head: '店铺管理',
      body: [
        {
          text: '店铺信息',
          link: {path:'/shop/info'}
        }, {
          text: '主图设置',
          link: {path:'/shop/imgs'}
        }, {
          text: '店铺促销',
          link: {}
        }, {
          text: '品牌申请',
          link: {}
        }
      ]
    }
  ]
}
