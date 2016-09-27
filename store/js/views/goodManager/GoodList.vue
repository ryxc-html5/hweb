/*
 * 商品管理-商品列表单元
 **/
<style scoped>
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">商品列表</h4>
    </div>
    <div class="panel-body">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#published" aria-controls="published" role="tab" data-toggle="tab">上架商品</a>
                </li>
                <li role="presentation">
                    <a href="#unPublished" aria-controls="unPublished" role="tab" data-toggle="tab">下架商品</a>
                </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="published">
                    <Good-grid type="published"></Good-grid>
                </div>
                <div role="tabpanel" class="tab-pane" id="unPublished">
                    <Good-grid type="unPublished"></Good-grid>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
    import GoodGrid from './GoodGrid'

    module.exports = {
        data: function () {
            return {
            }
        },
        components: {
            GoodGrid:GoodGrid
        }
    }
</script>
