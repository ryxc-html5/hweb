<template>
  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="panel panel-info">
      <div class="panel-heading" role="tab" id="headingOne">
        <h4 class="panel-title">
          <a role="button"
             data-toggle="collapse"
             data-parent="#accordion"
             href="#collapseOne"
             aria-expanded="false"
             aria-controls="collapseOne">
            自定义广告位
          </a>
        </h4>
      </div>
      <div id="collapseOne"
           class="panel-collapse collapse"
           role="tabpanel"
           aria-labelledby="headingOne">
        <ul class="list-group">
          <li class="list-group-item branch" templateid="1" name="模板一">
            <a>自定义首页广告位</a>
            <ul class="sub-menu">
              <li>
                <a @click="active" routerName="homeAdd">模版一</a>
              </li>
            </ul>
          </li>
          <li class="list-group-item branch" templateid="4" name="模板四">
            <a>自定义分类广告位</a>
            <ul class="sub-menu">
              <li>
                <a @click="active" routerName="cateAdd">模板一</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="panel panel-info">
      <div class="panel-heading" role="tab" id="headingTwo">
        <h4 class="panel-title">
          <a class="collapsed"
             role="button"
             data-toggle="collapse"
             data-parent="#accordion"
             href="#collapseTwo"
             aria-expanded="true"
             aria-controls="collapseTwo">
            已发布广告位
          </a>
        </h4>
      </div>
      <div id="collapseTwo"
           class="panel-collapse collapse in"
           role="tabpanel"
           aria-labelledby="headingTwo">
        <ul class="list-group">
          <li class="list-group-item active-item">
            <a @click="active" routerName="homePublished">已发布首页广告位</a>
          </li>
          <li class="list-group-item">
            <a @click="active" routerName="catePublished">已发布分类广告位</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .list-group-item{
    padding: 0;
  }
  .list-group-item.branch{
    border-top:1px solid #dddddd;
  }
  .list-group-item.branch:hover{
    background-color: #FFFFFF;
    color: #000000;
  }

  .list-group-item>a{
    padding: 10px 15px;
    display: inline-block;
    width: 100%;
    text-decoration: none;
    /*background-color: #E9F5FA;*/
    /*border-bottom:1px solid #dddddd;*/
  }

  .sub-menu{
    list-style: none;
    padding: 0;
  }

  .sub-menu li{
    margin: 0;

  }

  .sub-menu li a{
    width: 100%;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    padding-left: 30px;
    border-top:1px solid #dddddd;
  }

  .sub-menu li a:hover{
    background-color: #efffff;
  }
</style>
<script>
  var swal = require('sweetalert');
  import { setCityList } from '../../vuex/action_index'
  var $ = require('jquery');

  var ajaxUrl = {
    getAdContentConfig: "/Admin/ContentManagement/getAdContentConfig"
  };

  module.exports = {
    props: {},
    data: function () {
      return {}
    },
    vuex: {
      getters: {},
      actions: {
        setCityList: setCityList
      }
    },
    components: {},
    methods: {
      active: function (e) {
        var $this = $(e.target);
        $(this.$el).find(".active-item").removeClass("active-item");
        $this.closest(".list-group-item").addClass('active-item');
        var routerName = $this.attr('routerName');

        this.$route.router.go({
          'name': routerName
        });
      }
    },
    events: {},
    created: function () {
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
          //设置城市列表
          thiz.setCityList(data.cityList);
          thiz.$nextTick(function () {
          });
        } else {
          swal("获取广告配置信息失败!", data.msg, "warning");
        }
      }).fail(function (xhr, exception) {
        hrtCommon.ajaxFail(xhr, exception, '获取广告配置信息失败!');
      }).always(function () {

      });
    },
    ready: function () {
      $(this.$el).collapse()
    }
  }
</script>
