<style scoped>
  .title {
    height: 34px;
    line-height: 34px;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-md-6" v-for="item in tabData.rows[0].items" track-by="$index">
            <Auto-image-good :image-data="item" :delete-fun="deleteGood" :up-fun="up"
                             :down-fun="down"></Auto-image-good>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var swal = require('sweetalert');
  import AutoImageGood from '../../common/AutoImageGood';

  module.exports = {
    props: {
      tabData: Object
    },
    data: function () {
      return {

      }
    },
    computed: {},
    components: {
      AutoImageGood: AutoImageGood
    },
    methods: {
      up: function (data) {
        let index = 0;
        let items = this.tabData.rows[0].items;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }

        if (index == 0) {
          return
        } else {
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp = items[index - 1];
          items.$set(index - 1, items[index]);
          items.$set(index, temp);
        }
      },
      down: function (data) {
        let index = 0;
        let items = this.tabData.rows[0].items;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }

        if (index == items.length - 1) {
          return
        } else {
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp = items[index + 1];
          items.$set(index + 1, items[index]);
          items.$set(index, temp);
        }
      }
    },
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    ready: function () {

    }

  }
</script>
