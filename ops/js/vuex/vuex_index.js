var Vue = require('vue');
var Vuex = require('vuex');

Vue.use(Vuex);

var state = {
  //菜单数据
  menu:{
    templateList:[],
    publishedList:[],
    cateTemplateList:[],
    catePublishedList:[]
  },
  //城市列表数据
  cityList:[],
  //首页模版一广告数据
  homeAdsOne:{
    banner:{
      type:"banner",
      data:[
        {
          title: "",
          shareUrl:"",
          hideBtn:false,
          name:"banner-",
          size:{width:1080,height:500},
          weight:500,
          tips:"图片分辨率为1080*500，不得超过500k",
          src:"请选择图片！",
          type:'1',
          linkTo:'',
          imageUrl:""
        }
      ]
    },
    ad_1: {
      type: "ads",
      title: "",
      more: "",
      rows: [
        {
          "type":"ad",
          "column": 1,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片1-1-",
              size: {width: 1020, height: 410},
              weight:500,
              tips: "图片分辨率为1020*410，不得超过500k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        },
        {
          "type":"ad",
          "column": 2,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片1-2-",
              size: {width: 500, height: 300},
              weight:300,
              tips: "图片分辨率为500*300，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片1-2-",
              size: {width: 500, height: 300},
              weight:300,
              tips: "图片分辨率为500*300，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        },
        {
          "type":"ad",
          "column": 2,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片1-3-",
              size: {width: 500, height: 300},
              weight:300,
              tips: "图片分辨率为500*300，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片1-3-",
              size: {width: 500, height: 300},
              weight:300,
              tips: "图片分辨率为500*300，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        }
      ]
    },
    ad_2: {
      type: "ads",
      title: "",
      more: "",
      rows: [
        {
          "type":"ad",
          "column": 1,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片2-1-",
              size: {width: 1020, height: 270},
              weight:500,
              tips: "图片分辨率为1020*270，不得超过500k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        },
        {
          "type":"ad",
          "column": 3,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片2-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片2-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片2-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        }
      ]
    },
    ad_3: {
      type: "ads",
      title: "",
      more: "",
      rows: [
        {
          "type":"ad",
          "column": 5,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-1-",
              size: {width: 203, height: 344},
              weight:300,
              tips: "图片分辨率为203*344，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-1-",
              size: {width: 203, height: 344},
              weight:300,
              tips: "图片分辨率为203*344，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-1-",
              size: {width: 203, height: 344},
              weight:300,
              tips: "图片分辨率为203*344，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-1-",
              size: {width: 203, height: 344},
              weight:300,
              tips: "图片分辨率为203*344，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-1-",
              size: {width: 203, height: 344},
              weight:300,
              tips: "图片分辨率为203*344，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        },
        {
          "type":"ad",
          "column": 3,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        },
        {
          "type":"ad",
          "column": 3,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-3-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-3-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片3-3-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        }
      ]
    },
    ad_4: {
      type: "ads",
      title: "",
      more: "",
      rows: [
        {
          "type":"ad",
          "column": 1,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片4-1-",
              size: {width: 880, height: 400},
              weight:300,
              tips: "图片分辨率为880*400，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片4-1-",
              size: {width: 880, height: 400},
              weight:300,
              tips: "图片分辨率为880*400，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片4-1-",
              size: {width: 880, height: 400},
              weight:300,
              tips: "图片分辨率为880*400，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        },
        {
          "type":"ad",
          "column": 3,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片4-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片4-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片4-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        }
      ]
    },
    ad_5: {
      type: "ads",
      title: "",
      more: "",
      rows: [
        {
          "type":"ad",
          "column": 1,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片5-1-",
              size: {width: 1020, height: 270},
              weight:500,
              tips: "图片分辨率为1020*270，不得超过500k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        },
        {
          "type":"ad",
          "column": 3,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片5-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片5-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            },
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片5-2-",
              size: {width: 330, height: 360},
              weight:300,
              tips: "图片分辨率为330*360，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        }
      ]
    }
  },
  //分类广告模版
  cateAdsOne:[
    {
      type: "ads",
      title: "",
      more: "",
      rows: [
        {
          "type":"ad",
          "column": 1,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片",
              size: {width: 1020, height: 370},
              weight:300,
              tips: "图片分辨率为1020:370，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        }
      ]
    }
  ]
};

var mutations = {
  'SET_MENU':function(state,menu){
    state.menu=menu;
  },

  'ADD_PUBLISHED_ITEM':function(state,item){
    var has=false;
    for(var i=0;i<state.menu.publishedList.length;i++){
      var obj=state.menu.publishedList[i];
      if(obj.contentId==item.contentId){
        has=true;
        break;
      }
    }

    if(!has){
      state.menu.publishedList.push(item);
    }
  },

  'REMOVE_PUBLISHED_ITEM':function(state,contentId){
    for(var i=0;i<state.menu.publishedList.length;i++){
      var obj=state.menu.publishedList[i];
      if(obj.contentId==contentId){
        state.menu.publishedList.$remove(obj);
        return;
      }
    }
  },

  'ADD_CATE_PUBLISHED_ITEM':function(state,item){
    var has=false;
    for(var i=0;i<state.menu.catePublishedList.length;i++){
      var obj=state.menu.catePublishedList[i];
      if(obj.contentId==item.contentId){
        has=true;
        break;
      }
    }

    if(!has){
      state.menu.catePublishedList.push(item);
    }
  },

  'REMOVE_CATE_PUBLISHED_ITEM':function(state,contentId){
    for(var i=0;i<state.menu.catePublishedList.length;i++){
      var obj=state.menu.catePublishedList[i];
      if(obj.contentId==contentId){
        state.menu.catePublishedList.$remove(obj);
        return;
      }
    }
  },


  'SET_CITY_LIST':function(state,cityList){
    state.cityList=cityList;
  },



  'SET_HOME_ADS_ONE':function(state,homeAdsOne){
    state.homeAdsOne=homeAdsOne;
  },

  'RESET_HOME_ADS_ONE':function(state){
    state.homeAdsOne={
      banner:{
        type:"banner",
        data:[
          {
            title: "",
            shareUrl:"",
            hideBtn:false,
            name:"banner-",
            size:{width:1080,height:500},
            weight:500,
            tips:"图片分辨率为1080*500，不得超过500k",
            src:"请选择图片！",
            type:'1',
            linkTo:'',
            imageUrl:""
          }
        ]
      },
      ad_1: {
        type: "ads",
        title: "",
        more: "",
        rows: [
          {
            "type":"ad",
            "column": 1,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片1-1-",
                size: {width: 1020, height: 410},
                weight:500,
                tips: "图片分辨率为1020*410，不得超过500k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          },
          {
            "type":"ad",
            "column": 2,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片1-2-",
                size: {width: 500, height: 300},
                weight:300,
                tips: "图片分辨率为500*300，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片1-2-",
                size: {width: 500, height: 300},
                weight:300,
                tips: "图片分辨率为500*300，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          },
          {
            "type":"ad",
            "column": 2,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片1-3-",
                size: {width: 500, height: 300},
                weight:300,
                tips: "图片分辨率为500*300，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片1-3-",
                size: {width: 500, height: 300},
                weight:300,
                tips: "图片分辨率为500*300，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          }
        ]
      },
      ad_2: {
        type: "ads",
        title: "",
        more: "",
        rows: [
          {
            "type":"ad",
            "column": 1,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片2-1-",
                size: {width: 1020, height: 270},
                weight:500,
                tips: "图片分辨率为1020*270，不得超过500k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片2-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片2-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片2-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          }
        ]
      },
      ad_3: {
        type: "ads",
        title: "",
        more: "",
        rows: [
          {
            "type":"ad",
            "column": 5,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-1-",
                size: {width: 203, height: 344},
                weight:300,
                tips: "图片分辨率为203*344，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-1-",
                size: {width: 203, height: 344},
                weight:300,
                tips: "图片分辨率为203*344，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-1-",
                size: {width: 203, height: 344},
                weight:300,
                tips: "图片分辨率为203*344，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-1-",
                size: {width: 203, height: 344},
                weight:300,
                tips: "图片分辨率为203*344，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-1-",
                size: {width: 203, height: 344},
                weight:300,
                tips: "图片分辨率为203*344，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-3-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-3-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片3-3-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          }
        ]
      },
      ad_4: {
        type: "ads",
        title: "",
        more: "",
        rows: [
          {
            "type":"ad",
            "column": 1,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片4-1-",
                size: {width: 880, height: 400},
                weight:300,
                tips: "图片分辨率为880*400，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片4-1-",
                size: {width: 880, height: 400},
                weight:300,
                tips: "图片分辨率为880*400，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片4-1-",
                size: {width: 880, height: 400},
                weight:300,
                tips: "图片分辨率为880*400，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片4-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片4-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片4-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          }
        ]
      },
      ad_5: {
        type: "ads",
        title: "",
        more: "",
        rows: [
          {
            "type":"ad",
            "column": 1,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片5-1-",
                size: {width: 1020, height: 270},
                weight:500,
                tips: "图片分辨率为1020*270，不得超过500k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片5-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片5-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              },
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片5-2-",
                size: {width: 330, height: 360},
                weight:300,
                tips: "图片分辨率为330*360，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          }
        ]
      }
    };
  },


  'SET_CATE_ADS_ONE':function(state,cateAdsOne){
    state.cateAdsOne=cateAdsOne;
  },

  'RESET_CATE_ADS_ONE':function(state){
    state.cateAdsOne=[
      {
        type: "ads",
        title: "",
        more: "",
        rows: [
          {
            "type":"ad",
            "column": 1,
            "items":[
              {
                title: "",
                shareUrl:"",
                hideBtn: false,
                name: "图片",
                size: {width: 1020, height: 370},
                weight:300,
                tips: "图片分辨率为1020*370，不得超过300k",
                src: "请选择图片！",
                type:'1',
                linkTo: '',
                imageUrl: ""
              }
            ]
          }
        ]
      }
    ];
  },

  'ADD_CATE_ADS_ONE_ITEM':function(state){
    state.cateAdsOne.push({
      type: "ads",
      title: "",
      more: "",
      rows: [
        {
          "type":"ad",
          "column": 1,
          "items":[
            {
              title: "",
              shareUrl:"",
              hideBtn: false,
              name: "图片",
              size: {width: 1020, height: 370},
              weight:300,
              tips: "图片分辨率为1020*370，不得超过300k",
              src: "请选择图片！",
              type:'1',
              linkTo: '',
              imageUrl: ""
            }
          ]
        }
      ]
    });
  },

  'REMOVE_CATE_ADS_ONE_ITEM':function(state,index){
    for(var i=0;i<state.cateAdsOne.length;i++){
      var obj=state.cateAdsOne[i];
      if(i==index){
        //state.menu.catePublishedList.splice(i,1);
        state.cateAdsOne.$remove(obj);
        return;
      }
    }
  }
};

module.exports=new Vuex.Store({
  state,
  mutations,
  //strict: false//此处不开启严格模式，广告开启严格模式，处理非常痛苦
});


