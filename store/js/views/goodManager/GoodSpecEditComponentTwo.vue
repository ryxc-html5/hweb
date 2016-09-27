<style>
    .spec-edit-component .spec-item{
        padding: 15px;
        border: 1px dashed #cccccc;
        margin-bottom: 10px;
    }

    .spec-edit-component .spec-attr-item{
        margin-right: 10px;
    }

    .spec-edit-component .spec-attr-item:first-child{
        margin-left: 15px;
    }
</style>

<template>
    <div class="spec-edit-component">
        <div class="spec-item form-inline">
            <div class="form-group">
                <label class="sr-only">规格名称</label>
                <input type="text" class="form-control" v-model="salesGoodsSpec.name" placeholder="请输入名称！" style="width:100px">：
            </div>

            <div v-for="item in salesGoodsSpec.specDetails" class="checkbox spec-attr-item">
                <label>
                    <input type="checkbox">{{item.value}}
                </label>
            </div>
            <div class="form-group">
                <input type="text"
                       class="form-control"
                       v-model="tempValue"
                       v-on:keyup.13="addSpecValue"
                       placeholder=""
                       style="width:50px">
                <button class="form-control" @click="addSpec">新增</button>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import swal  from 'sweetalert';

    module.exports = {
        props: {
            salesGoodsSpecs:Array
        },
        data: function () {
            return {
                tempValue:"",

                salesGoodsSpec:{
                    name:"",
                    specDetails:[//规格值列表

                    ]
                }
            }
        },
        computed: {

        },
        components: {

        },
        methods: {
            addSpecValue: function () {
                if(this.tempValue==""){
                    swal('新增失败', '请输入规格属性值！', 'warning');
                    return false
                }
                this.salesGoodsSpec.specDetails.push({
                    value:this.tempValue,
                    status:1
                });

                this.tempValue="";
            },
            addSpec: function () {
                if(this.salesGoodsSpec.name==""){
                    swal('新增规格失败', '请输入规格名称！', 'warning');
                    return false
                }

                if(this.salesGoodsSpec.specDetails.length==0){
                    swal('新增规格失败', '请添加规格属性值！', 'warning');
                    return false
                }

                this.salesGoodsSpecs.push(this.salesGoodsSpec);
                this.salesGoodsSpec = {//重置salesGoodsSpec
                    name: "",
                    specDetails: [//规格值列表
                    ]
                }
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
