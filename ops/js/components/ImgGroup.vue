<template>
    <div class="image-row" :type="type" :column="column">
        <Img-cell v-for="imgCellData in imgCellList" :img-cell-data="imgCellData" :index="$index" @delete="deleteCell"></Img-cell>
    </div>
</template>
<style>

</style>
<script>
    var swal = require('sweetalert');
    var ImgCell = require('./ImgCell');
    var $ = require('jquery');
    module.exports = {
        props: {
            type:String,
            column:String,
            imgCellList:Array
        },
        data: function() {
            return {

            }
        },
        components: {
            ImgCell: ImgCell
        },
        methods: {
            deleteCell: function (cellData) {
                var _this=this;
                swal({
                    title: "确定要删除?",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "删 除",
                    cancelButtonText: "取 消",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function (isConfirm) {
                    if (isConfirm) {
                        _this.imgCellList.$remove(cellData);
                        swal("成功删除！", "", "success");
                    } else {
                        swal("已取消", "", "error");
                    }
                });
            }
        },
        events: {

        }
    }
</script>
