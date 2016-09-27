/*
 * 商品管理-商品编辑-预览发布单元
 **/
<style scoped>
    .good-preview{
        padding: 15px;
    }

    .good-preview .row{
        margin: 0;
    }

    .good-preview .col-sm-4,
    .good-preview .col-sm-8,
    .good-preview .col-sm-12{
        margin: 0;
        padding: 5px 0;
    }

    .good-preview .info-block-title{
        height: 40px;
        line-height: 30px;
        text-align: center;
        background-color: cornflowerblue;
        color: #FFFFFF;
    }

    .good-preview .info-item{
        padding: 5px 5px;
    }
    .good-preview .controller {
        float: left;
        padding: 0 80px;
    }
    .good-preview .container{
        float: left;
        width: 320px;
        height: 500px;
        padding: 0;
        background-color: #f7f7f7;
        border: 1px solid #cccccc;
        overflow-y: scroll;
    }
    .good-preview .container::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
    }
    .good-preview .container::-webkit-scrollbar {
      width: 12px;
      background-color: #F5F5F5;
    }
    .good-preview .container::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }
    .good-preview .container img {
        max-width: 100%;
    }

    .good-preview .preview-container{
        min-height: 500px;
    }

    .good-preview .preview-container .row{
        margin: 0;
    }
    .good-preview .preview-container .row .banner {
        border-bottom: 1px solid #cccccc;
        margin-bottom: 10px;
        padding: 0;
    }

    .good-preview .row.tab-block{
        margin: 10px 0px;
        background-color: #FFFFFF;
    }

    .good-preview .product-item-container{
        background-color: aliceblue;
        margin-bottom: 10px;
    }
</style>

