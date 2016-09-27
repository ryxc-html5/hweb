/*
 * action 类型
 */
export const SET_CITY_LIST = 'SET_CITY_LIST';
export const SET_HOME_MODEL_LIST = 'SET_HOME_MODEL_LIST';

export const SET_MODEL_ID = 'SET_MODEL_ID';
export const SET_MODEL_ONE_DATA = 'SET_MODEL_ONE_DATA';
export const RESET_MODEL_ONE_DATA = 'RESET_MODEL_ONE_DATA';

/**
 * 设置地区列表数据
 * @param cityList
 * @returns {{type: string, cityList: *}}
 */
export function setCityList(cityList) {
  console.log('cityList:',cityList);
  return { type: SET_CITY_LIST, cityList }
}

/**
 * 设置模版列表数据
 * @param homeModelList
 * @returns {{type: string, homeModelList: *}}
 */
export function setHomeModelList(homeModelList) {
  return { type: SET_HOME_MODEL_LIST, homeModelList }
}

/**
 * 设置模版类型
 * @param modelId
 * @returns {{type: string, modelId: *}}
 */
export function setModelId(modelId) {
  return { type: SET_MODEL_ID, modelId }
}

/**
 * 设置模版一的数据
 * @param data
 * @returns {{type: string, data: *}}
 */
export function setModelOneData(data) {
  return { type: SET_MODEL_ONE_DATA, data }
}

/**
 * 重置模版一的数据
 * @returns {{type: string}}
 */
export function resetModelOneData() {
  return { type: RESET_MODEL_ONE_DATA}
}




