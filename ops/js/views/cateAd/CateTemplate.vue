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
                  <div @click="go($event,$index)" v-for="item in cateAdsOne" :index="$index"
                       class=" form-item {{ ($index==0) ? 'v-link-active' : '' }}">
                    分类广告位 {{$index+1}}
                    <span @click="deleteAds" v-if="$index!=0" class="icon-remove "></span>
                  </div>
                  <div @click="addAds" class="form-item addBtn {{cateAdsOne.length>=8?'hide':''}}">
                    添加广告位
                  </div>
                </div>
                <div class="form-item-content-container">
                  <Cate-ads-one :index="currentIndex" :data="currentData"></Cate-ads-one>
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
            <Cate-style></Cate-style>
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
            <h4 class="modal-title" id="myModalLabel">分类广告预览</h4>
          </div>
          <div class="modal-body">
            <!--此处放于预览内容-->
            <Cate-preview :preview-data="cateAdsOne"></Cate-preview>
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
  .form-area {
    min-height: 450px;
  }

  .form-item {
    position: relative;
  }

  .icon-remove {
    position: absolute;
    right: 2px;
    top: 2px;
    cursor: pointer;
  }
</style>
<script>
  var $ = require('jquery');
  var CateStyle = require('./CateStyle');
  var CatePreview = require('./CatePreview');
  var CateAdsOne = require('./CateAdsOne');

  var swal = require('sweetalert');

  var Swiper = require('swiper');

  import {
          getCityList,
          getCateAdsOne,
          setCateAdsOne,
          resetCateAdsOne,
          addCateAdsOneItem,
          getCateAdsOneByIndex,
          removeCateAdsOneByIndex
  } from '../../vuex/action_index'

  var ajaxUrl = {
    getAdContentDetail: '/Admin/ContentManagement/getAdContentDetail',
    delAdContent:'/Admin/ContentManagement/delAdContent',
    saveAdContent:'/Admin/ContentManagement/saveAdContent'
  };

  module.exports = {
    props: {},
    data: function () {
      return {
        currentIndex: 0
      };
    },
    computed: {
      currentData: {
        get: function () {
          var blankData = {
            type: "ads",
            title: "",
            more: "",
            rows: [
              {
                "type": "ad",
                "column": 1,
                "items": [
                  {
                    title: "",
                    shareUrl: "",
                    hideBtn: false,
                    name: "图片",
                    size: {width: 1020, height: 410},
                    weight: 500,
                    tips: "图片比例为16:9，不得超过500k",
                    src: "请选择图片！",
                    type: '1',
                    linkTo: '',
                    imageUrl: ""
                  }
                ]
              }
            ]
          };

          return this.cateAdsOne[this.currentIndex] || blankData;
        }
      }
    },
    vuex: {
      getters: {
        cityList: getCityList,
        cateAdsOne: getCateAdsOne
      },
      actions: {
        resetData: resetCateAdsOne,
        setCateAdsOne: setCateAdsOne,
        addCateAdsOneItem: addCateAdsOneItem,
        getCateAdsOneByIndex: getCateAdsOneByIndex,
        removeCateAdsOneByIndex: removeCateAdsOneByIndex
      }
    },
    components: {
      CateAdsOne: CateAdsOne,
      CateStyle: CateStyle,
      CatePreview: CatePreview
    },
    methods: {
      go: function (e) {
        var thiz = $(e.target);
        $(this.$el).find('.form-item.v-link-active').removeClass("v-link-active");
        thiz.addClass("v-link-active");

        var index = parseInt(thiz.attr('index'));
        this.currentIndex = index;
      },
      addAds: function (e) {
        this.addCateAdsOneItem();
        this.$nextTick(function () {
          $(this.$el).find('.addBtn').prev().trigger('click');
        });
      },
      deleteAds: function (e) {
        e.stopPropagation();//此处如果不阻止事件冒泡，会导致currentActiveIndex取不到值。
        var $this = $(e.target).parent();
        var thiz = this;
        swal({
          title: "是否确定删除该广告位?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "删 除",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            var index = parseInt($this.attr('index'));
            var currentActiveIndex = $(thiz.$el).find('.form-item.v-link-active').attr('index');
            currentActiveIndex = parseInt(currentActiveIndex);

            thiz.removeCateAdsOneByIndex(index);

            if (currentActiveIndex == index) {
              thiz.$nextTick(function () {
                $(thiz.$el).find('.form-item[index="' + (index - 1) + '"]').trigger('click');
              })
            } else if (currentActiveIndex > index) {
              thiz.$nextTick(function () {
                $(thiz.$el).find('.form-item[index="' + (currentActiveIndex - 1) + '"]').trigger('click');
              });
            }
            swal("已删除", "", "success");
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      resetDataHandler: function (e) {
        var thiz = this;
        swal({
          title: "是否确定取消?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 认",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            thiz.resetData();
            thiz.$nextTick(function () {
              var evt = document.createEvent("MouseEvents");
              evt.initEvent('click', true, true);
              $(thiz.$el).find('.form-item[index="0"]')[0].dispatchEvent(evt);
            });
            swal("成功取消编辑", "", "success");
          } else {
            swal("继续编辑", "", "error");
          }
        });
      },
      previewData: function () {
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
                //跳转到分类已发布列表页面
                thiz.$route.router.go({
                  'name': 'catePublished'
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
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            var cityCode = thiz.$route.params.cityCode || $('select[name="city"]', thiz.$el).val();//地区
            var contentId = thiz.$route.params.contentId || '';//广告内容Id
//            var templateId = thiz.$route.params.templateId;//模版ID
            var templateId = "4";//模版ID
            var content = thiz.cateAdsOne;//广告内容(内容JSON)

//                        var zh_reg=/^[\u4e00-\u9fa5]{1,4}$/g;//4字中文正则表达式
            var zh_reg = /^.{1,6}$/g;//1-6个字符正则表达式
            var require_reg = /^.+$/g;//必填校验正在表达式；
            for (var i = 0; i < content.length; i++) {
              var ad = content[i];

              if (ad.title.replace(/^\s+|\s+$/g, '') == '' || !ad.title.match(zh_reg)) {
                swal("保存失败!", '请输入1至6个字符的广告位' + (i + 1) + '的名称！', "warning");
                return false;
              }

              //必填校验
              var imgCell = ad.rows[0].items[0];
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
                swal("保存失败!", '请输入' + (imgCell.name + (i + 1)) + '的跳转地址或者上传图片！', "warning");
                return false;
              }
            }

            var data = {
              "cityCode": cityCode,
              "contentId": contentId,
              "templateId": templateId,
              "content": JSON.stringify(content),
              "type": "2"
            };

            // ajax保存请求
            $.ajax({
              url: ajaxUrl.saveAdContent,
              type: "POST",
              dataType: "json",
              data: data
            }).done(function (data) {
              if (data.code == "0") {
                swal("成功保存", "", "success");
                //跳转到分类已发布列表页面
                thiz.$route.router.go({
                  'name': 'catePublished'
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
      }
    },
    events: {},
    route: {
      data: function (transition) {
        if (transition.to.name == 'cateAdd') {//如果是新增广告
          $(this.$el).find(".area-select").removeClass('hide');
          $(this.$el).find(".modelName").addClass('hide');
          $(this.$el).find(".cancelBtn").removeClass('hide');
          $(this.$el).find(".deleteBtn").addClass('hide');
          this.resetData();
          this.$nextTick(function () {});
          transition.next({});
        } else if (transition.to.name == 'cateEdit') {//如果是修改广告
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
            "type": "2"
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
              thiz.setCateAdsOne(content);
              thiz.$nextTick(function () {
                $(thiz.$el).find('.form-item[index="0"]').trigger('click');
              });

            } else {
              swal("读取失败!", data.msg, "warning");
            }
          }).fail(function (xhr, exception) {
            hrtCommon.ajaxFail(xhr, exception, '读取失败!');
          }).always(function () {

          });

          transition.next();
        }
      }
    },
    ready: function () {}
  }
</script>
