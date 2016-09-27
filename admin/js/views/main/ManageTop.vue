/*
 * 顶部信息单元
 * lxw
 * 2016-07-28
 **/
<style>
</style>

<template>
  <div class="container-fluid">
    <div class="col-sm-8">
      <div class="navbar-header">
        <a class="navbar-brand" href="#"><img alt="LOGO" src=""></a>
        <p class="navbar-text">Hi <span>{{username}}</span>，欢迎来到华润通！</p>
      </div>
    </div>
    <div class="col-sm-4 text-right">
      <a class="btn btn-default navbar-btn" @click="userLogout">退出登录</a>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      username: String
    },
    data: function() {
      return {}
    },
    methods: {
      userLogout: function() {
        console.log('退出登录');
      }
    }
  }
</script>
