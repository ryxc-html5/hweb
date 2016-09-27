/*
 * action 类型
 */
export const SET_PUBLISHED_PAGE_GOODS = 'SET_PUBLISHED_PAGE_GOODS';


/*
 * action 创建函数
 */

export function setPublishedPageGoods(data) {
  return { type: SET_PUBLISHED_PAGE_GOODS, data }
}

