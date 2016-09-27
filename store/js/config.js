/*
 * 商家后台管理配置
 * lxw
 * 2016-08-03
 **/
import $ from 'jquery';

window.hrtCommon = {
  // 显示Loading效果
  showLoading: function(showMain) {
    $('#hrtPageLoading').show();
    if (!showMain) $('#hrtPageContent').hide();
  },
  // 隐藏Loading效果
  hideLoading: function(showMain) {
    $('#hrtPageLoading').hide();
    if (!showMain) $('#hrtPageContent').show();
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
  },
  // 生成一个传递给ImgUpload上传组合适用的对象
  getUploadObj: function(options) {
    var obj = {
      size: {},
      src: '',
      width: 1080,          //图片宽度
      height: false,        //图片高度
      weight: 200,          //图片大小
      tips: '',             //提示文案
      useType: 'shop',      //用户类型，可选值：admin、shop
      imgType: 'banner'     //图片标签，可选值：logo、banner、goods、datum、other、ad等
    };
    if (options) {
      for (var i in options) {
          obj[i] = options[i];
      }
    }
    obj.size.width = obj.width;
    if (obj.height) {
      obj.size.height = obj.height;
    }
    if (!obj.tips) {
      obj.tips = '图片宽度为：' + obj.width + '，大小：不超过' + obj.weight + 'KB';
      if (obj.height) {
        obj.tips = '图片尺寸：' + obj.width + '*' + obj.height + '，大小：不超过' + obj.weight + 'KB';
      }
    }
    return obj;
  },
  // 表单验证
  validate: {
    // 过滤前后空格
    trim: function(val) {
      return $.trim(val);
    },
    // 字母、数字或“_”、“-”组成
    ssn: function(val) {
      var reg = /^[\w-_]{1,30}$/;
      return reg.test(val);
    },
    // 价格 最多保留两位小数
    price: function(val) {
      var reg = /^[0-9]+(\.[0-9]{1,2})?$/;
      return reg.test(val);
    },
    // 整数
    int: function(val) {
      var reg = /^[0-9]*$/;
      return reg.test(val);
    },
    // 正整数
    posInt: function(val) {
      var reg = /^[1-9]+[0-9]*$/;
      return reg.test(val);
    }
  }
};

// $(window).ajaxSend(function (e, xhr, opt) {
//  opt.url = 'http://127.0.0.1:8888' + opt.url;
//  });
$(window).ajaxSend(function (e, xhr, opt) {
 opt.url = 'http://localhost:8085/springmvc-demo' + opt.url;


 });
export default {
  menuList: [
    {
      head: '商品管理',
      body: [
        {
          text: '商品列表',
          link: {path:'/good/list'}
        }
        // , {
        //   text: '商品列表',
        //   link: {}
        // }
      ]
    }, {
      head: '订单管理',
      body: [
        {
          text: '订单列表',
          link: {
            path:'/order/list'
          }
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
        }, {
          text: '门店信息',
          link: {path:'/shop/stores'}
        }, {
          text: '物流设置',
          link: {path:'/logistics/list'}
        }, {
          text: '自提模板',
          link: {path:'/shop/delivery'}
        }
      ]
    }
  ]
}
