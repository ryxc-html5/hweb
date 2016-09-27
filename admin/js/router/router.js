var Vue = require('vue');
var VueRouter = require('vue-router');

import FixedChannelList from  '../views/channel/fixed/FixedChannelList';
import FixedChannelHrzz from  '../views/channel/fixed/hrzz/FixedChannelHrzz';
import FixedChannelJfpd from  '../views/channel/fixed/jfpd/FixedChannelJfpd';
import FixedChannelJjsh from  '../views/channel/fixed/jjsh/FixedChannelJjsh';
import FixedChannelBjg from  '../views/channel/fixed/bjg/FixedChannelBjg';

import BrandChannelList from  '../views/channel/brand/BrandChannelList';
import BrandChannelEdit from  '../views/channel/brand/BrandChannelEdit';


import HomeList from  '../views/flow/home/HomeList';
import HomeEdit from  '../views/flow/home/HomeEdit';


import CustomList from  '../views/flow/custom/CustomList';
import CustomEdit from  '../views/flow/custom/CustomEdit';

Vue.use(VueRouter);

var router = new VueRouter();
router.map(
  {
    //首页广告位
    '/flow/home':{
      name: 'homeFlowList',
      component: HomeList
    },

    //首页广告位新增
    '/flow/home/add':{
      name: 'homeFlowAdd',
      component: HomeEdit
    },

    //首页广告位编辑
    '/flow/home/Edit/:id':{
      name: 'homeFlowEdit',
      component: HomeEdit
    },

    //用户定制广告位
    '/flow/custom':{
      name: 'customFlowList',
      component: CustomList
    },
    //用户定制广告位新增
    '/flow/custom/add':{
      name: 'customFlowAdd',
      component: CustomEdit
    },
    //用户定制广告位修改
    '/flow/custom/edit/:id':{
      name: 'customFlowEdit',
      component: CustomEdit
    },

    //固定列表
    '/channel/fixed': {
      name: 'fixedChannelList',
      component: FixedChannelList
    },
    //华润质造
    '/channel/fixed/hrzz/:channelId': {
      name: 'fixedChannelHrzz',
      component: FixedChannelHrzz
    },
    //积分频道
    '/channel/fixed/jfpd/:channelId': {
      name: 'fixedChannelJfpd',
      component: FixedChannelJfpd
    },
    //家居生活
    '/channel/fixed/jjsh/:channelId': {
      name: 'fixedChannelJjsh',
      component: FixedChannelJjsh
    },
    //保健馆
    '/channel/fixed/bjg/:channelId': {
      name: 'fixedChannelBjg',
      component: FixedChannelBjg
    },


    //品牌列表
    '/channel/brand': {
      name: 'brandChannelList',
      component: BrandChannelList
    },
    //品牌新增
    '/channel/brand/add': {
      name: 'brandChannelAdd',
      component: BrandChannelEdit
    },
    //品牌编辑
    '/channel/brand/edit/:channelId': {
      name: 'brandChannelEdit',
      component: BrandChannelEdit
    }
  }
);

// 重定向任意未匹配路径(默认显示页面)
router.redirect({
  '*': '/channel/fixed'
});
module.exports=router;
