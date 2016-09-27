/*
 * 商品管理-商品编辑-价格规格单元
 **/
<style scoped>
  .price-spec {
    padding: 5px 15px 0;
  }
  .hrt-color-red {
    display: inline-block;
    padding-right: 10px;
    font-size: 1.25em;
    color: red;
    vertical-align: middle;
  }
    .price-spec .total-title{
        height: 40px;
        line-height: 40px;
    }
    .price-spec .disabledSpec {
        padding: 15px 15px 0;
        border: 1px solid #cccccc;
    }
    .price-spec .enabledSpec {
        padding: 15px;
        border: 1px dashed #cccccc;
        margin-bottom: 10px;
    }
    .price-spec .spec-attr-item{
        margin-right: 20px;
    }
    .price-spec .spec-cell{
        margin-bottom: 15px;
    }
    .price-spec .spec-cell:last-child{
        margin-bottom: 0;
    }
    .price-spec .spec-input {
      width: 80px;
    }
    .price-spec .table {
      margin-bottom: 0;
    }
</style>

<template>
    <div class="price-spec">
        <div class="row">
            <div class="total-title col-md-2">
                商品规格：
            </div>
            <div class="col-md-10">
                <div class="checkbox">
                    <label>
                        <input type="checkbox"
                               :true-value="1"
                               :false-value="0"
                               v-model="goodInfo.isShowSpec"
                               @change="toggleProdulist">
                        启用规格
                    </label>
                </div>
                <div v-show="!goodInfo.isShowSpec">
                    <div class="disabledSpec">
                        <div class="form-horizontal">
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>销售价</label>
                                <div class="col-sm-10 form-inline">
                                    <input type="text" class="form-control" v-model="disabledSpecData.salePrice"> 元 +
                                    <input type="text" class="form-control" v-model="disabledSpecData.point"> 积分
                                    <p class="help-block">销售价为人民币与积分价格组合，人民币金额保留两位小数、积分金额只能填写整数，两者不能同时为零</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>市场价</label>
                                <div class="col-sm-10 form-inline">
                                    <input type="text" class="form-control" v-model="disabledSpecData.marketPrice">
                                    <p class="help-block">保留两位小数</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>商品库存</label>
                                <div class="col-sm-10 form-inline">
                                    <input type="text" class="form-control" v-model="disabledSpecData.stock">
                                    <p class="help-block">只能填写正整数</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>最小购买数量</label>
                                <div class="col-sm-10 form-inline">
                                    <input type="text" class="form-control" v-model="disabledSpecData.minPurchaseNum">
                                    <p class="help-block">如不填写默认为1</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>最大购买数量</label>
                                <div class="col-sm-10 form-inline">
                                    <input type="text" class="form-control" v-model="disabledSpecData.maxPurchaseNum">
                                    <p class="help-block">默认为0，为不限制</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>小图</label>
                                <div class="col-sm-10">
                                    <Img-upload :url-data="uploadImg"
                                                :size="uploadImg.size"
                                                :weight="uploadImg.weight"
                                                :set-url="setUrl"
                                                :img-url="disabledSpecData.tinyPictureUrl"
                                                :show-img="2"
                                                :show-img-style="{width:'140px',height:'140px',border:'1px solid #ccc'}"
                                                show-img-alt="商品小图"
                                                :show-tips="1"></Img-upload>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="goodInfo.isShowSpec">
                    <div class="enabledSpec">
                        <div class="form-inline">
                          <div class="form-group">
                            <label class="sr-only">规格名称</label>
                            <input type="text" class="form-control" v-model="modelSpecName" placeholder="规格名称">
                          </div>
                          <button class="btn btn-info" @click="addSpec">新增</button>
                        </div>
                    </div>
                    <div class="enabledSpec" v-show="goodInfo.salesGoodsSpecs.length">
                        <div v-for="(index, spec) in goodInfo.salesGoodsSpecs" class="form-inline spec-cell" transition="fade" transition-mode="out-in">
                            <div class="form-group">
                                <button class="btn btn-sm btn-default" @click="delSpec(index)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                                <input type="text" class="form-control input-sm" :value="spec.name" readonly>
                                ：
                            </div>
                            <div v-for="item in spec.specDetails" class="checkbox spec-attr-item" transition="fade" transition-mode="out-in">
                                <label :specName="spec.name" :specAttrValue="item.value">
                                    <input name="_specAttrValue_" type="checkbox" @change="operSpecAttr" v-model="modelSpecValue[index].sel" :value="item.value">{{item.value}}
                                </label>
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control input-sm spec-input" v-model="modelSpecValue[index].txt" placeholder="属性名称">
                                <button class="btn btn-sm btn-default" @click="addSpecValue(index)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                                <button class="btn btn-sm btn-default" @click="delSpecValue(index)" :class="{disabled: !spec.specDetails.length}"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></button>
                            </div>
                        </div>
                    </div>
                    <div v-show="enabledSpecData.length > 1">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="active">
                                    <td class="text-center">规格</td>
                                    <td class="text-center">商品编码</td>
                                    <td class="text-center">库存</td>
                                    <td class="text-center">销售价</td>
                                    <td class="text-center">市场价</td>
                                    <td class="text-center">重量（g）</td>
                                    <td class="text-center">最小购买数量</td>
                                    <td class="text-center">最大购买数量</td>
                                    <td class="text-center">小图 (尺寸: 600*600)</td>
                                    <td class="text-center">操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr is="Good-spec-price-component" v-for="product in enabledSpecData | limitBy 100 1" :product="product" :product-list="enabledSpecData"></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import GoodSpecPriceComponent from './GoodSpecPriceComponent';
    import GoodSpecEditComponentTwo from './GoodSpecEditComponentTwo';
    import ImgUpload from '../../../../common/js/components/ImgUpload';

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
        props: {
            goodInfo:Object,
            modelSpecValue: Array
        },
        data: function () {
            return {
                uploadImg: hrtCommon.getUploadObj({
                  width: 600,
                  height: 600,
                  weight: 100,
                  imgType: 'goods'
                }),
                modelSpecName: ''
            }
        },
        computed: {
            disabledSpecData:{
                get: function () {
                    return this.goodInfo.productList[0];
                }
            },
            enabledSpecData:{
                get: function () {
                    return this.goodInfo.productList;
                }
            }
        },
        components: {
            ImgUpload:ImgUpload,
            GoodSpecEditComponentTwo:GoodSpecEditComponentTwo,
            GoodSpecPriceComponent:GoodSpecPriceComponent
        },
        methods: {
            // 新增规格
            addSpec: function() {
              if (!this.modelSpecName) {
                swal('新增规格失败', '规格名称不能为空', 'warning');
              } else {
                var specs = this.goodInfo.salesGoodsSpecs;
                for (var i = 0, l = specs.length; i < l; i++) {
                  if (specs[i].name == this.modelSpecName) {
                    return swal('新增规格失败', '规格名称已经存在', 'warning');
                  }
                }
                specs.push({
                  name: this.modelSpecName,
                  specDetails: []
                });
                this.modelSpecValue.push({
                  txt: '',
                  sel: []
                });
                this.modelSpecName = '';
              }
            },

            // 删除规格
            delSpec: function(index) {
              var _this = this;
              var item = this.goodInfo.salesGoodsSpecs[index];
              swal({
                title: '确定要删除规格' + item.name + '吗？',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }, function() {
                _this.goodInfo.salesGoodsSpecs.$remove(item);
                _this.modelSpecValue.$remove(_this.modelSpecValue[index]);
                _this.operSpecAttr();
              });
            },

            // 新增属性
            addSpecValue: function(index) {
              var item = this.goodInfo.salesGoodsSpecs[index].specDetails;
              var txt = this.modelSpecValue[index].txt;
              if (!txt) {
                swal('新增属性失败', '属性名称不能为空', 'warning');
              } else {
                for (var i = 0, l = item.length; i < l; i++) {
                  if (item[i].value == txt) {
                    return swal('新增属性失败', '属性名称已经存在', 'warning');
                  }
                }
                item.push({
                    value: txt,
                    status: 1
                });
                this.modelSpecValue[index].txt = '';
              }
            },

            // 删除属性
            delSpecValue: function(index) {
              var _this = this;
              var item = this.goodInfo.salesGoodsSpecs[index].specDetails;
              var len = item.length - 1;
              if (len < 0) return;
              swal({
                title: '确定要删除属性' + item[len].value + '吗？',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }, function() {
                var vals = _this.modelSpecValue[index].sel;
                var num = vals.indexOf(item[len].value);
                if (num != -1) {
                  vals.$remove(vals[num]);
                }
                item.$remove(item[len]);
                _this.operSpecAttr();
              });
            },

            toggleProdulist: function () {
              /*if(!this.goodInfo.isShowSpec){//不启用规格
                  this.goodInfo.productList=[this.disabledSpecData];
              }else{//启用规格
                  this.goodInfo.productList=this.enabledSpecData;
              }*/
            },

            // 选取规格属性
            operSpecAttr: function () {
              var list = this.goodInfo.productList;
              var specArr = [];
              var specObj = {};
              var lenTotal = 0;
              var lenTemp = 0;
              var i;
              var l;
              var tempId;
              var specTemp = [];
              var newTemp = {};

              // 先遍历已选取的属性，计算生成结果数量及生成规格集
              for (i = 0, l = this.modelSpecValue.length; i < l; i++) {
                lenTemp = this.modelSpecValue[i].sel.length;
                if (lenTemp) {
                  lenTotal = lenTotal == 0 ? lenTemp : lenTotal * lenTemp;
                  specArr = this.assemblyArray(this.modelSpecValue[i].sel, specArr);
                }
              }

              // 如果生成的规格集不为0，开始对比结果进行操作（增、删），如果为0，则直接清掉多规格
              if (lenTotal) {

                // 生成规格树，便于索引查找
                for (i = 0, l = specArr.length; i < l; i++) {
                  specObj[specArr[i].join('+')] = specArr[i];
                }

                // 遍历现有的产品规格并对比规格树
                for (i = 1, l = list.length; i < l; i++) {
                  tempId = list[i].goodsSpecDetialNameList.join('+');
                  if (specObj[tempId]) {
                    // 将已存在树枝删除，剩下的则是此次增加的规格
                    delete specObj[tempId];
                  } else {
                    // 将多余的规格放进数组，等待删除
                    specTemp.push(list[i]);
                  }
                }

                // 开始删除规格
                for (i = 0, l = specTemp.length; i < l; i++) {
                  list.$remove(specTemp[i]);
                }

                // 开始增加规格
                for (i in specObj) {
                  newTemp = GetPriceObj();
                  newTemp.goodsSpecDetialNameList = specObj[i];
                  list.push(newTemp);
                }
              } else {
                lenTemp = list.length;
                if (lenTemp > 1) {
                  list.splice(1, lenTemp - 1);
                }
              }
            },
            assemblyArray: function (arrayA,arrayB) {
                var result=[];
                if(!arrayB || !arrayB.length){
                    arrayB=[];
                    for(var i=0;i<arrayA.length;i++){
                        arrayB[i]=[];
                        result[i]=arrayB[i].concat([arrayA[i]]);
                    }

                }else {
                    var k=0;
                    for (var j = 0; j < arrayA.length; j++) {
                        for (var i = 0; i < arrayB.length; i++) {
                            result[k]=arrayB[i].concat([arrayA[j]]);
                            k++;
                        }
                    }
                }
                return result;
            },
            setUrl: function (data) {
                if (data.state != 'SUCCESS') {
                    swal("上传失败", data.state, "warning");
                } else {
                    this.disabledSpecData.tinyPictureUrl = data.origin_img_url;
                }
            }
        },
        created: function() {
            this.goodInfo.productList.push(GetPriceObj());
        },
        ready: function () {
            //this.toggleProdulist();
        }
    }
</script>
