
var Vue = require('vue');
var VueRouter = require('vue-router');

var HomeTemplate = require('../views/homeAd/HomeTemplate');
var HomePublished = require('../views/homeAd/HomePublished');

var CateTemplate = require('../views/cateAd/CateTemplate');
var CatePublished = require('../views/cateAd/CatePublished');

Vue.use(VueRouter);

var router = new VueRouter();
router.map({
  "/homead/add":{
    "name":"homeAdd",
    "component":HomeTemplate
  },
  "/homead/published":{
    "name":"homePublished",
    "component":HomePublished
  },
  "/homead/edit/:cityCode/:contentId":{
    "name":"homeEdit",
    "component":HomeTemplate
  },

  "/catead/add":{
    "name":"cateAdd",
    "component":CateTemplate
  },
  "/catead/published":{
    "name":"catePublished",
    "component":CatePublished
  },
  "/catead/edit/:cityCode/:contentId":{
    "name":"cateEdit",
    "component":CateTemplate
  }
});

router.redirect({
  '*': '/homead/published'
});

module.exports=router;



