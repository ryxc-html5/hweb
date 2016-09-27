import { combineReducers } from 'redux';

import {
  SET_CITY_LIST,
  SET_HOME_MODEL_LIST,
  SET_MODEL_ID,
  SET_MODEL_ONE_DATA,
  RESET_MODEL_ONE_DATA
} from '../actions/actions';

function cityList(state={
  data:[]
},action) {
  console.log("obj:",action.type);
  switch (action.type) {
    case SET_CITY_LIST:
      var obj= Object.assign({}, state, action.cityList);
      return obj;
    default:
      return state
  }
}

function homeModelList(state={
  data:[]
},action) {
  switch (action.type) {
    case SET_HOME_MODEL_LIST:
      return Object.assign({}, state, action.homeModelList);
    default:
      return state
  }
}

/**
 * 设置广告模板类型，默认模版一
 * @param state
 * @param action
 * @returns {*}
 */
function modelId(state="1",action) {
  switch (action.type) {
    case SET_MODEL_ID:
      return action.modelId;
    default:
      return state
  }
}

/**
 * 模板一的初始数据
 * @returns {{data: *[]}}
 */
function getInitModelOneData(){
  return {
    data:[
      {
        type:"banner",
        data:[
          {
            "title": "",
            "subTitle": "",
            "desc": "",
            "shareUrl": "",
            "name": "",
            "tips": "",
            "src": "",
            "hideBtn": false,
            "type": "2",
            "linkTo": "#type=good&goodId=",
            "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
            "size": {
              "width": 1020,
              "height": 360
            },
            "weight": 100
          }
        ]
      },
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
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            "type":"ad",
            "column": 2,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            "type":"ad",
            "column": 2,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          }
        ]
      },
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
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          }
        ]
      },
      {
        type: "ads",
        title: "",
        more: "",
        rows: [
          {
            "type":"ad",
            "column": 5,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          }
        ]
      },
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
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          }
        ]
      },
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
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            "type":"ad",
            "column": 3,
            "items":[
              {
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              },{
                "title": "",
                "subTitle": "",
                "desc": "",
                "shareUrl": "",
                "name": "",
                "tips": "",
                "src": "",
                "hideBtn": false,
                "type": "2",
                "linkTo": "#type=good&goodId=",
                "imageUrl": "http://www.ilweb.cn/uploads/allimg/201607/13/et13737131820041.jpg",
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          }
        ]
      }
    ]
  }
}

/**
 * 设置模版一数据
 * @param state
 * @param action
 * @returns {*}
 */
function modelOneData(state=getInitModelOneData(),action) {
  switch (action.type) {
    case SET_MODEL_ONE_DATA:
      return Object.assign({}, state, action.data);
    case RESET_MODEL_ONE_DATA:
      return getInitModelOneData();
    default:
      return state
  }
}

const data = combineReducers({
  cityList:cityList,
  homeModelList:homeModelList,
  homeAd:combineReducers({
    modelId:modelId,
    modelOneData:modelOneData
  })
});

export default data


