<template>
  <div class="home-page container-fluid">
    <div class="row top">
      <div class="col-sm-8 text-left">
        你好，<a class="info-btn">阳飞</a>
      </div>
      <div class="col-sm-3 text-right">
        <a class="setting-btn">账户设置</a>
      </div>
      <div class="col-sm-1 text-right">
        <a class="logout-btn" @click="logout">退出</a>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 no-padding">
        <div class="body">
          <div class="wrapper" :style="{ minHeight: minHeight + 'px' }">
            <div class="dashboard">
              <div class="title text-center">
                仪表盘
              </div>
              <div class="data-item">今日销售<span>2000</span>元</div>
              <div class="data-item">今日销售<span>55</span>单</div>
              <div class="data-item">有<span>55</span>单待发货</div>
              <div class="data-item">有<span>55</span>待售后</div>
              <div class="data-item">昨日销售<span>2000</span>元</div>
              <div class="data-item">昨日销售<span>55</span>单</div>
            </div>
            <div class="content">
              <div class="row">
                <div class="col-sm-4">
                  <a class="app-item" href="/web/portals/ops/index.html">流量管理</a>
                </div>
                <div class="col-sm-4">
                  <a class="app-item" href="/web/portals/store/index.html">商品管理</a>
                </div>
                <div class="col-sm-4">
                  <a class="app-item">营销管理</a>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <a class="app-item">积分管理</a>
                </div>
                <div class="col-sm-4">
                  <a class="app-item">订单管理</a>
                </div>
                <div class="col-sm-4">
                  <a class="app-item">财务管理</a>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <a class="app-item">门店管理</a>
                </div>
                <div class="col-sm-4">
                  <a class="app-item">子账号管理</a>
                </div>
                <div class="col-sm-4">
                  <a class="app-item">基础信息维护</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

  .no-padding{
    padding: 0;
  }

  .home-page{

  }

  .top{
    height: 100px;
    padding: 5px 0;
    /*line-height: 100px;*/
    vertical-align: bottom;
    border-bottom: 1px solid #cccccc;
  }

  .top a{
    cursor: pointer;
  }

  .body{
    position: relative;
    padding-left: 250px;
  }

  .wrapper{
    /*height: 900px;*/
  }

  .dashboard {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #c0c0c0;
    border-width: 0 1px 0 0;
    height: 100%;
    width: 250px;
  }

  .dashboard .title{
    height: 40px;
    line-height: 40px;
    background-color: #1b6d85;
    color: #FFFFFF;
  }

  .dashboard .data-item{
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .dashboard .data-item span{
    color: red;
  }

  .content{

  }

  .content .row{
    margin: 0;
  }

  .content .col-sm-4{
    text-align: center;
    padding: 10px;
  }

  .content .app-item{
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
    display: inline-block;
    border: 1px solid #E7E7E7;
    cursor: pointer;
  }

  .content .app-item:hover{
    background-color: #5794A5;
    color: #FFFFFF;
  }



</style>
<script>
  module.exports = {
    props: {},
    data: function () {
      return {
        minHeight:0
      }
    },
    computed: function () {
      return {}
    },
    components: {},
    methods: {
      logout: function () {
        var thiz=this;

        thiz.$route.router.go({
          'name':'login',
          'params': {

          }
        });
      }
    },
    events: {},
    route: {
      data: function (transition) {
//                console.log(transition.to.path);
      }
    },
    ready: function () {
      this.minHeight=$(window).height()-100;
    }
  }
</script>