<template>
    <div class="good-preview">
        <div class="container">
                <div class="preview-container">
                    <div class="">
                        <div class="row tab-block" style="min-height:170px">
                            <div class="col-sm-12 banner">
                                <!--商品主图-->
                                <div class="swiper-container">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide" v-for="item in goodInfo.goodsPictures">
                                            <img :src="item.pictureAddr" style="width:100%"/>
                                        </div>
                                    </div>
                                    <div class="swiper-pagination"></div>
                                </div>
                            </div>
                        </div>

                        <div class="row tab-block">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12 info-block-title">
                                        基本信息
                                    </div>
                                </div>
                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >商品名称：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{goodInfo.name}}</span>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >副标题：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{goodInfo.subtitle}}</span>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >商品编码：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{goodInfo.goodssn}}</span>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >计量单位：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{goodInfo.unit}}</span>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >品牌：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cBrandID}}</span>
                                    </div>
                                </div>

                                <!--基本属性-->
                                <div class="base-attr-container">
                                    <div class="row info-item" v-for=" item in cUnSalesGoodsSpecs">
                                        <div class="col-sm-4 ">
                                            <span >{{item.name}}：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{item.value}}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >店铺分类：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cShopType}}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="row tab-block">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12 info-block-title">
                                        价格/规格
                                    </div>
                                </div>
                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >是否启用规格：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cIsShowSpec}}</span>
                                    </div>
                                </div>

                                <div v-for="product in cProductList" class="product-item-container">
                                    <div class="row info-item">
                                        <div class="col-sm-4 ">
                                            <span >规格：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.goodsSpecDetialNameList.join(',')}}</span>
                                        </div>
                                    </div>

                                    <div class="row info-item" v-show="goodInfo.isShowSpec">
                                        <div class="col-sm-4 ">
                                            <span >商品编码：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.goodsSN}}</span>
                                        </div>
                                    </div>

                                    <div class="row info-item">
                                        <div class="col-sm-4 ">
                                            <span >销售价：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.salePrice}}元<span v-show="product.point != ''"> + {{product.point}}积分</span></span>
                                        </div>
                                    </div>

                                    <div class="row info-item">
                                        <div class="col-sm-4 ">
                                            <span >市场价：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.marketPrice}}元</span>
                                        </div>
                                    </div>

                                    <div class="row info-item">
                                        <div class="col-sm-4 ">
                                            <span >库存：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.stock}}</span>
                                        </div>
                                    </div>

                                    <div class="row info-item">
                                        <div class="col-sm-4 ">
                                            <span >最小购买数量：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.minPurchaseNum}}</span>
                                        </div>
                                    </div>

                                    <div class="row info-item">
                                        <div class="col-sm-4 ">
                                            <span >最大购买数量：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.maxPurchaseNum}}</span>
                                        </div>
                                    </div>

                                    <div class="row info-item" v-show="goodInfo.isShowSpec">
                                        <div class="col-sm-4 ">
                                            <span >重量：</span>
                                        </div>
                                        <div class="col-sm-8 ">
                                            <span >{{product.weight}}</span>
                                        </div>
                                    </div>

                                    <div class="row info-item">
                                        <div class="col-sm-12 ">
                                            <img :src="product.tinyPictureUrl">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row tab-block">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12 info-block-title">
                                        图文详情
                                    </div>
                                </div>

                                <div class="row info-item" v-for="item in cDesc">
                                    <div class="col-sm-12">
                                        <img v-if="item.type=='img'" :src="item.content"/>
                                        <div v-else>{{item.content}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row tab-block">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-12 info-block-title">
                                        其他信息
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >是否包邮：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cIsExemption}}</span>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >是否限购：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cIsPurchase}}</span>
                                    </div>
                                </div>

                                <div class="row info-item" v-show="goodInfo.isPurchase">
                                    <div class="col-sm-4 ">
                                        <span >限购数量：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{goodInfo.purchaseNum}}</span>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >是否跨境购：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cOverseasPurchase}}</span>
                                    </div>
                                </div>

                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >运费模版：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cLtId}}</span>
                                    </div>
                                </div>
                                <div class="row info-item">
                                    <div class="col-sm-4 ">
                                        <span >关联销售：</span>
                                    </div>
                                    <div class="col-sm-8 ">
                                        <span >{{cRelatedGoodsIDs}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="controller">
            <button @click="save" class="btn btn-primary btn-lg" data-loading-text="Loading..." autocomplete="off">保存发布</button>
        </div>

    </div>
</template>

<script>
    import $ from 'jquery';
    import Swiper from 'swiper';
    import store from '../../store/store'
    import * as  acction from '../../actions/actions'

    var ajaxUrl={
        saveUrl:'/Ucenter/ShopGoods/saveGoodsData',
        updateUrl: '/Ucenter/ShopGoods/updateGoods'
    };

    module.exports = {
        props: {
            goodInfo:Object
        },
        data: function () {
            return {
                expressTemplates:this.$select('goodDeploy.baseConfig.expressTemplates as expressTemplates'),//邮费模板列表
                goodsCategories:this.$select('goodDeploy.baseConfig.goodsCategories as goodsCategories'),//店铺商品列表
                trademarks:this.$select('goodDeploy.baseConfig.trademarks as trademarks'),//品牌列表
                goodsNoSaleSpecs: this.$select('goodDeploy.baseConfig.goodsNoSaleSpecs as goodsNoSaleSpecs'),
                shopCategories: this.$select('goodDeploy.baseConfig.shopCategories as shopCategories')// 商品分类
            }
        },
        computed: {
            //品牌
            cBrandID:{
                get: function () {
                    var value=this.goodInfo.brandID;
                    for(var i=0;i<this.trademarks.length;i++){
                        if(this.trademarks[i].id==value){
                            value=this.trademarks[i].name;
                            break;
                        }
                    }

                    return value;
                }
            },
            //基本属性
            cUnSalesGoodsSpecs:{
                get: function () {
                    var value=[];
                    var unSalesGoodsSpecs =this.goodInfo.unSalesGoodsSpecs;
                    for(var i=0;i<unSalesGoodsSpecs.length;i++){
                        var goodsSpecId=unSalesGoodsSpecs[i].goodsSpecId;//基本属性的规格id
                        var aliases=unSalesGoodsSpecs[i].aliases;//基本属性规格值

                        var tempObj={};
                        var goodsNoSaleSpecs=this.goodsNoSaleSpecs;
                        for(var j=0;j<goodsNoSaleSpecs.length;j++){
                            if(goodsSpecId==goodsNoSaleSpecs[j].gsId){
                                tempObj.name=goodsNoSaleSpecs[j].gsName;

                                if(goodsNoSaleSpecs[j].gsInputType=='1'||goodsNoSaleSpecs[j].gsInputType=='3'){//1文本框，3文本域
                                    tempObj.value=aliases;
                                }else if(goodsNoSaleSpecs[j].gsInputType=='2'){//下拉
                                  if (goodsNoSaleSpecs[j].specDetails && goodsNoSaleSpecs[j].specDetails.length) {
                                    for(var k=0;k<goodsNoSaleSpecs[j].specDetails.length;k++){
                                        if(aliases==goodsNoSaleSpecs[j].specDetails[k].gsdId){
                                            tempObj.value=goodsNoSaleSpecs[j].specDetails[k].gsdValue;
                                            break;
                                        }
                                    }
                                  }
                                }

                                value.push(tempObj);
                            }
                        }

                    }

                    return value;
                }
            },
            //店铺分类
            cShopType:{
                get:function(){
                    var value=[];
                    var shopType=this.goodInfo.shopType;
                    var dataParent = this.shopCategories;
                    var dataChild = null;
                    for(var j=0;j<shopType.length;j++){
                        for(var i=0;i<dataParent.length;i++){
                            if(shopType[j]==dataParent[i].id){
                                value.push(dataParent[i].name);
                            } else {
                                if (dataParent[i].children) {
                                    dataChild = dataParent[i].children;
                                    for (var k = 0; k < dataChild.length; k++) {
                                        if (shopType[j] == dataChild[k].id) {
                                            value.push(dataChild[k].name);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return value.join(",");
                }
            },
            //是否启用规格
            cIsShowSpec:{
                get: function () {
                    if(!this.goodInfo.isShowSpec){
                        return '否';
                    }else{
                        return '是';
                    }
                }
            },
            //产品规格
            cProductList: {
                get: function() {
                    if (!this.goodInfo.isShowSpec) {
                        return [].concat([this.goodInfo.productList[0]]);
                    } else {
                        return this.goodInfo.productList.slice(1);
                    }
                }
            },
            //图文详情
            cDesc:{
                get: function () {
                    return this.goodInfo.desc;
                }
            },
            //是否包邮
            cIsExemption:{
                get: function () {
                    if(this.goodInfo.isExemption=='0'){
                        return '否';
                    }else{
                        return '是';
                    }
                }
            },
            //是否限购
            cIsPurchase:{
                get: function () {
                    if(this.goodInfo.isPurchase=='0'){
                        return '否';
                    }else{
                        return '是';
                    }
                }
            },
            //是否跨境购
            cOverseasPurchase:{
                get: function () {
                    if(this.goodInfo.overseasPurchase=='0'){
                        return '否';
                    }else{
                        return '是';
                    }
                }
            },
            //关联销售
            cRelatedGoodsIDs:{
                get: function () {
                    return this.goodInfo.relatedGoodsIDs
                }
            },
            //运费模版
            cLtId:{
                get: function () {
                    var value=this.goodInfo.ltId;
                    for(var i=0;i<this.expressTemplates.length;i++){
                        if(this.expressTemplates[i].id==value){
                            value=this.expressTemplates[i].name;
                            break;
                        }
                    }
                    return value;
                }
            }
        },
        methods: {
            save: function(e) {
                var thiz=this;
                //thiz.goodInfo.desc=JSON.stringify(thiz.goodInfo.desc);//转换图文详情。

                // 复制对象，避免直接操作源数据
                var saveData = $.extend(true, {}, this.goodInfo);
                saveData.desc = JSON.stringify(saveData.desc);
                if (saveData.isShowSpec == 1) {
                  saveData.productList.splice(0, 1);
                } else {
                  saveData.productList.splice(1, saveData.productList.length - 1);
                }
                //当非虚拟商品时，清空虚拟商品说明
                saveData.virtualUsingRule=(saveData.isVirtual==0?'':saveData.virtualUsingRule)
                console.log(JSON.stringify(saveData));
                var valid = hrtCommon.validate;
                if (!$.trim(saveData.name)) {
                  swal('保存失败', '请填写商品名称', 'warning');
                  return false;
                }
                if (!$.trim(saveData.goodssn)) {
                  swal('保存失败', '请填写商品编码', 'warning');
                  return false;
                }
                if (!valid.ssn(saveData.goodssn)) {
                  swal('保存失败', '请正确填写商品编码', 'warning');
                  return false;
                }
                if (!$.trim(saveData.brandID)) {
                  swal('保存失败', '请选择品牌', 'warning');
                  return false;
                }
                var hasUpload = false;
                for (var i = 0, l = saveData.goodsPictures.length; i < l; i++) {
                  if (!!saveData.goodsPictures[i].pictureAddr) {
                  hasUpload = true;
                  saveData.goodsPictures[i].seq=i;
                  }

                }
                if (!hasUpload) {
                  swal('保存失败', '请上传商品主图', 'warning');
                  return false;
                }
                console.log(saveData);
                if (!saveData.productList.length) {


                  swal('保存失败', '请添加并选取规格商品', 'warning');
                  return false;
                }
                //console.log(saveData.salesGoodsSpecs.length);
                for(var i=0,l=saveData.salesGoodsSpecs.length;i<l;i++){
                    var item=saveData.salesGoodsSpecs[i];
                    if(item.specDetails.length<1){
                         swal('保存失败', '请添加规格'+(i+1)+'的属性', 'warning');
                    return false;
                    }
                }
                for (var i = 0, l = saveData.productList.length; i < l; i++) {
                  var item = saveData.productList[i];
                  if ( ((!$.trim(item.salePrice) || parseFloat($.trim(item.salePrice)) == 0) && (!$.trim(item.point) || $.trim(item.point) == '0')) || ($.trim(item.salePrice) && !valid.price(item.salePrice)) || !valid.int(item.point) ) {
                    swal('保存失败', '请正确填写销售价', 'warning');
                    return false;
                  }
                  if (!valid.price(item.marketPrice)) {
                    swal('保存失败', '请正确填写市场价', 'warning');
                    return false;
                  }
                  if (!valid.posInt(item.stock)) {
                    swal('保存失败', '请正确填写商品库存', 'warning');
                    return false;
                  }
                  if (!valid.posInt(item.minPurchaseNum)) {
                    swal('保存失败', '请正确填写最小购买数量', 'warning');
                    return false;
                  }
                  if (!$.trim(item.maxPurchaseNum) || !valid.int(item.maxPurchaseNum)) {
                    swal('保存失败', '请正确填写最大购买数量', 'warning');
                    return false;
                  }
                  if (!$.trim(item.tinyPictureUrl)) {
                    swal('保存失败', '请上传商品小图', 'warning');
                    return false;
                  }
                  if (saveData.isShowSpec) {
                    if (!$.trim(item.goodsSN) || !valid.ssn(item.goodsSN)) {
                      swal('保存失败', '请正确填写商品编码', 'warning');
                      return false;
                    }
                    if (!$.trim(item.weight)) {
                      swal('保存失败', '请正确填写重量', 'warning');
                      return false;
                    }
                  }
                }
                if (saveData.isPurchase && !valid.posInt(saveData.purchaseNum)) {
                  swal('保存失败', '请正确填写限购数量', 'warning');
                  return false;
                }

                
                var $this = $(e.target);
                swal({
                    title: "是否确定保存并发布?",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确认",
                    cancelButtonText: "取消"
                }, function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            url: !!thiz.goodInfo.goodsID ? ajaxUrl.updateUrl : ajaxUrl.saveUrl,
                            type: 'POST',
                            data: saveData,
                            dataType: 'json',
                            beforeSend: function() {
                              $this.button('loading');
                              hrtCommon.showLoading(true);
                            }
                        }).done(function(data) {
                            if (data.code == '0') {
                                swal({
                                    title: "保存成功",
                                    type: "success"
                                }, function () {
                                    thiz.$route.router.go({
                                        'name':'goodList'
                                    });
                                });
                            } else {
                                swal('保存失败', data.msg, 'warning');
                            }
                        }).fail(function (xhr, exception) {
                            hrtCommon.ajaxFail(xhr, exception, '保存失败');
                        }).always(function () {
                            $this.button('reset');
                            hrtCommon.hideLoading(true);
                        });
                    } else {
                        // swal("取消保存", "", "warning");
                    }
                });
            }
        }
    }
</script>
