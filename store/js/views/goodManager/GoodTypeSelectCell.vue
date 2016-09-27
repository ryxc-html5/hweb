/*
 * 商品管理-商品类目选择-分级单元
 * lxw
 * 2016-08-03
 **/
<style scoped>
  .hrt-good-type-cell {
    float: left;
    width: 290px;
    padding-right: 20px;
    padding-top: 10px;
  }
</style>

<template>
  <div class="hrt-good-type-cell" v-show="typeCellData.length">
    <div class="form-group">
      <input type="text" class="form-control" :placeholder="cellTitle" v-model="gcName">
    </div>
    <div class="form-group">
      <select class="form-control" size="10" v-model="selected" @change="selType">
        <option v-for="item in typeCellData | orderBy listOrder | filterBy gcName in 'gc_name'" track-by="gc_id" :value="item.gc_id">{{ item.gc_name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      typeCellData: Array,
      level: Number
    },
    data: function() {
      return {
        gcName: '',
        selected: ''
      }
    },
    computed: {
      cellTitle: function() {
        var str = '';
        switch (this.level) {
          case 0:
            str = '商品一级分类';
            break;
          case 1:
            str = '商品二级分类';
            break;
          default:
            str = '商品类型列表';
        }
        return str;
      }
    },
    components: {

    },
    methods: {
      selType: function() {
        this.$dispatch('selType', this.level, this.selected);
      },
      listOrder: function(a, b) {
        return parseInt(a.gc_order) - parseInt(b.gc_order);
      }
    }
  }
</script>
