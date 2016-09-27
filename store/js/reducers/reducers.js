import { combineReducers } from 'redux';

import {
  SET_PUBLISHED_PAGE_GOODS,
  SET_PUBLISHED_FIELD,
  SET_PUBLISHED_KEYWORD,
  SET_PUBLISHED_CURRENT_PAGE,

  SET_NOT_PUBLISHED_PAGE_GOODS,
  SET_NOT_PUBLISHED_FIELD,
  SET_NOT_PUBLISHED_KEYWORD,
  SET_NOT_PUBLISHED_CURRENT_PAGE,

  SET_GOOD_CATEGORY,
  SET_GOOD_BASE_CONFIG,

  SET_GOOD_INFO_NAME,
  SET_GOOD_INFO_SUBTITLE,
  SET_GOOD_INFO_GOOD_SSN,
  SET_GOOD_INFO_UNIT,
  SET_GOOD_INFO_BRANDID,
  SET_GOOD_INFO_BASE_ATTR,
  SET_GOOD_INFO_SHOP_TYPE,
  SET_GOOD_INFO_PICTURES,
  SET_GOOD_INFO_ISSHOWSPEC,
  SET_GOOD_INFO_PRODUCTLIST,
  SET_GOOD_INFO_DESC,
  SET_GOOD_INFO_ISEXEMPTION,
  SET_GOOD_INFO_ISPURCHASE,
  SET_GOOD_INFO_PURCHASENUM,
  SET_GOOD_INFO_OVERSEASPURCHASE,
  SET_GOOD_INFO_LTID,
  SET_GOOD_INFO_RELATEDGOODSIDS
} from '../actions/actions';

function publishedGoodData(state={
  field:"g_name",//goodName:商品名称；goodCode：商品编码
  keyWord:"",//关键字
  pageCount:1,//总页数
  totalCount:0,//总记录数
  datas:[
/*    {
      goodId:"1",
      goodCode:"985632147",
      goodName:"中华牙膏",
      category:"",
      goodType:"",
      price:"26.000",
      updateTime:"2016-06-08 15:36:33"
    }*/
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
    case SET_PUBLISHED_FIELD:
      return Object.assign({}, state, {
        field: action.field
      });
    case SET_PUBLISHED_KEYWORD:
      return Object.assign({}, state, {
        keyWord: action.keyWord
      });
    case SET_PUBLISHED_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage
      });
    default:
      return state
  }
}

function notPublishedGoodData(state={
  field:"g_name",//goodName:商品名称；goodCode：商品编码
  keyWord:"",//关键字
  pageCount:1,//总页数
  totalCount:0,//总记录数
  datas:[
/*    {
      goodId:"1",
      goodCode:"985632147",
      goodName:"中华牙膏",
      category:"",
      goodType:"",
      price:"26.000",
      updateTime:"2016-06-08 15:36:33"
    }*/
  ],//商品列表
  currentPage:1,//当前页码,
  pageSize:20,//每页记录数
  pageIndex:[1]//页码列表
},action){
  switch (action.type) {
    case SET_NOT_PUBLISHED_PAGE_GOODS:
      return Object.assign({}, state, {
        datas: action.data.datas,
        pageCount: action.data.pageCount,
        totalCount: action.data.totalCount,
        pageIndex: action.data.pageIndex
      });
    case SET_NOT_PUBLISHED_FIELD:
      return Object.assign({}, state, {
        field: action.field
      });
    case SET_NOT_PUBLISHED_KEYWORD:
      return Object.assign({}, state, {
        keyWord: action.keyWord
      });
    case SET_NOT_PUBLISHED_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage
      });
    default:
      return state
  }
}

function category(state="",action){
  switch (action.type) {
    case SET_GOOD_CATEGORY:
      return action.category;
    default:
      return state
  }
}

function baseConfig(state={
  code:'0',
  msg:'',
  goodsNoSaleSpecs:[],//商品类型基本属性配置信息
  expressTemplates:[],//邮费模版列表
  goodsCategories:[],//商家店铺商品分类数据
  shopCategories:[],//店铺商品分类
  trademarks:[]//商家授权品牌列表
},action){
  switch (action.type) {
    case SET_GOOD_BASE_CONFIG:
      return Object.assign({}, state, action.data);
    default:
      return state
  }
}

/**
 * 商品名称
 * @param state
 * @param action
 * @returns {*}
 */
function name(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_NAME:
      return action.name;
    default:
      return state
  }
}

/**
 * 副标题
 * @param state
 * @param action
 * @returns {*}
 */
function subtitle(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_SUBTITLE:
      return action.subtitle;
    default:
      return state
  }
}

/**
 * 商品编码
 * @param state
 * @param action
 */
function goodssn(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_GOOD_SSN:
      return action.goodssn;
    default:
      return state
  }
}

/**
 * 计量单位
 * @param state
 * @param action
 * @returns {*}
 */
function unit(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_UNIT:
      return action.unit;
    default:
      return state
  }
}

/**
 * 商品品牌
 * @param state
 * @param action
 * @returns {*}
 */
function brandID(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_BRANDID:
      return action.brandId;
    default:
      return state
  }
}

