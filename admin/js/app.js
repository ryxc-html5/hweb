//校验是否登录，没有登录，则跳转至登录界面
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//   if (xhr.readyState==4 && (xhr.status==200 || xhr.status==0)){
//     if(xhr.responseText.indexOf('yanzheng') !== -1) {
//       location.href= '/Admin/User/pageLogin?redirect_uri=' + encodeURIComponent(location.href);
//     }
//   }
// };
// xhr.open('GET', '/Admin/Home/isAdminLogin');
// xhr.send();

import Vue from 'vue';

import $ from 'jquery';

import Bootstrap from 'bootstrap';

import swal from 'sweetalert';

import Common from './config';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Main from './views/main/Main';

var router = require('./router/router');

import store from './store/store'
import * as todoActions from './actions/actions'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;//启用emulateJSON选项，可以让浏览器不发送OPTIONS预请求
Vue.http.interceptors.push((request, next) => {
  // 请求发送前的处理逻辑
  request.url="http://127.0.0.1:8888"+request.url;
  //request.url="http://10.0.53.11"+request.url;
  hrtCommon.showLoading();
  next((response) => {
    // 请求发送后的处理逻辑
    hrtCommon.hideLoading();
    // 根据请求的状态，response参数会返回给successCallback或errorCallback
    return response
  })
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
    Main:Main
  }
});

router.start(App, '#app');

// 初始化信息
function GetInitData(appData) {
  // 初始化菜单列表
  appData.menuList = Common.menuList;
}
