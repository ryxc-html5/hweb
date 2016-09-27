/*
 * action 类型
 */
export const SET_PUBLISHED_PAGE_GOODS = 'SET_PUBLISHED_PAGE_GOODS';
export const SET_PUBLISHED_FIELD = 'SET_PUBLISHED_FIELD ';
export const SET_PUBLISHED_KEYWORD = 'SET_PUBLISHED_KEYWORD ';
export const SET_PUBLISHED_CURRENT_PAGE = 'SET_PUBLISHED_CURRENT_PAGE';

export const SET_NOT_PUBLISHED_PAGE_GOODS = 'SET_NOT_PUBLISHED_PAGE_GOODS';
export const SET_NOT_PUBLISHED_FIELD = 'SET_NOT_PUBLISHED_FIELD ';
export const SET_NOT_PUBLISHED_KEYWORD = 'SET_NOT_PUBLISHED_KEYWORD ';
export const SET_NOT_PUBLISHED_CURRENT_PAGE = 'SET_NOT_PUBLISHED_CURRENT_PAGE';


export const SET_GOOD_CATEGORY = 'SET_GOOD_CATEGORY';
export const SET_GOOD_BASE_CONFIG = 'SET_GOOD_BASE_CONFIG';

export const SET_GOOD_INFO_NAME = 'SET_GOOD_INFO_NAME';
export const SET_GOOD_INFO_SUBTITLE = 'SET_GOOD_INFO_SUBTITLE';
export const SET_GOOD_INFO_GOOD_SSN = 'SET_GOOD_INFO_GOOD_SSN';
export const SET_GOOD_INFO_UNIT = 'SET_GOOD_INFO_UNIT';
export const SET_GOOD_INFO_BRANDID = 'SET_GOOD_INFO_BRANDID';
export const SET_GOOD_INFO_BASE_ATTR = 'SET_GOOD_INFO_BASE_ATTR';
export const SET_GOOD_INFO_SHOP_TYPE = 'SET_GOOD_INFO_SHOP_TYPE';
export const SET_GOOD_INFO_PICTURES = 'SET_GOOD_INFO_PICTURES';
export const SET_GOOD_INFO_ISSHOWSPEC = 'SET_GOOD_INFO_ISSHOWSPEC';
export const SET_GOOD_INFO_PRODUCTLIST = 'SET_GOOD_INFO_PRODUCTLIST';
export const SET_GOOD_INFO_DESC = 'SET_GOOD_INFO_DESC';
export const SET_GOOD_INFO_ISEXEMPTION = 'SET_GOOD_INFO_ISEXEMPTION';
export const SET_GOOD_INFO_ISPURCHASE = 'SET_GOOD_INFO_ISPURCHASE';
export const SET_GOOD_INFO_PURCHASENUM = 'SET_GOOD_INFO_PURCHASENUM';
export const SET_GOOD_INFO_OVERSEASPURCHASE = 'SET_GOOD_INFO_OVERSEASPURCHASE';
export const SET_GOOD_INFO_LTID = 'SET_GOOD_INFO_LTID';
export const SET_GOOD_INFO_RELATEDGOODSIDS = 'SET_GOOD_INFO_RELATEDGOODSIDS';

/*
 * action 创建函数
 */

export function setPublishedPageGoods(data) {
  return { type: SET_PUBLISHED_PAGE_GOODS, data }
}
export function setPublishedField(field) {
  return { type: SET_PUBLISHED_FIELD, field }
}
export function setPublishedKeyWord(keyWord) {
  return { type: SET_PUBLISHED_KEYWORD, keyWord }
}
export function setPublishedCurrentPage(currentPage) {
  return { type: SET_PUBLISHED_CURRENT_PAGE, currentPage }
}

export function setNotPublishedPageGoods(data) {
  return { type: SET_NOT_PUBLISHED_PAGE_GOODS, data }
}
export function setNotPublishedField(field) {
  return { type: SET_NOT_PUBLISHED_FIELD, field }
}
export function setNotPublishedKeyWord(keyWord) {
  return { type: SET_NOT_PUBLISHED_KEYWORD, keyWord }
}
export function setNotPublishedCurrentPage(currentPage) {
  return { type: SET_NOT_PUBLISHED_CURRENT_PAGE, currentPage }
}

export function setGoodCategory(category) {
  return { type: SET_GOOD_CATEGORY, category }
}

export function setGoodBaseConfig(data) {
  return { type: SET_GOOD_BASE_CONFIG, data }
}



export function setGoodInfoName(name) {
  return { type: SET_GOOD_INFO_NAME, name }
}
export function setGoodInfoSubTitle(subtitle) {
  return { type: SET_GOOD_INFO_SUBTITLE, subtitle }
}
export function setGoodInfoGoodssn(goodssn) {
  return { type: SET_GOOD_INFO_GOOD_SSN, goodssn }
}
export function setGoodInfoUnit(unit) {
  return { type: SET_GOOD_INFO_UNIT, unit }
}
export function setGoodInfoBrandId(brandId) {
  return { type: SET_GOOD_INFO_BRANDID, brandId }
}
export function setGoodInfoBaseAttr(baseAttr) {
  return { type: SET_GOOD_INFO_BASE_ATTR, baseAttr }
}
export function setGoodInfoShopType(shopType) {
  return { type: SET_GOOD_INFO_SHOP_TYPE, shopType }
}
export function setGoodInfoPictures(pictures) {
  return { type: SET_GOOD_INFO_PICTURES, pictures }
}
export function setGoodInfoIsShowSpec(isShowSpec) {
  return { type: SET_GOOD_INFO_ISSHOWSPEC, isShowSpec }
}
export function setGoodInfoProductList(productList) {
  return { type: SET_GOOD_INFO_PRODUCTLIST, productList }
}
export function setGoodInfoDesc(desc) {
  return { type: SET_GOOD_INFO_DESC, desc }
}
export function setGoodInfoIsExemption(isExemption) {
  return { type: SET_GOOD_INFO_ISEXEMPTION, isExemption }
}
export function setGoodInfoIsPurchase(isPurchase) {
  return { type: SET_GOOD_INFO_ISPURCHASE, isPurchase }
}
export function setGoodInfoPurchaseNum(purchaseNum) {
  return { type: SET_GOOD_INFO_PURCHASENUM, purchaseNum }
}
export function setGoodInfoOverseasPurchase(overseasPurchase) {
  return { type: SET_GOOD_INFO_OVERSEASPURCHASE, overseasPurchase }
}
export function setGoodInfoLtId(ltId) {
  return { type: SET_GOOD_INFO_LTID, ltId }
}
export function setGoodInfoRelatedGoodsIDs(relatedGoodsIDs) {
  return { type: SET_GOOD_INFO_RELATEDGOODSIDS, relatedGoodsIDs }
}
