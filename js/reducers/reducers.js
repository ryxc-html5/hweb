import { combineReducers } from 'redux';

import {
  SET_PUBLISHED_PAGE_GOODS
} from '../actions/actions';

function publishedGoodData(state={
  field:"goodName",//goodName:商品名称；goodCode：商品编码
  keyWord:"",//关键字
  pageCount:1,//总页数
  totalCount:0,//总记录数
  datas:[
    {
/*      goodId:"1",
      goodCode:"985632147",
      goodName:"中华牙膏",
      category:"",
      goodType:"",
      price:"26.000",
      updateTime:"2016-06-08 15:36:33"*/
    }
  ],//商品列表
  currentPage:1,//当前页码,
  pageSize:20,//每页记录数
  pageIndex:[1]//页码列表
},action){
  switch (action.type) {
    case SET_PUBLISHED_PAGE_GOODS:
      return Object.assign({}, state, {
        datas: action.data.datas,
        pageCount: action.data.pageCount,
        totalCount: action.data.totalCount,
        pageIndex: action.data.pageIndex
      });
    default:
      return state
  }
}









const seller = combineReducers({
  //商品列表数据
  goods:combineReducers({
    publishedGoodData:publishedGoodData
  })

});

export default seller