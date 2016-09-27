/*
 * 商家后台管理配置
 * lxw
 * 2016-08-03
 **/
import $ from 'jquery';
/**
 * 清除字符串结尾与开头的空白符
 */
if (!String.trim) {
  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, '');
  };
}
window.hrtCommon = {
  config:{
    imageUploadServer:"10.0.53.11",
    fixChannel:{
      HRZZ:'HR_BUILD_QUALITY',
      JFPD:'HR_INTEGRAL',
      JJSH:'HR_HOME_FURNISHING',
      BJG:'HR_HEALTH_CARE_CENTER'
    }
  },
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


export default {
  menuList: [
    {
      head: '流量管理',
      body: [
        {
          text: '首页广告模板',
          link: {
            path:'/flow/home'
          }
        },
        {
          text: '用户定制广告位',
          link: {
            path:'/flow/custom'
          }
        },
        {
          text: '活动广告模板',
          link: {
            path:'/flow/activity'
          }
        }
      ]
    },
    {
      head: '频道设置',
      body: [
        {
          text: '固定频道列表',
          link: {
            path:'/channel/fixed'
          }
        }, {
          text: '品牌频道列表',
          link: {
            path:'/channel/brand'
          }
        }
      ]
    }
  ]
}
