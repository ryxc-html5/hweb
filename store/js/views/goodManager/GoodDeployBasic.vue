/*
 * 商品管理-商品编辑-基本信息单元
 * lxw
 * 2016-08-05
 **/
<style scoped>
  .hrt-deploy-content {
    padding: 15px 15px 0;
  }
  .form-group:last-child {
    margin-bottom: 0;
  }
  .hrt-color-red {
    display: inline-block;
    padding-right: 10px;
    font-size: 1.25em;
    color: red;
    vertical-align: middle;
  }
  .hrt-deploy-upload {
    float: left;
    margin-right: 10px;
  }
  .hrt-deploy-box {
    padding: 10px;
  }
  .hrt-deploy-box label {
    font-weight: normal;
  }
  .hrt-deploy-box .tmain {
    padding-bottom: 12px;
  }
  .hrt-deploy-box .tbody {
    padding-left: 1em;
    margin-top: -5px;
  }
</style>

<template>
  <div class="hrt-deploy-content">
      <div class="form-horizontal">
        <div class="form-group">
          <label for="goodname" class="col-sm-2 control-label"><span class="hrt-color-red">*</span>商品名称</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="goodname" v-model="goodInfo.name" maxLength="50">
            <p class="help-block">最多输入50字符</p>
          </div>
        </div>
        <div class="form-group">
          <label for="subtitle" class="col-sm-2 control-label">副标题</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="subtitle" v-model="goodInfo.subtitle" maxLength="30">
            <p class="help-block">最多输入30字符</p>
          </div>
        </div>
        <div class="form-group">
          <label for="goodssn" class="col-sm-2 control-label"><span class="hrt-color-red">*</span>商品编码</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="goodssn" v-model="goodInfo.goodssn" maxLength="30">
            <p class="help-block">字母、数字或“_”、“-”组成，请不要其他字符</p>
          </div>
        </div>
        <div class="form-group">
          <label for="goodunit" class="col-sm-2 control-label">计量单位</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="goodunit" v-model="goodInfo.unit" maxLength="30">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>品牌</label>
          <div class="col-sm-4">
            <select class="form-control" v-model="goodInfo.brandID">
              <option value="">请选择商品品牌</option>
              <option v-for="brand in brandsList" :value="brand.id">{{ brand.name }}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">基本属性</label>
          <div class="col-sm-10">
            <div class="bg-info hrt-deploy-box">
              <div v-if="goodsNoSaleSpecs.length">
                <div class="form-group" v-for="spec in goodsNoSaleSpecs | orderBy listOrder">
                  <label class="col-sm-2 control-label">{{ spec.gsName }}</label>
                  <div class="col-sm-5">
                    <input type="hidden" :value="spec.gsId" v-model="goodInfo.unSalesGoodsSpecs[$index].goodsSpecId">
                    <input type="text" class="form-control" v-if="spec.gsInputType == '1'" v-model="goodInfo.unSalesGoodsSpecs[$index].aliases">
                    <select class="form-control" v-if="spec.gsInputType == '2'" v-model="goodInfo.unSalesGoodsSpecs[$index].aliases">
                      <option value="">请选择</option>
                      <option v-for="detail in spec.specDetails | orderBy itemOrder" :value="detail.gsdId">{{ detail.gsdValue }}</option>
                    </select>
                    <textarea class="form-control" v-if="spec.gsInputType == '3'" v-model="goodInfo.unSalesGoodsSpecs[$index].aliases"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">所属店铺分类</label>
          <div class="col-sm-10">
            <div class="bg-info hrt-deploy-box">
              <div class="tmain" v-for="cate in shopCategories">
                <div class="thead">
                  <label>
                    <input type="checkbox" :value="'' + cate.id" v-if="!cate.children || !cate.children.length" v-model="goodInfo.shopType">
                    {{ cate.name }}
                  </label>
                </div>
                <div class="tbody" v-if="cate.children && cate.children.length">
                  <div class="checkbox" v-for="child in cate.children">
                    <label>
                      <input type="checkbox" :value="'' + child.id" v-model="goodInfo.shopType" @change="checkRadio($event, cate.id)">
                      {{ child.name }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label"><span class="hrt-color-red">*</span>商品主图</label>
          <div class="col-sm-10">
            <div class="clearfix">
              <div class="hrt-deploy-upload" v-for="pic in uploadImg">
                <Img-upload :url-data="pic"
                            :size="pic.size"
                            :weight="pic.weight"
                            :set-url="setUrl"
                            :set-url-param="{index: $index}"
                            :img-url="goodInfo.goodsPictures[$index].pictureAddr"
                            :show-img="2"
                            :show-img-style="{width:'140px',height:'140px',border:'1px solid #ccc'}"
                            :show-img-alt="$index == 0 ? '商品主图' : '商品细节图'"
                            :show-center="1"></Img-upload>
              </div>
            </div>
            <p class="help-block">{{ uploadImg.pic1.tips }}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import store from '../../store/store';
  import * as  acction from '../../actions/actions';
  import $ from 'jquery';
  import ImgUpload from '../../../../common/js/components/ImgUpload';

  // 生成图片组件所需对象
  function GetPicObj() {
   return hrtCommon.getUploadObj({
     width: 800,
     height: 800,
     weight: 150,
     imgType: 'goods'
   })
  }

  module.exports = {
    props: {
      goodInfo: Object
    },
    data: function() {
      return {
        // 品牌列表
        brandsList:this.$select('goodDeploy.baseConfig.brandsList as brandsList'),
        //trademarks: this.$select('goodDeploy.baseConfig.trademarks as trademarks'),
        // 基本属性
        goodsNoSaleSpecs: this.$select('goodDeploy.baseConfig.goodsNoSaleSpecs as goodsNoSaleSpecs'),
        // 商品分类
        shopCategories: this.$select('goodDeploy.baseConfig.shopCategories as shopCategories'),
        // 商品主图集
        uploadImg: {
          pic1: GetPicObj(),
          pic2: GetPicObj(),
          pic3: GetPicObj(),
          pic4: GetPicObj(),
          pic5: GetPicObj()
        }
      }
    },
    components: {
      ImgUpload: ImgUpload
    },
    methods: {
      setUrl: function(data, param) {
        if (data.state != 'SUCCESS') {
          swal('上传失败', data.state, 'warning');
        } else {
          this.goodInfo.goodsPictures[param.index].pictureAddr = data.origin_img_url;
        }
      },
      listOrder: function(a, b) {
        return parseInt(a.gsOrder) - parseInt(b.gsOrder);
      },
      itemOrder: function(a, b) {
        return parseInt(a.gsdOrder) - parseInt(b.gsdOrder);
      },
      checkRadio: function(e, pid) {
        var $this = $(e.target);
        var types = this.goodInfo.shopType;
        var datas = this.shopCategories;
        var items = null;
        var temp = '';
        if ($this.is(':checked')) {
          for (var i = 0, l = datas.length; i < l; i++) {
            if (datas[i].id == pid) {
              items = datas[i].children;
              for (var j = 0, k = items.length; j < k; j++) {
                if (items[j].id != $this.val()) {
                  temp = types.indexOf(items[j].id);
                  if (temp != -1) {
                    types.$remove(types[temp]);
                  }
                }
              }
            }
          }
        }
      }
    },
    created: function() {
      // 如果有编辑或者新增过商品信息，goodsNoSaleSpecs已存在STORE里，此时来到此页面需要先遍历以防报错
      if (this.goodsNoSaleSpecs.length) {
        if (!this.goodInfo.unSalesGoodsSpecs.length) {
          for (var i = 0, l = this.goodsNoSaleSpecs.length; i < l; i++) {
            this.goodInfo.unSalesGoodsSpecs.push({
              aliases: '',
              goodsSpecId: 0,
              isSaleSpec: 0
            });
          }
        }
      }
    }
  }
</script>
