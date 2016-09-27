import Vue from 'vue';

import $ from 'jquery';

import Bootstrap from 'bootstrap';

import swal from 'sweetalert';

import VueRouter from 'vue-router';

var router = require('./router/router');

import store from './store/store'

import * as todoActions from './actions/actions'

import Common from './config';

Vue.use(VueRouter);

var App = Vue.extend({
  data: function() {
    return {

    }
  },
  ready: function() {
    GetInitData(this.$data);
  },
  components: {

  }
});

router.start(App, '#app');

// 初始化信息
function GetInitData(appData) {
  // 初始化菜单列表
  appData.menuList = Common.menuList;
}
