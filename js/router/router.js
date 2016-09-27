
var Vue = require('vue');
var VueRouter = require('vue-router');

var Login=require('../views/login/Login');
var Home=require('../views/home/Home');


Vue.use(VueRouter);

var router = new VueRouter();
router.map(
  {
    '/login': {
      name: 'login',
      component: Login
    },
    '/home': {
      name: 'home',
      component: Home
    }
  }
);

// 重定向任意未匹配路径(默认显示页面)
// router.go({name:'shopInfo'});
router.redirect({
  '*': '/login'
});
module.exports=router;
