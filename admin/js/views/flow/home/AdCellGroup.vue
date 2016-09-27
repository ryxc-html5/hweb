<template>
    <div class="image-row">
        <Ad-cell v-for="cellData in cellList" :cell-data="cellData" :index="$index" @delete="deleteCell"></Ad-cell>
    </div>
</template>
<style>

</style>
<script>
    import swal from 'sweetalert';
    import AdCell from './AdCell';
    var $ = require('jquery');
    module.exports = {
        props: {
            cellList:Array
        },
        data: function() {
            return {

            }
        },
        components: {
            AdCell: AdCell
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
                        _this.cellList.$remove(cellData);
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
