<style scoped>
  .login-page{
    position: relative;
    height: 100%;
    background-color: #F0F0F0;
  }
  .login-container{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 300px;
    margin-top: -200px;
    margin-left: -250px;
  }
  .title{
    height: 50px;
    line-height: 50px;
    vertical-align: middle;
    font-size: 34px;
  }
  .form-container{
    border: 1px solid #cccccc;
    border-radius: 5px;
    width: 100%;
    height: 250px;
    padding: 35px 35px;
    background-color: #FFFFFF;
  }
  .row{
    margin-bottom: 15px;
  }
</style>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="title">
        欢迎登录华润通电商平台
      </div>
      <div class="form-container container-fluid">
        <div class="row">
          <div class="col-sm-9">
            <input type="text" class="form-control" v-model="username" placeholder="请输入邮箱/手机号">
          </div>
          <div class="col-sm-3">
            <span>忘记帐号？</span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-9">
            <input type="password" class="form-control" v-model="password" placeholder="请输入密码">
          </div>
          <div class="col-sm-3">
            <span>忘记帐号？</span>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <div class="checkbox">
              <label>
                <input type="checkbox"> 记住我的帐号
              </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 text-center">
            <button class="btn btn-primary" @click.prevent="login" data-loading-text="Loading..." autocomplete="off">登 录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5';

  var ajaxUrl = {
    login: 'http://10.0.53.52:6080/member/baseinfo/login/loginWithPassword.htm'
  };

  module.exports = {
    props: {},
    data: function () {
      return {
        username: '18840800503',
        password: ''
      }
    },
    methods: {
      login: function (e) {
        var _this = this;
        var $this = $(e.target);

        if (!$.trim(this.username)) {
          swal('登录失败', '请输入邮箱/手机号', 'warning');
          return false;
        }
        if (!$.trim(this.password)) {
          swal('登录失败', '请输入密码', 'warning');
          return false;
        }

        $.ajax({
          url: ajaxUrl.login,
          type: 'POST',
          data: {
            cardNo: _this.username,
            loginPassword: md5(_this.password),
            channelld: 'IOS'
          },
          dataType: 'json',
          beforeSend: function() {
            $this.button('loading');
          }
        }).then(function(data) {
          console.log(data);
          if (data.code == '00000000') {
            _this.$route.router.go({
              'name':'home',
              'params': {}
            });
          } else {
            swal('登录失败', data.msg, 'warning');
          }
        }, function(xhr, exception) {
          hrtCommon.ajaxFail(xhr, exception, '登录失败');
        }).always(function() {
          $this.button('reset');
        });
      }
    },
    route: {
      data: function (transition) {
//                console.log(transition.to.path);
      }
    }
  }
</script>
