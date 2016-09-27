/*
 * 商品管理-商品编辑-其它信息单元
 **/
<style scoped>
    .other-info{
        padding: 15px 15px 0;
    }
    .form-group:last-child {
      margin-bottom: 0;
    }
    .other-info .relate-good-form{
        padding: 15px;
        border: 1px solid #cccccc;
    }
    .other-info .relate-good-table{
        margin-top: 15px;
    }
    .other-info .relate-good-table .table {
        margin-bottom: 0;
    }
    .other-info .relate-btn-container{
        height: 100px;
        line-height: 100px;
        vertical-align: middle;
        text-align: center;
        display: inline-block;
        width: 100%;
    }
    .relate-good-form-head {
        padding-left: 15px;
    }
    .relate-good-form-head .form-group {
        margin-right: 25px;
    }
    .width-sm {
      width: 120px;
    }
    .width-xl{width:400px}
    .margin-left-50{margin-left:50px}
</style>

<template>
    <div class="other-info">
        <div class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">是否包邮：</label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="isExemption" :value="0" v-model="goodInfo.isExemption"> 否
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="isExemption" :value="1" v-model="goodInfo.isExemption"> 是
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">是否限购：</label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="isPurchase" :value="0" v-model="goodInfo.isPurchase"> 否
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="isPurchase" :value="1" v-model="goodInfo.isPurchase"> 是
                    </label>
                    <label class="radio-inline form-inline" v-show="goodInfo.isPurchase">
                        限购数量：<input type="text" name="purchaseNum" class="form-control" v-model="goodInfo.purchaseNum"> 件
                    </label>
                    <p class="help-block">适用于所有规格</p>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">是否跨境购：</label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="overseasPurchase" :value="0" v-model="goodInfo.overseasPurchase"> 否
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="overseasPurchase" :value="1" v-model="goodInfo.overseasPurchase"> 是
                    </label>
                    <p class="help-block">选“是”则用户在提交订单时要填写姓名与对应身份证号</p>
                </div>
            </div>

            <!--是否虚拟商品 add by majie 2016-0831 -->
            <div class="form-group">
                <label class="col-sm-2 control-label">是否虚拟商品：</label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="isVirtual" :value="0" v-model="goodInfo.isVirtual"> 否
                    </label>
                    <label class="radio-inline">
                        <input type="radio" name="isVirtual" :value="1" v-model="goodInfo.isVirtual"> 是
                    </label>
                    <label class="radio-inline form-inline" v-show="goodInfo.isVirtual">
                        使用条件：<input type="text" name="" class="form-control width-xl" v-model="goodInfo.virtualUsingRule" maxlength="30">
                    </label>
                    <p class="help-block">使用条件将在电子券详情中展示，最多输入30字符</p>
                </div>
            </div>

            <!-- 2016-09-22 暂时隐藏运费模板选项 -->
            <!--
            <div class="form-group" v-if="!goodInfo.isVirtual">
                <label class="col-sm-2 control-label">运费模版选择：</label>
                <div class="col-sm-10">
                    <label v-for="item in expressTemplates" class="radio-inline">
                        <input type="radio" name="expressTemplates" :value="item.id" v-model="goodInfo.ltId"> {{item.name}}
                    </label>
                    <p class="help-block">运费模板内容在商家设置管理后台设置，这里只显示供选择的结果</p>
                </div>
            </div>
            -->

