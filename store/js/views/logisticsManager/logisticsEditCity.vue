<style lang="less" scoped>
  .dialog-page {
    position: fixed;
    z-index: 10000;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,.5);
    .dialog-main {
      position: absolute;
      top: 15%;
      bottom: 15%;
      left: 25%;
      right: 25%;
      width: 500px;
      height: 500px;
      margin: -250px 0 0 -250px;
      padding: 10px;
      // border: 1px solid #ccc;
      // border-radius: 5px;
      // background-color: #fefefe;
      overflow: auto;
      .dialog-thead {
        position: relative;
        padding: 10px;
        background-color: #d2d2d2;
      }
      .dialog-close {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .btn-link {
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="dialog-page">
    <div class="dialog-main">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title">选择城市</h4>
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>
        <div class="panel-body">
          <p>{{ tempData | json }}</p>
          <a @click="close">关闭</a>
          <div style="height:1000px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      tempData: Object,
      isShow: Boolean
    },
    methods: {
      close() {
        this.isShow = false;
      }
    }
  }
</script>
