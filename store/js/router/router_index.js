
var Vue = require('vue');
var VueRouter = require('vue-router');

var ShopInfo=require('../views/shopManager/ShopInfo');
var ShopImgs=require('../views/shopManager/ShopImgs');
var ShopStores=require('../views/shopManager/ShopStores');
var ShopDelivery=require('../views/shopManager/ShopDelivery');

var GoodList=require('../views/goodManager/GoodList');
var GoodTypeSelect=require('../views/goodManager/GoodTypeSelect');
var GoodDelpoy=require('../views/goodManager/GoodDelpoy');

var OrderList=require('../views/orderManager/OrderList');
var OrderDetail=require('../views/orderManager/OrderDetail');

var logisticsList=require('../views/logisticsManager/logisticsList');
var logisticsEdit=require('../views/logisticsManager/logisticsEdit');

Vue.use(VueRouter);

var router = new VueRouter();
router.map(
  {
    '/shop/delivery': {
      name: 'shopDelivery',
      component: ShopDelivery
    },
    '/shop/stores': {
      name: 'shopStores',
      component: ShopStores
    },
    '/shop/info': {
      name: 'shopInfo',
      component: ShopInfo
    },
    '/shop/imgs': {
      name: 'shopImgs',
      component: ShopImgs
    },

    '/good/list':{
      name:'goodList',
      component:GoodList
    },
    '/good/typeChoice':{
      name:'goodTypeChoice',
      component:GoodTypeSelect
    },
    '/good/deploy/:typeId':{
      name:'goodDeploy',
      component:GoodDelpoy
    },
    '/good/deploy/:typeId/:goodId':{
      name:'goodDeployEdit',
      component:GoodDelpoy
    },

    '/order/list':{
      name:'orderList',
      component:OrderList
    },
    '/order/detail/:orderId':{
      name:'orderDetail',
      component:OrderDetail
    },

    '/logistics/list':{
      name:'logisticsList',
      component:logisticsList
    },
    'logistics/list/add':{
      name:'logisticsAdd',
      component:logisticsEdit
    },
    'logistics/list/edit/:ltId':{
      name:'logisticsEdit',
      component:logisticsEdit
    }
  }
);

// 重定向任意未匹配路径(默认显示页面)
// router.go({name:'shopInfo'});
router.redirect({
  '*': '/shop/info'
});
module.exports=router;
