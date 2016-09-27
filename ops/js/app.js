//校验是否登录，没有登录，则跳转至登录界面
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState==4 && (xhr.status==200 || xhr.status==0)){
    if(xhr.responseText.indexOf('yanzheng') !== -1) {
      location.href= '/Admin/User/pageLogin?redirect_uri=' + encodeURIComponent(location.href);
    }
  }
};
xhr.open('GET', '/Admin/Home/isAdminLogin');
xhr.send();

var $ = require('jquery');
require('bootstrap');
window.$ = $;

var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var Vuex = require('vuex');

//import Common from './config';
var Common = require('./config');

var Main = require('./views/main/Main');

var router = require('./router/router_index');
var store = require('./vuex/vuex_index');

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);

var App = Vue.extend({
  components: {
    Main: Main
  },
  store:store
});
router.start(App, '#app');