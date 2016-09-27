<template>
  <div class="template-one">
    <div v-for="item in previewData" class="cate-ad">
      <div class="cate-ad-container">
        <img :src="item.rows[0].items[0].imageUrl" :linkTo="item.rows[0].items[0].linkTo" @click="open"/>

        <div v-if="item.title" class="cate-title">
          {{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .cate-ad {
    padding: 15px;
  }

  .cate-ad-container {
    position: relative;
  }

  .cate-ad-container img {
    height: 185px;
    width: 510px;
  }

  .cate-title {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -10px;
    background-color: rgba(255, 255, 255, 0.8) !important;
    padding: 5px 15px;
    border-radius: 50px;
  }
</style>
<script>
  var $ = require('jquery');

  module.exports = {
    props: {
      previewData: Array
    },
    data: function () {
      return {}
    },
    components: {},
    methods: {
      open: function (e) {
        var $this = $(e.target);
        var linkTo = $this.attr("linkTo");
        if (linkTo.startsWith('#type=url&url=')) {
          var url = linkTo.split('#type=url&url=')[1];
          window.open(url);
        } else {
          return;
        }
      }
    },
    events: {},
    ready: function () {
    }
  }
</script>
