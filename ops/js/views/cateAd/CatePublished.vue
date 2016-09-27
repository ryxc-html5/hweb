<template>
  <div class="cate-published-page">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12">
          <div class="title">
            已发布分类广告
          </div>
        </div>
        <div class="col-sm-12">
          <table class="table table-bordered table-hover">
            <thead>
            <tr class="success">
              <td class="text-center">地点</td>
              <td class="text-center">模版</td>
              <td class="text-center">发布时间</td>
              <td class="text-center"></td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
              <td class="text-center">{{item.cityName}}</td>
              <td class="text-left">{{item.tempName}}</td>
              <td class="text-center">{{item.ReleaseTime}}</td>
              <td class="text-center">
                <a @click="edit(item.cityCode,item.contentId)">编辑</a>
                <a @click="deleteAd(item.contentId)" v-if="item.cityCode!='000'">删除</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .cate-published-page {

  }

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
<script>
  var swal = require('sweetalert');
  var $ = require('jquery');

  var ajaxUrl = {
    getAdContentConfig: "/Admin/ContentManagement/getAdContentConfig",
    delAdContent: '/Admin/ContentManagement/delAdContent'
  };

  module.exports = {
    props: {},
    data: function () {
      return {
        list: []
      }
    },
    vuex: {
      getters: {},
      actions: {}
    },
    components: {},
    methods: {
      edit: function (cityCode, contentId) {
        this.$route.router.go({
          'name': 'cateEdit',
          'params': {
            cityCode: cityCode,
            contentId: contentId
          }
        });
      },

      deleteAd: function (contentId) {
        var thiz=this;
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
            $.ajax({
              url: ajaxUrl.delAdContent,
              type: "GET",
              data: {
                "contentId": contentId
              },
              dataType: 'json'
            }).done(function (data) {
              if (data.code == "0") {
                swal("成功删除!", "", "success");
                thiz.getData();
              } else {
                swal("删除失败!", data.msg, "warning");
              }
            }).fail(function (xhr, exception) {
              hrtCommon.ajaxFail(xhr, exception, '删除失败!');
            }).always(function () {});
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      getData: function () {
        var thiz = this;
        $.ajax({
          url: ajaxUrl.getAdContentConfig,
          type: 'GET',
          data: {
            "type": 0
          },
          dataType: 'json'
        }).done(function (data) {
          if (data.code == "0") {
            data = data.data;
            var list = [];
            var cityList = data.cityList;
            for (var i = 0; i < data.cate.publishedList.length; i++) {
              var item = data.cate.publishedList[i];
              var cityName = "未知城市";
              var cityCode = item.cityCode;
              for (var j = 0; j < cityList.length; j++) {
                if (cityCode == cityList[j].cityCode) {
                  cityName = cityList[j].cityName;
                  break;
                }
              }
              item.cityName = cityName;

              var tempName="未知模版";
              var tempList=data.cate.customTemplateList;
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
            swal("获取已发布分类广告信息失败!", data.msg, "warning");
          }
        }).fail(function (xhr, exception) {
          hrtCommon.ajaxFail(xhr, exception, '获取已发布分类广告信息失败!');
        }).always(function () {});
      }
    },
    events: {},
    route: {
      data: function (transition) {
        this.getData();
        transition.next({});
      }
    },
    created: function () {

    },
    ready: function () {
      $(this.$el).collapse()
    }
  }
</script>
