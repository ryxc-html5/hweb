<template>
  <div class="home-page container-fluid">
    <div class="row ">
      <div class="col-sm-12 top">
        <div class="top-menu-wrapper">
          <ul>
            <li><a>流量管理</a></li>
            <li><a @click="goHome">退回首页</a></li>
            <li><a @click="logout">退出登录</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 no-padding">
        <div class="body">
          <div class="wrapper" :style="{ minHeight: minHeight + 'px' }">
            <div class="menu-wrapper">
              <div class="title text-center">
                广告流量管理
              </div>
              <Menu></Menu>
            </div>

            <div class="content">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .no-padding {
    padding: 0;
  }

  .home-page {
  }

  .top {
    height: 100px;
    padding: 5px 0;
    vertical-align: bottom;
    border-bottom: 1px solid #cccccc;
    position: relative;
  }

  .top-menu-wrapper{
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .top ul{
    list-style: none;
  }

  .top ul li{
    float: left;
  }

  .top ul li:last-child{
    float: right;
  }

  .top ul li a{
    width: 90px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    border: 1px solid #cccccc;
    border-bottom: 0;
    border-radius: 5px 5px 0 0;
    text-align: center;
    margin-left: 1px;
  }

  .top a {
    cursor: pointer;
  }

  .body {
    position: relative;
    padding-left: 250px;
  }

  .wrapper {

  }

  .menu-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #c0c0c0;
    border-width: 0 1px 0 0;
    height: 100%;
    width: 250px;
  }

  .menu-wrapper .title {
    height: 40px;
    line-height: 40px;
    background-color: #1b6d85;
    color: #FFFFFF;
  }

  .content {

  }


</style>
<script>
  import $ from 'jquery';
  import Menu from './Menu';

  var ajaxUrl={
    logoutUrl:'/Admin/User/doLogout'
  };

  module.exports = {
    props: {},
    data: function () {
      return {
        minHeight: 0
      }
    },
    computed: function () {
      return {}
    },
    components: {
      Menu: Menu
    },
    methods: {
      goHome: function () {
        window.location.href=window.location.origin+"/web/portals/index.html#!/home"
      },

      logout: function () {
        var thiz=this;
        swal({
          title: "是否确定退出?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            $.ajax({
              url: ajaxUrl.logoutUrl,
              type: "GET",
              data: {},
              dataType: 'json'
            }).done(function (data) {
              if (data.code == "0") {
                swal("成功退出登录!", "", "success");
                window.location.href=window.location.origin+"/web/portals/index.html#!/login"
              } else {
                swal("退出登录失败!", data.msg, "warning");
              }
            }).fail(function (xhr, exception) {
              hrtCommon.ajaxFail(xhr, exception, '退出登录失败!');
            }).always(function () {});
          } else {
            swal("已取消", "", "error");
          }
        });
      }
    },
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    ready: function () {
      this.minHeight = $(window).height() - 100;
      $("#accordion", this.$el).collapse()
    }
  }
</script>
