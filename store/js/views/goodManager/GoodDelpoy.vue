/*
 * 商品管理-商品编辑单元
 **/
<style scoped>
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">商品信息</h4>
    </div>
    <div class="panel-body">
        <div class="good-deploy-tab">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#baseInfo" aria-controls="baseInfo" role="tab" data-toggle="tab">基本信息</a>
                </li>
                <li role="presentation">
                    <a href="#priceSpec" aria-controls="priceSpec" role="tab" data-toggle="tab">价格/规格</a>
                </li>
                <li role="presentation">
                    <a href="#teletext" aria-controls="teletext" role="tab" data-toggle="tab">图文详情</a>
                </li>
                <li role="presentation">
                    <a href="#otherInfo" aria-controls="otherInfo" role="tab" data-toggle="tab">其他信息</a>
                </li>
                <li role="presentation">
                    <a href="#deploy" aria-controls="deploy" role="tab" data-toggle="tab">预览发布</a>
                </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="baseInfo">
                    <Good-deploy-basic :good-info="goodInfo"></Good-deploy-basic>
                </div>
                <div role="tabpanel" class="tab-pane " id="priceSpec">
                    <Good-deploy-price-spec :good-info="goodInfo" :model-spec-value="salesSpecsValue"></Good-deploy-price-spec>
                </div>
                <div role="tabpanel" class="tab-pane " id="teletext">
                    <Good-deploy-detail :good-info="goodInfo"></Good-deploy-detail>
                </div>
                <div role="tabpanel" class="tab-pane " id="otherInfo">
                    <Good-deploy-other-info :good-info="goodInfo" :relate-goods="relatedGoods"></Good-deploy-other-info>
                </div>
                <div role="tabpanel" class="tab-pane " id="deploy">
                    <Good-deploy-preview :good-info="goodInfo"></Good-deploy-preview>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
    import store from '../../store/store'
    import * as  acction from '../../actions/actions'
    import $ from 'jquery';

    import GoodDeployBasic from './GoodDeployBasic';
    import GoodDeployPriceSpec from './GoodDeployPriceSpec'
    import GoodDeployDetail from './GoodDeployDetail';
    import GoodDeployOtherInfo from './GoodDeployOtherInfo'
    import GoodDeployPreview from './GoodDeployPreview'

    var ajaxUrl = {
        getConfig: '/Ucenter/ShopGoods/getGoodsConfigData',
        getGoodsInfo: '/Ucenter/ShopGoods/getGoodsInfo'
    };

    // 生成图片组件所需对象
    function GetPriceObj() {
      return {
          goodsSpecDetialNameList:[],//商品规格
          goodsSN:"",//商品编码
          stock:'',//库存
          salePrice:'',//销售价
          marketPrice:'',//市场价/原价
          point: '',//积分
          minPurchaseNum:1,//最小购买数量
          maxPurchaseNum:0,//最多购买数量,0为不限
          weight:'',//重量
          tinyPictureUrl:""//小图
      }
    }

    module.exports = {
        props: {},
        data: function () {
            return {
                goodInfo:{
                    cateID: '',//类目父ID
                    typeId: '',//类目ID
                    goodsID: '',//商品ID
                    name:"",//商品名称
                    subtitle:"",//商品副标题
                    goodssn:"",//商品编码
                    unit:"",//计量单位
                    brandID:"",//商品品牌
                    unSalesGoodsSpecs:[],//TODO 基本属性
                    shopType:[],//店铺分类
                    shopNum:0,
                    goodsPictures:[
                      {pictureAddr:''},{pictureAddr:''},{pictureAddr:''},{pictureAddr:''},{pictureAddr:''}
                    ],//商品图片集合

                    isShowSpec:0,//是否启用规格
                    salesGoodsSpecs:[
                        /*{
                            name:"规格一",
                            specDetails:[//规格值列表
                                {
                                    value:'1',
                                    status:1
                                }
                            ]
                        }*/
                    ],//规格类列表
                    productList:[
                        /*{
                            goodsSpecDetialNameList:[''],//商品规格
                            goodsSN:"",//商品编码
                            stock:'',//库存
                            salePrice:'',//销售价
                            marketPrice:'',//市场价/原价
                            point: '',//积分
                            minPurchaseNum:1,//最小购买数量
                            maxPurchaseNum:0,//最多购买数量,0为不限
                            weight:'',//重量
                            tinyPictureUrl:""//小图
                        }*/
                    ],//规格模块

                    desc:[],// 图文详情，保存时再转换为 string 格式

                    isExemption:0,//是否包邮
                    isPurchase:0,//是否限购
                    purchaseNum:'',//限购数量
                    overseasPurchase:0,//是否跨境购
                    //ltId:"",//运费模版
                    relatedGoodsIDs:"",//关联商品id
                    isVirtual:0,  //是否虚拟商品
                    virtualUsingRule:'',  //虚拟商品规则
                    isUsingStorelist:0, //是否启用门店列表
                    selfDeliveryOpt:0,   //自提选项
                    selfDeliveryTimes:15  //自提时间
                },
                relatedGoods: [],//关联商品列表
                salesSpecsValue: []//已勾选的规格属性
                
            }
        },
        components: {
            GoodDeployBasic:GoodDeployBasic,
            GoodDeployPriceSpec:GoodDeployPriceSpec,
            GoodDeployDetail:GoodDeployDetail,
            GoodDeployOtherInfo:GoodDeployOtherInfo,
            GoodDeployPreview:GoodDeployPreview
        },
        route:{
            data:function (transition) {
                var _this = this;
                var name = transition.to.name;
                var ids = '';
                var typeId = '';
                var cateId = '';
                var goodId = '';

                // 编辑商品状态，请求获取商品信息
                if (name == 'goodDeployEdit') {
                  typeId = transition.to.params.typeId;
                  goodId = transition.to.params.goodId;

                  $.ajax({
                    url: ajaxUrl.getGoodsInfo,
                    type: 'GET',
                    data: {
                        goodId: goodId,
                        goodsTypeId: typeId
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        hrtCommon.showLoading();
                    }
                  }).done(function(data) {
                    if (data.code == '0') {
                    
                      var i, l;
                      // 生成基本配置信息
                      var configData = {
                        expressTemplates: data.data.expressTemplates,
                        goodsCategories: data.data.goodsCategories,
                        goodsNoSaleSpecs: [],
                        shopCategories: data.data.shopCategory,
                        trademarks: data.data.trademarks,
                        brandsList: data.data.brandList
                      };
                      _this.goodInfo.unSalesGoodsSpecs = [];
                     
                      for (i = 0, l = data.data.unSalesGoodsSpecs.length; i < l; i++) {
                        var tempObj = data.data.unSalesGoodsSpecs[i];
                        var tempRes = {
                          gsOrder: i,
                          gsName: tempObj.gsName,
                          gsId: tempObj.gsId,
                          gsInputType: tempObj.gsInputType
                        }
                        var tempRes2 = {
                          aliases: tempObj.aliases,
                          goodsSpecId: tempObj.gsId,
                          isSaleSpec: 0
                        };
                        if (tempObj.gsInputType == 2) {
                          tempRes.specDetails = tempObj.specDetails;
                        }
                        configData.goodsNoSaleSpecs.push(tempRes);
                        _this.goodInfo.unSalesGoodsSpecs.push(tempRes2);
                      }

                      // 赋值
                       _this.goodInfo.isVirture=data.data.isVirture;
                      _this.goodInfo.goodsID = goodId;
                      _this.goodInfo.name = data.data.name;
                      _this.goodInfo.subtitle = data.data.subtitle;
                      _this.goodInfo.goodssn = data.data.goodssn;
                      _this.goodInfo.unit = data.data.unit;
                      _this.goodInfo.brandID = data.data.brandID;
                      _this.goodInfo.shopType = data.data.shopType;
                      _this.goodInfo.goodsPictures = data.data.goodsPictures;
                      _this.goodInfo.selfDeliveryOpt=0;
                      _this.goodInfo.selfDeliveryTimes=15;
                      _this.goodInfo.isVirtual=data.data.isVirtual;
                      _this.goodInfo.virtualUsingRule=data.data.virtualUsingRule;
                      _this.goodInfo.isUsingStorelist=data.data.isUsingStorelist;

                      for (i = 0, l = data.data.goodsPictures.length; i < l; i++) {
                        if (/w=0&h=0&path=$/.test(data.data.goodsPictures[i].pictureAddr)) {
                          _this.goodInfo.goodsPictures[i].pictureAddr = '';
                        }
                      }
                      _this.goodInfo.isShowSpec = data.data.isShowSpec;
                      _this.goodInfo.salesGoodsSpecs = data.data.salesGoodsSpecs;
                      _this.goodInfo.productList = data.data.productList;
                      if (data.data.isShowSpec) {
                        _this.goodInfo.productList.unshift(GetPriceObj());
                        var tempArr = [];
                        for (i = 0, l = data.data.productList.length; i < l; i++) {
                          tempArr = tempArr.concat(data.data.productList[i].goodsSpecDetialNameList);
                        }
                        for (i = 0, l = data.data.salesGoodsSpecs.length; i < l; i++) {
                          var tempObj = {
                            txt: '',
                            sel: []
                          };
                          var tempItem = data.data.salesGoodsSpecs[i].specDetails;
                          for (var j = 0, k = tempItem.length; j < k; j++) {
                            if (tempArr.indexOf(tempItem[j].value) != -1) {
                              tempObj.sel.push(tempItem[j].value);
                            }
                          }
                          _this.salesSpecsValue.push(tempObj);
                        }
                      }
                      _this.goodInfo.desc = JSON.parse(data.data.desc);

                      _this.goodInfo.isExemption = data.data.isExemption;
                      _this.goodInfo.isPurchase = data.data.isPurchase;
                      _this.goodInfo.purchaseNum = data.data.purchaseNum;
                      _this.goodInfo.overseasPurchase = data.data.overseasPurchase;
                      //_this.goodInfo.ltId = data.data.ltId;
                      _this.relatedGoods = data.data.relatedGoods;

                       _this.goodInfo.shopNum=data.data.shopNum;
                      var tempGoodsIDs = [];
                      for (i = 0, l = data.data.relatedGoods.length; i < l; i++) {
                        tempGoodsIDs.push(data.data.relatedGoods[i].id);
                      }
                      _this.goodInfo.relatedGoodsIDs = tempGoodsIDs.join(',');

                      store.dispatch(acction.setGoodBaseConfig(configData));
                      transition.next();
                    } else {
                      swal('读取失败', data.msg, 'warning');
                      transition.abort();
                    }
                  }).fail(function(xhr, exception) {
                    hrtCommon.ajaxFail(xhr, exception, '读取失败');
                    transition.abort();
                  }).always(function() {
                    hrtCommon.hideLoading();
                  });
                } else {
                // 请求获取基本配置信息
                  ids = transition.to.params.typeId.split('-');
                  cateId = ids[0];
                  typeId = ids[1];
                  this.goodInfo.cateID = cateId;
                  this.goodInfo.typeId = typeId;

                  $.ajax({
                      url: ajaxUrl.getConfig,
                      type: 'GET',
                      data: {
                          typeId: typeId
                      },
                      dataType: 'json',
                      beforeSend: function () {
                          hrtCommon.showLoading();
                      }
                  }).done(function(data) {
                      if (data.code == '0') {console.log(data.data.shopNum);
                      _this.goodInfo.shopNum=data.data.shopNum;
                      
                          store.dispatch(acction.setGoodBaseConfig(data.data));
                          if (data.data.goodsNoSaleSpecs.length) {
                            _this.goodInfo.unSalesGoodsSpecs = [];
                            for (var i = 0, l = data.data.goodsNoSaleSpecs.length; i < l; i++) {
                              _this.goodInfo.unSalesGoodsSpecs.push({
                                aliases: '',
                                goodsSpecId: 0,
                                isSaleSpec: 0
                              });
                            }
                          }
                          //运费模版设置默认
                          //if (data.data.expressTemplates.length) {
                            //for (var i = 0, l = data.data.expressTemplates.length; i < l; i++) {
                             // if(data.data.expressTemplates[i].default==1){
                              //_this.goodInfo.ltId = data.data.expressTemplates[i].id
                             // }
                           // }
                         // }

                          transition.next();
                      } else {
                          swal('读取失败', data.msg, 'warning');
                          transition.abort();
                      }
                  }).fail(function(xhr, exception) {
                      hrtCommon.ajaxFail(xhr, exception, '读取失败');
                      transition.abort();
                  }).always(function() {
                      hrtCommon.hideLoading();
                  });
                }
            }
        },
        ready: function () {
            //预览的主图轮播，必须在此处初始化。
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                if($(e.target).attr('href')=='#deploy'){
                    var swiper=new Swiper ('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 30,
                        centeredSlides: true,
                        autoplay: 2500,
                        autoplayDisableOnInteraction: false
                    });
                }
            })
        }
    }
</script>
