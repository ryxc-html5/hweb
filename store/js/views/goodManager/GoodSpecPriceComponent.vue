/*
 * 商品管理-商品编辑-价格规格-勾选规格列表单元
 **/
<style scoped>
    .spec-price-item a{
        cursor: pointer;
    }
</style>

<template>
    <tr class="spec-price-item">
        <td class="text-center" style="width:150px">{{productName}}</td>
        <td>
            <input type="text" v-model="product.goodsSN"  class="form-control" required>
        </td>
        <td>
            <input type="text" v-model="product.stock" required  class="form-control">
        </td>
        <td>
            <input type="text" v-model="product.salePrice" required  class="form-control"> 元 +
            <input type="text" v-model="product.point" required class="form-control"> 积分
        </td>
        <td>
            <input type="text" v-model="product.marketPrice" required  class="form-control">
        </td>
        <td>
            <input type="text" v-model="product.weight"  required class="form-control">
        </td>
        <td>
            <input type="text" v-model="product.minPurchaseNum"  required  class="form-control">
        </td>
        <td>
            <input type="text" v-model="product.maxPurchaseNum"  required  class="form-control">
        </td>
        <td class="text-center">
            <Img-upload :url-data="uploadImg"
                        :size="uploadImg.size"
                        :weight="uploadImg.weight"
                        :set-url="setUrl"
                        :img-url="product.tinyPictureUrl"
                        :show-img="2"
                        :show-img-style="{width:'140px',height:'140px',border:'1px solid #ccc'}"
                        show-img-alt="商品小图"
                        :show-center="1"></Img-upload>
        </td>
        <td class="text-center" style="width:50px">
            <a @click="delete">删除</a>
        </td>
    </tr>
</template>

<script>
    import $ from 'jquery';
    import ImgUpload from '../../../../common/js/components/ImgUpload';
    import swal  from 'sweetalert';

    module.exports = {
        props: {
            product:Object,
            productList:Array
        },
        data: function () {
            return {
                uploadImg: hrtCommon.getUploadObj({
                  width: 600,
                  height: 600,
                  weight: 100,
                  imgType: 'goods'
                })
            }
        },
        computed: {
            productName:{
                get: function () {
                    return this.product.goodsSpecDetialNameList.join("+");
                }
            }
        },
        components: {
            ImgUpload:ImgUpload
        },
        methods: {
            setUrl: function (data) {
                if (data.state != 'SUCCESS') {
                    swal("上传失败", data.state, "warning");
                } else {
                    this.product.tinyPictureUrl = data.origin_img_url;
                }
            },
            delete: function () {
                //if(this.productList.length>1){
                    this.productList.$remove(this.product);
                //}
            }
        },
        events: {

        },
        route:{
            data:function (transition) {

            }
        },
        ready: function () {

        }
    }
</script>