<!--是否启用门店列表 add by majie 2016-0831 -->
            <div class="form-group" >
                <label class="col-sm-2 control-label">是否启用门店列表 ：</label>
                <div class="col-sm-10">

                    <label class="radio-inline">
                        <input type="radio" :disabled="goodInfo.shopNum==0" name="showStore" :value="0" v-model="goodInfo.isUsingStorelist"> 否
                    </label>
                    <label class="radio-inline">
                        <input type="radio" :disabled="goodInfo.shopNum==0" name="showStore" :value="1" v-model="goodInfo.isUsingStorelist"> 是
                    </label>
                    <p class="help-block">选“是”，则商品详情中展示门店列表</p>
                </div>
            </div>
            <!--自提选项 add by majie 2016-0922 -->
            <div class="form-group" >
                <label class="col-sm-2 control-label">自提选项 ：</label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="showStore" :value="0" v-model="goodInfo.selfDeliveryOpt"> 不可自提
                    </label>
                    <a class="btn btn-info margin-left-50" target="_blank" v-link="{path: '/shop/delivery'}">自提模板维护</a>
                </div>
            </div>
            <div class="form-group" >
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="showStore" :value="1" v-model="goodInfo.selfDeliveryOpt"> 仅供自提
                    </label><p class="help-block">选中后，此商品仅支持自提购买方式</p>
                </div>
            </div>
            <div class="form-group" >
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10">
                    <label class="radio-inline">
                        <input type="radio" name="showStore" :value="2" v-model="goodInfo.selfDeliveryOpt"> 可选自提
                    </label><p class="help-block">选中后，用户可选自提或仍使用快递方式</p>
                </div>
            </div>
            <div class="form-group" >
                <label class="col-sm-2 control-label">自提时间段 ：</label>
                <div class="col-sm-4">
                    <select class="form-control" v-model="goodInfo.selfDeliveryTimes">
                        <option selected value="15">支付后15日内</option>
                        <option selected value="30">支付后30日内</option>
                        <option selected value="60">支付后60日内</option>
                        <option selected value="90">支付后90日内</option>
                        <option selected value="180">支付后180日内</option>
                    </select>
                </div>
            </div>
            <!--自提选项  结束 -->
            <div class="form-group">
                <label class="col-sm-2 control-label">关联销售：</label>
                <div class="col-sm-10">
                    <div class="relate-good-form">
                        <div class="relate-good-form-head">
                                <div class="form-inline">
                                    <div class="form-group">
                                        <label>分类：</label>
                                        <select class="form-control" v-model="searchParam.category">
                                            <option selected>请选择分类</option>
                                            <option v-for="goodCate in goodsCategories" :value="goodCate.id">{{goodCate.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>品牌：</label>
                                        <select class="form-control" v-model="searchParam.trademark">
                                            <option selected>请选择品牌</option>
                                            <option v-for="trademark in brandsList" :value="trademark.id">{{trademark.name}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label>关键字：</label>
                                        <input type="text" class="form-control width-sm" v-model="searchParam.keyword">
                                    </div>
                                    <div class="form-group">
                                        <button class="btn btn-success" @click="search">搜 索</button>
                                    </div>
                                </div>
                        </div>
                        <div class="relate-good-table">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr class="active">
                                            <td class="text-center">搜索出来的可选商品</td>
                                            <td class="text-center">操作</td>
                                            <td class="text-center">与该商品关联的商品</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <select multiple class="form-control" style="height:200px" v-model="addingGoods">
                                                    <option v-for="searchResult in searchResults"
                                                            :value="searchResult"
                                                            :dataId="searchResult.id"
                                                            :dataName="searchResult.name">
                                                        {{searchResult.name}}
                                                    </option>
                                                </select>
                                            </td>
                                            <td class="text-center">
                                                <span class="relate-btn-container">
                                                    <button class="btn" @click="addRelate"> >> </button>
                                                </span>
                                                <span>
                                                    <button class="btn" @click="removeRelate"> << </button>
                                                </span>
                                            </td>
                                            <td>
                                                <select multiple class="form-control" style="height:200px" v-model="removingGoods">
                                                    <option v-for="relateGood in relateGoods"
                                                            :value="relateGood">
                                                        {{relateGood.name}}
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
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

    var ajaxUrl={
        searchRelateGood:"/Ucenter/ShopGoods/searchReGoods"//搜索请求url
    };

    module.exports = {
        props: {
            goodInfo:Object,
            relateGoods:Array
        },
        computed:{
            
        },
        data: function () {
            return {
                expressTemplates:this.$select('goodDeploy.baseConfig.expressTemplates as expressTemplates'),//邮费模板列表
                goodsCategories:this.$select('goodDeploy.baseConfig.goodsCategories as goodsCategories'),//店铺商品列表
                brandsList:this.$select('goodDeploy.baseConfig.brandsList as brandsList'),//品牌列表
                searchParam:{
                    category:"",
                    trademark:"",
                    keyword:""
                },//搜索参数
                searchResults:[],//搜索到的结果
                addingGoods:[],//选中的将要添加的关联商品
                removingGoods:[]//选择的将要移除的关联商品
                //relateGoods:[]//选择的关联商品
            }
        },
        directive:{

        },
        methods: {
        goDelivery:function(){
        this.$route.router.go({'name':'shopDelivery'});
       
        //v-link="{path: '/shop/delivery'}" 
        },
            search: function () {
                var thiz=this;
                $.ajax({
                    url: ajaxUrl.searchRelateGood,
                    type: 'GET',
                    data: {
                        cartId:thiz.searchParam.category,
                        brandId:thiz.searchParam.trademark,
                        keywords:thiz.searchParam.keyword
                    },
                    dataType: 'json',
                    beforeSend: function() {
                      hrtCommon.showLoading(true);
                    }
                }).done(function (data) {
                    if (data.code == '0') {
                        thiz.searchResults=[];

                        var data=data.data;
                        for(var i=0;i<data.length;i++){

                            var isAdded=false;
                            for(var j=0;j<thiz.relateGoods.length;j++){
                                if(data[i].id==thiz.relateGoods[j].id){
                                    isAdded=true;
                                }
                            }

                            if(!isAdded){
                                thiz.searchResults.push(data[i]);
                            }
                        }

                    } else {
                        swal('获取数据失败', data.msg, 'warning');
                    }
                }).fail(function (xhr, exception) {
                    hrtCommon.ajaxFail(xhr, exception, '获取数据失败');
                }).always(function () {
                    hrtCommon.hideLoading(true);
                });
            },
            addRelate: function () {
                for(var i=0;i<this.addingGoods.length;i++){
                    this.relateGoods.push(this.addingGoods[i]);
                    this.searchResults.$remove(this.addingGoods[i]);
                }
                this.addingGoods=[];
                this.setRelatedGoodsIDs();
            },
            removeRelate: function () {
                for(var i=0;i<this.removingGoods.length;i++){
                    this.searchResults.push(this.removingGoods[i]);
                    this.relateGoods.$remove(this.removingGoods[i]);
                }
                this.removingGoods=[];
                this.setRelatedGoodsIDs();
            },
            setRelatedGoodsIDs: function () {
                var relateGoodIds=[];
                for(var i=0;i<this.relateGoods.length;i++){
                    relateGoodIds.push(this.relateGoods[i].id);
                }
                this.goodInfo.relatedGoodsIDs=relateGoodIds.join(",")
            }
        }
    }
</script>
