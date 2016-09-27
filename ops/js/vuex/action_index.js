module.exports.setMenu= function ({ dispatch }, menu) {
  dispatch('SET_MENU', menu);
};

module.exports.getMenu= function (state) {
  return state.menu;
};

module.exports.addPublishedMenu= function ({ dispatch }, item) {
  dispatch('ADD_PUBLISHED_ITEM', item);
};

module.exports.removePublishedMenu= function ({ dispatch }, contentId) {
  dispatch('REMOVE_PUBLISHED_ITEM', contentId);
};

module.exports.addCatePublishedMenu= function ({ dispatch }, item) {
  dispatch('ADD_CATE_PUBLISHED_ITEM', item);
};

module.exports.removeCatePublishedMenu= function ({ dispatch }, contentId) {
  dispatch('REMOVE_CATE_PUBLISHED_ITEM', contentId);
};



module.exports.setCityList= function ({ dispatch }, citylist) {
  dispatch('SET_CITY_LIST', citylist);
};

module.exports.getCityList= function(state){
  return state.cityList;
};


module.exports.resetHomeAdsOne= function ({ dispatch }) {
  dispatch('RESET_HOME_ADS_ONE');
};

module.exports.setHomeAdsOne= function ({ dispatch },homeAdsOne) {
  dispatch('SET_HOME_ADS_ONE',homeAdsOne);
};

module.exports.getHomeAdsOne= function(state){
  return state.homeAdsOne;
};

module.exports.getHomeAdsOne_banner= function(state){
  return state.homeAdsOne.banner;
};

module.exports.getHomeAdsOne_ad1= function(state){
  return state.homeAdsOne.ad_1;
};

module.exports.getHomeAdsOne_ad2= function(state){
  return state.homeAdsOne.ad_2;
};

module.exports.getHomeAdsOne_ad3= function(state){
  return state.homeAdsOne.ad_3;
};

module.exports.getHomeAdsOne_ad4= function(state){
  return state.homeAdsOne.ad_4;
};

module.exports.getHomeAdsOne_ad5= function(state){
  return state.homeAdsOne.ad_5;
};


module.exports.setCateAdsOne= function ({ dispatch },cateAdsOne) {
  dispatch('SET_CATE_ADS_ONE',cateAdsOne);
};

module.exports.resetCateAdsOne= function ({ dispatch }) {
  dispatch('RESET_CATE_ADS_ONE');
};

module.exports.getCateAdsOne= function(state){
  return state.cateAdsOne;
};

module.exports.getCateAdsOneByIndex= function(state,index){
  return state.cateAdsOne[index];
};

module.exports.addCateAdsOneItem= function ({ dispatch }) {
  dispatch('ADD_CATE_ADS_ONE_ITEM');
};

module.exports.removeCateAdsOneByIndex= function({ dispatch },index){
  dispatch('REMOVE_CATE_ADS_ONE_ITEM',index);
};