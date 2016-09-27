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
                <input type="text" class="form-control" v-model="salesGoodsSpec.name" placeholder="请输入名称！" style="width:90px">
            </div>

            <div v-for="item in salesGoodsSpec.specDetails" class="checkbox spec-attr-item">
                <label>
                    <input type="checkbox">{{item.value}}
                </label>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" v-model="tempValue" placeholder="" style="width:90px">
                <button class="form-control" @click="addSpecValue">新增</button>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';

    module.exports = {
        props: {
            salesGoodsSpec:Object
        },
        data: function () {
            return {
                tempValue:""
            }
        },
        computed: {

        },
        components: {

        },
        methods: {
            addSpecValue: function () {
                this.salesGoodsSpec.specDetails.push({
                    value:this.tempValue,
                    status:1
                });

                this.tempValue="";
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
