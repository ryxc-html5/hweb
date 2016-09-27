<style scoped>
  .cate-published-page {}

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
      <h4 class="panel-title">用户定制广告</h4>
    </div>
    <div class="panel-body">
      <div class="cate-published-page">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 text-right title">
              <button @click="add" class="btn btn-default">新 增</button>
            </div>
            <div class="col-sm-12">
              <table class="table table-bordered table-hover">
                <thead>
                <tr class="">
                  <td class="text-center">顺序号</td>
                  <td class="text-center">广告名称</td>
                  <td class="text-center">广告主图</td>
                  <td class="text-center">发布时间</td>
                  <td class="text-center">排序</td>
                  <td class="text-center">编辑</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list">
                  <td class="text-center">{{$index+1}}</td>
                  <td class="text-center">{{item.adName}}</td>
                  <td class="text-left">
                    <img :src="item.mainPicUrl" style="width:510px;height:135px;">
                  </td>
                  <td class="text-center">{{item.releaseTime}}</td>
                  <td class="text-center">
                    <a @click="up(item)" v-if="$index!=0">上移</a>
                    <a @click="down(item)" v-if="$index!=(list.length-1)">下移</a>
                  </td>
                  <td class="text-center">
                    <a @click="edit(item.adId)">编辑</a>
                    <a @click="deleteAd(item.adId)">删除</a>
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
  var swal = require('sweetalert');
  var $ = require('jquery');
  import config from './config';

  export default {
    props: {},
    data: function () {
      return {
        list: []
      }
    },
    components: {},
    methods: {
      add: function () {
        this.$route.router.go({
          'name': 'customFlowAdd',
          'params': {}
        });
      },
      edit: function (id) {
        this.$route.router.go({
          'name': 'customFlowEdit',
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
            thiz.$http.post(
                    config.ajaxUrl.del,
                    {
                      adId: id
                    }
            ).then(
                    function (response) {
                      let data = response.json();
                      if (data.code == "0") {
                        swal("成功删除", "", "success");
                        thiz.getData();
                      } else {
                        swal("删除失败!", data.msg, "warning");
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
        thiz.$http.get(config.ajaxUrl.list, {
          params: {}
        }).then(
          function (response) {
            let data = response.json();
            if (data.code == '0') {
              thiz.list = data.data.adList;
            } else {
              swal('获取数据失败', data.msg, 'warning');
            }
          },
          function (response) {
            swal("获取数据失败!", response.json().msg, "warning");
          }
        );
      },
      up: function (data) {
        let thiz=this;
        let index = 0;
        let items = this.list;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }
        if (index == 0) {
          return;
        } else {
          thiz.$http.post(config.ajaxUrl.rank,{
            downAdId:items[index-1].adId,
            upAdId:data.adId
          } ).then(
            function (response) {
              let data = response.json();
              if (data.code == "0") {
                //此处不可直接用数据rows[index-1]=rows[index]方式实现
                let temp = items[index - 1];
                items.$set(index - 1, items[index]);
                items.$set(index, temp);
              } else {
                swal("上移失败!", data.msg, "warning");
              }
            },
            function (response) {
              swal("上移失败!", response.json().msg, "warning");
            }
          );
        }
      },
      down: function (data) {
        let thiz=this;
        let index = 0;
        let items = this.list;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }
        if (index == items.length - 1) {
          return;
        } else {
          thiz.$http.post(config.ajaxUrl.rank,{
            downAdId:data.adId,
            upAdId:items[index+1].adId
          } ).then(
                  function (response) {
                    let data = response.json();
                    if (data.code == "0") {
                      //此处不可直接用数据rows[index-1]=rows[index]方式实现
                      let temp = items[index + 1];
                      items.$set(index + 1, items[index]);
                      items.$set(index, temp);
                    } else {
                      swal("上移失败!", data.msg, "warning");
                    }
                  },
                  function (response) {
                    swal("上移失败!", response.json().msg, "warning");
                  }
          );

        }
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
