/*
 * 商家后台管理
 * lxw
 * 2016-07-28
 **/

import Vue from 'vue';

import $ from 'jquery';

import Bootstrap from 'bootstrap';

import swal from 'sweetalert';

import Common from './config';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import ManageTop from './components/ManageTop';

import ManageMenu from './components/ManageMenu';

var router = require('./router/router_index');

import store from './store/store'
import * as todoActions from './actions/actions'
import './css/style.css'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;//启用emulateJSON选项，可以让浏览器不发送OPTIONS预请求
Vue.http.interceptors.push((request, next) => {
  // 请求发送前的处理逻辑
  // request.url="http://127.0.0.1:8888"+request.url;
  //request.url="http://10.0.53.11"+request.url;
  hrtCommon.showLoading();
  next((response) => {
    // 请求发送后的处理逻辑
    hrtCommon.hideLoading();
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
});

// 添加价格过滤器
Vue.filter('price', function(value) {
  return value.toFixed(2);
});

var App = Vue.extend({
  data: function() {
    return {
      username: '',
      menuList: []
    }
  },
  ready: function() {
    GetInitData(this.$data);
  },
  components: {
    ManageTop: ManageTop,
    ManageMenu: ManageMenu
  }
});

router.start(App, '#manageApp');

// 初始化信息
function GetInitData(appData) {
  // 初始化菜单列表
  appData.menuList = Common.menuList;
}