/**
 * 基本属性
 * @param state
 * @param action
 * @returns {*}
 */
function unSalesGoodsSpecs(state=[],action){
  switch (action.type) {
    case SET_GOOD_INFO_BASE_ATTR:
      //return Object.assign({}, state, action.baseAttr);
      return action.baseAttr;
    default:
      return state
  }
}

/**
 * 商品店铺类型
 * @param state
 * @param action
 * @returns {*}
 */
function shopType(state=[],action){
  switch (action.type) {
    case SET_GOOD_INFO_SHOP_TYPE:
      return action.shopType;
    default:
      return state
  }
}

/**
 * 商品主图
 * @param state
 * @param action
 * @returns {*}
 */
function pictures(state=[],action){
  switch (action.type) {
    case SET_GOOD_INFO_PICTURES:
      return action.pictures;
    default:
      return state
  }
}

/**
 * 是否启用规格
 * @param state
 * @param action
 * @returns {*}
 */
function isShowSpec(state=false,action){
  switch (action.type) {
    case SET_GOOD_INFO_ISSHOWSPEC:
      return action.isShowSpec;
    default:
      return state
  }
}

/**
 * 规格列表
 * @param state
 * @param action
 * @returns {*}
 */
function productList(state=[],action){
  switch (action.type) {
    case SET_GOOD_INFO_PRODUCTLIST:
      return action.productList;
    default:
      return state
  }
}

/**
 * 图文详情
 * @param state
 * @param action
 * @returns {*}
 */
function desc(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_DESC:
      return action.desc;
    default:
      return state
  }
}

/**
 * 是否包邮
 * @param state
 * @param action
 * @returns {*}
 */
function isExemption(state=false,action){
  switch (action.type) {
    case SET_GOOD_INFO_ISEXEMPTION:
      return action.isExemption;
    default:
      return state
  }
}

/**
 * 是否限购
 * @param state
 * @param action
 * @returns {*}
 */
function isPurchase(state=false,action){
  switch (action.type) {
    case SET_GOOD_INFO_ISPURCHASE:
      return action.isPurchase;
    default:
      return state
  }
}

/**
 * 限购数量
 * @param state
 * @param action
 * @returns {*}
 */
function purchaseNum(state=0,action){
  switch (action.type) {
    case SET_GOOD_INFO_PURCHASENUM:
      return action.purchaseNum;
    default:
      return state
  }
}

/**
 * 是否跨境购
 * @param state
 * @param action
 * @returns {*}
 */
function overseasPurchase(state=false,action){
  switch (action.type) {
    case SET_GOOD_INFO_OVERSEASPURCHASE:
      return action.overseasPurchase;
    default:
      return state
  }
}

/**
 * 运费模版
 * @param state
 * @param action
 * @returns {*}
 */
function ltId(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_LTID:
      return action.ltId;
    default:
      return state
  }
}

/**
 * 关联商品
 * @param state
 * @param action
 * @returns {*}
 */
function relatedGoodsIDs(state="",action){
  switch (action.type) {
    case SET_GOOD_INFO_RELATEDGOODSIDS:
      return action.relatedGoodsIDs;
    default:
      return state
  }
}

const seller = combineReducers({
  //商品列表数据
  goods:combineReducers({
    publishedGoodData:publishedGoodData,
    notPublishedGoodData:notPublishedGoodData
  }),
  //商品发布数据
  goodDeploy:combineReducers({
    category:category,//商品类目选择的类型
    baseConfig:baseConfig,//配置信息数据。
    goodInfo:combineReducers({
      name:name,//商品名称
      subtitle:subtitle,//商品副标题
      goodssn:goodssn,//商品编码
      unit:unit,//计量单位
      brandID:brandID,//商品品牌
      unSalesGoodsSpecs:unSalesGoodsSpecs,//TODO 基本属性
      shopType:shopType,//店铺分类
      pictures:pictures,//商品图片集合

      isShowSpec:isShowSpec,//是否启用规格
      productList:productList,//规格模块

      desc:desc,// 图文详情

      isExemption:isExemption,//是否包邮
      isPurchase:isPurchase,//是否限购
      purchaseNum:purchaseNum,//限购数量
      overseasPurchase:overseasPurchase,//是否跨境购
      ltId:ltId,//运费模版
      relatedGoodsIDs:relatedGoodsIDs//关联商品id
    })
  })
});

export default seller

/*const { SHOW_ALL } = VisibilityFilters;

 function visibilityFilter(state = SHOW_ALL, action) {
 switch (action.type) {
 case SET_VISIBILITY_FILTER:
 return action.filter;
 default:
 return state
 }
 }

 function todos(state = [
 {
 text:"商品管理功能开发",
 completed:false
 }
 ], action) {
 switch (action.type) {
 case ADD_TODO:
 return [
 ...state,
 {
 text: action.text,
 completed: false
 }
 ];
 case TOGGLE_TODO:
 return state.map((todo, index) => {
 if (index === action.index) {
 return Object.assign({}, todo, {
 completed: !todo.completed
 })
 }
 return todo
 });
 default:
 return state
 }
 }*/
