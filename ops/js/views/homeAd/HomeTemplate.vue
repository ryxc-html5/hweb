<template>
  <div>
    <div id="template_1" class="right-content show">
      <div class="content-title">自定义首页广告位</div>
      <div class="content-title">
        <div class="area-select">
          <label>地区设置:</label>
          <select name="city">
            <option v-for="item in cityList" :value="item.cityCode">{{ item.cityName }}</option>
          </select>
        </div>
        <div class="modelName">
          模版选择：模版一
        </div>
      </div>
      <div class="content-container">
        <div class="content-wrapper">
          <div class="content-left">
            <div class="form-area">
              <div class="form-wrapper">
                <div class="form-items-container">
                  <div @click="toggleAd($event,'HomeAdsBanner')" class="form-item v-link-active">
                    首页bannner广告
                  </div>
                  <div @click="toggleAd($event,'HomeAdsOne')" class="form-item">
                    活动广告位一
                  </div>
                  <div @click="toggleAd($event,'HomeAdsTwo')" class="form-item">
                    活动广告位二
                  </div>
                  <div @click="toggleAd($event,'HomeAdsThree')" class="form-item">
                    活动广告位三
                  </div>
                  <div @click="toggleAd($event,'HomeAdsFour')" class="form-item">
                    活动广告位四
                  </div>
                  <div @click="toggleAd($event,'HomeAdsFive')" class="form-item">
                    活动广告位五
                  </div>
                </div>
                <div class="form-item-content-container">
                  <component :is="currentView" keep-alive></component>
                </div>
              </div>
            </div>
            <div class="btn-wrapper">
              <button @click="resetDataHandler" class="btn btn-danger cancelBtn">取消</button>
              <button @click="deleteData" class="btn btn-danger deleteBtn">删除</button>
              <button @click="previewData" class="btn btn-info previewBtn">预览</button>
              <button @click="saveData" class="btn btn-success saveBtn">保存并发布</button>
            </div>
          </div>
          <div class="content-right">
            <Home-style></Home-style>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">首页预览</h4>
          </div>
          <div class="modal-body">
            <!--此处放于预览内容-->
            <Home-preview :preview-data="homeAdsOne"></Home-preview>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  var $ = require('jquery');

  var HomeAdsBanner = require('./HomeAdsBanner');
  var HomeAdsOne = require('./HomeAdsOne');
  var HomeAdsTwo = require('./HomeAdsTwo');
  var HomeAdsThree = require('./HomeAdsThree');
  var HomeAdsFour = require('./HomeAdsFour');
  var HomeAdsFive = require('./HomeAdsFive');

  var HomeStyle = require('./HomeStyle');
  var HomePreview = require('./HomePreview');

  var swal = require('sweetalert');
  var Swiper = require('swiper');

  import { getCityList,setHomeAdsOne,resetHomeAdsOne,getHomeAdsOne } from '../../vuex/action_index'

  var ajaxUrl = {
    'getAdContentDetail': '/Admin/ContentManagement/getAdContentDetail',
    'delAdContent': '/Admin/ContentManagement/delAdContent',
    'saveAdContent': '/Admin/ContentManagement/saveAdContent'
  };

  module.exports = {
    props: {},
    data: function () {
      return {
        currentView: "HomeAdsBanner"
      };
    },
    vuex: {
      getters: {
        cityList: getCityList,
        homeAdsOne: getHomeAdsOne
      },
      actions: {
        resetData: resetHomeAdsOne,
        setHomeAdsOne: setHomeAdsOne
      }
    },
    components: {
      HomeAdsBanner: HomeAdsBanner,
      HomeAdsOne: HomeAdsOne,
      HomeAdsTwo: HomeAdsTwo,
      HomeAdsThree: HomeAdsThree,
      HomeAdsFour: HomeAdsFour,
      HomeAdsFive: HomeAdsFive,

      HomeStyle: HomeStyle,
      HomePreview: HomePreview
    },
    methods: {
      toggleAd: function (e, currentView) {
        var thiz = $(e.target);
        $(this.$el).find('.form-item.v-link-active').removeClass("v-link-active");
        thiz.addClass("v-link-active");
        this.currentView = currentView;
      },
      resetDataHandler: function () {
        this.resetData();
        this.$nextTick(function () {
          $(this.$el).find('.form-item[index="banner"]').trigger('click');
        });
      },
      previewData: function () {
        $('#myModal').on('shown.bs.modal', function (e) {
          new Swiper('.banner-swiper', {
            pagination: '.banner-swiper .swiper-pagination',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
          });
          new Swiper('.ad-4-swiper', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0
          });
        });

        $("#myModal").modal();
        return;
      },
      deleteData: function () {
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
            var contentId = thiz.$route.params.contentId;
            //ajax发送请求删除文件
            $.ajax({
              url: ajaxUrl.delAdContent,
              type: 'GET',
              data: {
                "contentId": contentId
              },
              dataType: 'json'
            }).done(function (data) {
              if (data.code == "0") {
                swal("成功删除!", "", "success");
                //跳转到首页已发布列表页面
                thiz.$route.router.go({
                  'name': 'homePublished'
                });
              } else {
                swal("删除失败!", data.msg, "warning");
              }
            }).fail(function (xhr, exception) {
              hrtCommon.ajaxFail(xhr, exception, '删除失败!');
            }).always(function () {

            });
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      saveData: function () {
        var thiz = this;
        swal({
          title: "是否确定发布该广告?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
//                    showLoaderOnConfirm: true,
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            var cityCode = thiz.$route.params.cityCode || $('select[name="city"]', thiz.$el).val();//地区
            var contentId = thiz.$route.params.contentId || '';//广告内容Id
//            var templateId = thiz.$route.params.templateId;//模版ID
            var templateId = "1";//模版ID
            var content = thiz.getConfigData();//广告内容(内容JSON)
            if (!content) {
              return false;
            }

            var data = {
              "cityCode": cityCode,
              "contentId": contentId,
              "templateId": templateId,
              "content": JSON.stringify(content),
              "type": "1"
            };

            // ajax保存请求
            $.ajax({
              url: ajaxUrl.saveAdContent,
              type: "POST",
              data: data,
              dataType: "json"
            }).done(function (data) {
              if (data.code == "0") {
                swal("成功保存", "", "success");
                //跳转到首页已发布列表页面
                thiz.$route.router.go({
                  'name': 'homePublished'
                });
              } else {
                swal("保存失败!", data.msg, "warning");
              }
            }).fail(function (xhr, exception) {
              hrtCommon.ajaxFail(xhr, exception, '保存失败!');
            }).always(function () {

            });

          } else {
            swal("已取消", "", "error");
          }
        });
      },
      getConfigData: function () {
        var zh_reg = /^[\u4e00-\u9fa5]{1,4}$/g;//4字中文正则表达式
        var url_reg = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;//url验证正则表达式
        //var url_reg=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;//url验证正则表达式


        var imgConfigData = [];
        var vmData = this.homeAdsOne;
        //banner广告
        for (var i = 1; i <= vmData.banner.data.length; i++) {
          var index = i - 1;
          var bannerImgCell = vmData.banner.data[index];
          //必填校验
          var linkTo = "";
          if (bannerImgCell.type == "1") {//网页
            linkTo = bannerImgCell.linkTo.split('#type=url&url=')[1] || ""
          } else if (bannerImgCell.type == "2") {//单品
            linkTo = bannerImgCell.linkTo.split('#type=good&goodId=')[1] || ""
          } else if (bannerImgCell.type == "3") {//模板
            linkTo = bannerImgCell.linkTo.split('#type=dataTemplet&url=')[1] || ""
          } else if (bannerImgCell.type == "4") {//搜索
            linkTo = bannerImgCell.linkTo.split('#type=list&')[1] || ""
          }else if (bannerImgCell.type == "5") {//自动商品
            linkTo = bannerImgCell.linkTo.split('#type=good&goodId=')[1] || ""
          }else if (bannerImgCell.type == "6") {//频道
            linkTo = bannerImgCell.linkTo.split('#type=channel&cmId=')[1] || ""
          } else {
            linkTo = bannerImgCell.linkTo.split('#type=url&url=')[1] || ""
          }
          if (linkTo.replace(/^\s+|\s+$/g, '') == '' || bannerImgCell.imageUrl.replace(/^\s+|\s+$/g, '') == '') {
            swal("保存失败!", '请输入' + (bannerImgCell.name + i) + '的跳转地址或者上传图片！', "warning");
            return false;
          }
          //跳转地址合法校验
          /*      if(!bannerImgCell.linkTo.match(url_reg)){
           swal("保存失败!", (bannerImgCell.name+i)+'的跳转地址不合法！', "warning");
           return false;
           }*/
        }
        imgConfigData.push(vmData.banner);

        //广告位
        for (var i = 1; i < 6; i++) {//遍历广告位
          var adArea = vmData["ad_" + i];
          // 标题验证
          if (adArea.title.replace(/^\s+|\s+$/g, '') == '' || !adArea.title.match(zh_reg)) {
            swal("保存失败!", '请输入一至四个汉字的广告位' + i + '的名称！', "warning");
            return false;
          }
          //遍历行
          for (var j = 0; j < adArea.rows.length; j++) {
            var rowData = adArea.rows[j];
            for (var k = 0; k < rowData.items.length; k++) {//遍历项
              var imgCell = rowData.items[k];
              //必填校验
              var linkTo = "";
              if (imgCell.type == "1") {//网页
                linkTo = imgCell.linkTo.split('#type=url&url=')[1] || ""
              } else if (imgCell.type == "2") {//单品
                linkTo = imgCell.linkTo.split('#type=good&goodId=')[1] || ""
              } else if (imgCell.type == "3") {//模板
                linkTo = imgCell.linkTo.split('#type=dataTemplet&url=')[1] || ""
              } else if (imgCell.type == "4") {//搜索
                linkTo = imgCell.linkTo.split('#type=list&')[1] || ""
              }else if (imgCell.type == "5") {//自动商品
                linkTo = imgCell.linkTo.split('#type=good&goodId=')[1] || ""
              }else if (imgCell.type == "6") {//频道
                linkTo = imgCell.linkTo.split('#type=channel&cmId=')[1] || ""
              } else {
                linkTo = imgCell.linkTo.split('#type=url&url=')[1] || ""
              }
              if (linkTo.replace(/^\s+|\s+$/g, '') == '' || imgCell.imageUrl.replace(/^\s+|\s+$/g, '') == '') {
                swal("保存失败!", '请输入' + (imgCell.name + (k + 1)) + '的跳转地址或者上传图片！', "warning");
                return false;
              }
              //合法校验
              /*          if(!imgCell.linkTo.match(url_reg)){
               swal("保存失败!", (imgCell.name+(k+1))+'的跳转地址不合法！', "warning");
               return false;
               }*/
            }
          }
          imgConfigData.push(adArea);
        }
        return {
          "data": imgConfigData
        }
      }
    },
    events: {},
    route: {
      data: function (transition) {
        if (transition.to.name == 'homeAdd') {//如果是新增广告
          $(this.$el).find(".area-select").removeClass('hide');
          $(this.$el).find(".modelName").addClass('hide');
          $(this.$el).find(".cancelBtn").removeClass('hide');
          $(this.$el).find(".deleteBtn").addClass('hide');
          this.resetData();
          this.$nextTick(function () {
          });
          transition.next({});
        } else if (transition.to.name == 'homeEdit') {//如果是修改广告
          var cityCode = transition.to.params.cityCode;//地区
          var contentId = transition.to.params.contentId;//广告内容Id

          $(this.$el).find(".area-select").addClass('hide');
          $(this.$el).find(".modelName").removeClass('hide');
          $(this.$el).find(".cancelBtn").addClass('hide');

          if (!(cityCode == "000")) {//全国不能删除
            $(this.$el).find(".deleteBtn").removeClass("hide");
          } else {
            $(this.$el).find(".deleteBtn").addClass("hide");
          }

          var data = {
            "cityCode": cityCode,
            "contentId": contentId,
            "type": "1"
          };

          var thiz = this;
          $.ajax({
            url: ajaxUrl.getAdContentDetail,
            type: "GET",
            dataType: "json",
            data: data
          }).done(function (data) {
            if (data.code == "0") {
              var content = JSON.parse(data.content);
              var vmData = {};
              data = content.data;
              for (var i = 0; i < data.length; i++) {
                var adBlock = data[i];
                if (adBlock.type == 'banner') {
                  vmData.banner = adBlock;
                } else if (adBlock.type == 'ads') {
                  vmData["ad_" + i] = adBlock;
                }
              }
              thiz.setHomeAdsOne(vmData);
              thiz.$nextTick(function () {
              });
            } else {
              swal("读取失败!", data.msg, "warning");
            }
          }).fail(function (xhr, exception) {
            hrtCommon.ajaxFail(xhr, exception, '获取广告信息失败!');
          }).always(function () {

          });
          transition.next();
        }
      }
    },
    ready: function () {

    }
  }
</script>
