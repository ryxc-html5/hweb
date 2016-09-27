<style scoped>
  .home-published-page {}

  .title {
    margin-top: 20px;
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .table a {
    cursor: pointer;
  }
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">首页广告</h4>
    </div>
    <div class="panel-body">
      <div class="home-published-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 text-right title">
                <button @click="add" class="btn btn-default">新 增</button>
            </div>
            <div class="col-sm-12">
              <table class="table table-bordered table-hover">
                <thead>
                <tr class="">
                  <td class="text-center">地点</td>
                  <td class="text-center">模版</td>
                  <td class="text-center">发布时间</td>
                  <td class="text-center">编辑</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list">
                  <td class="text-center">{{item.cityName}}</td>
                  <td class="text-left">{{item.tempName}}</td>
                  <td class="text-center">{{item.ReleaseTime}}</td>
                  <td class="text-center">
                    <a @click="edit(item.contentId)">编辑</a>
                    <a @click="deleteAd(item.contentId)" v-if="item.cityCode!='000'">删除</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var $ = require('jquery');
  import config from './config';
  import swal from 'sweetalert';
  import store from '../../../store/store';
  import * as  action from '../../../actions/actions';

  module.exports = {
    props: {},
    data: function () {
      return {
        list: []
      }
    },
    components: {},
    methods: {
      add:function () {
        this.$route.router.go({
          'name': 'homeFlowAdd',
          'params': {}
        });
      },
      edit: function (id) {
        this.$route.router.go({
          'name': 'homeFlowEdit',
          'params': {
            id: id
          }
        });
      },
      deleteAd: function (id) {
        var thiz = this;
        swal({
          title: "是否确定删除该广告?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "删 除",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            thiz.$http.get(config.ajaxUrl.delAdContent, {
              params: {
                contentId: id
              }
            }).then(
                    function (response) {
                      let data = response.json();
                      if (data.code == '0') {
                        swal("成功删除!", "", "success");
                        thiz.getData();
                      } else {
                        swal('删除失败', data.msg, 'warning');
                      }
                    },
                    function (response) {
                      swal("删除失败!", response.json().msg, "warning");
                    }
            );
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      getData: function () {
        var thiz = this;
        thiz.$http.get(config.ajaxUrl.getAdContentConfig, {
          params: {
            type: 1
          }
        }).then(
                function (response) {
                  let data = response.json();
                  if (data.code == '0') {
                    data = data.data;
                    var list = [];
                    var cityList = data.cityList;
                    store.dispatch(action.setCityList({data:cityList}));

                    for (var i = 0; i < data.home.publishedList.length; i++) {
                      var item = data.home.publishedList[i];
                      var cityName = "未知城市";
                      var cityCode = item.cityCode;
                      for (var j = 0; j < cityList.length; j++) {
                        if (cityCode == cityList[j].cityCode) {
                          cityName = cityList[j].cityName;
                          break;
                        }
                      }
                      item.cityName = cityName;

                      var tempName = "未知模版";
                      var tempList = data.home.customTemplateList;
                      store.dispatch(action.setHomeModelList({data:tempList}));

                      for (var j = 0; j < tempList.length; j++) {
                        if (item.templateId == tempList[j].templateId) {
                          tempName = tempList[j].tempName;
                          break;
                        }
                      }
                      item.tempName = tempName;

                      list.push(item);
                    }

                    thiz.list = list;
                  } else {
                    swal('获取数据失败', data.msg, 'warning');
                  }
                },
                function (response) {
                  swal("获取数据失败!", response.json().msg, "warning");
                }
        );
      }
    },
    events: {},
    route: {
      data: function (transition) {
        this.getData();
        transition.next({});
      }
    },
    created: function () {},
    ready: function () {}
  }
</script>
