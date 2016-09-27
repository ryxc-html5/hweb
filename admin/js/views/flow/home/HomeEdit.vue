<style scoped>
  .base-setting label,
  .base-setting select {
    display: inline-block;
  }

  .base-setting select {
    width: 100px;
  }

  .content {
    display: table;
  }

  .model-container {
    width: 100%;
    display: table-row;
  }

  .model-wrapper,
  .model-style-wrapper {
    display: table-cell;
    padding-top: 10px;
  }

  .model-style-wrapper {
    width: 340px;
    padding: 10px 8px 0 8px;
  }

  .btn-container{
    margin: 15px;
  }


</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">首页广告发布</h4>
    </div>
    <div class="panel-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 base-setting">
            <label class=" control-label">地区设置</label>
            <select class="form-control" v-model="city">
              <option v-for="option in areaList" :value="option.cityCode">{{option.cityName}}</option>
            </select>
            <label class="control-label">模板选择</label>
            <select class="form-control" v-model="model" @change="toggleModel">
              <option v-for="option in modelList" :value="option.templateId">
                {{option.tempName}}
              </option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 content">
            <div class="model-container">
              <div class="model-wrapper">
                <div class="row">
                  <div class="col-md-12">
                    <component :is="currentModel" keep-alive></component>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 text-center btn-container">
                    <button @click="back" class="btn btn-default ">取消</button>
                    <button @click="preview" class="btn btn-default ">预览</button>
                    <button @click="save" class="btn btn-default ">保存并发布</button>
                  </div>
                </div>
              </div>
              <div class="model-style-wrapper">
                <component :is="currentModelLayout" keep-alive></component>
              </div>
            </div>
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
            <component :is="currentModelPreview" keep-alive></component>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var $ = require('jquery');
  import store from '../../../store/store';
  import * as  action from '../../../actions/actions';

  import ModelOneMain from './modelOne/Main';
  import ModelOneLayout from './modelOne/Layout';
  import ModelOnePreview from './modelOne/Preview';

  import ModelTwoMain from './modelTwo/Main';
  import ModelTwoLayout from './modelTwo/Layout';
  import ModelTwoPreview from './modelTwo/Preview';

  export default{
    data(){
      return {
        //地区列表
        areaList: this.$select('cityList.data as areaList'),
        //模板列表
        modelList: this.$select('homeModelList.data as modelList'),
        //地区
        city: 0,
        //模板
        model: 1,
        //
        currentModel: "ModelOneMain",
        //
        currentModelLayout: "ModelOneLayout",
        //
        currentModelPreview: "ModelOnePreview",
      }
    },
    components: {
      ModelOneMain: ModelOneMain,
      ModelOneLayout:ModelOneLayout,
      ModelOnePreview:ModelOnePreview,

      ModelTwoMain: ModelTwoMain,
      ModelTwoLayout: ModelTwoLayout,
      ModelTwoPreview: ModelTwoPreview,
    },
    methods: {
      toggleModel: function () {
        switch (this.model) {
          case "1":
            this.currentModel = "ModelOneMain";
            this.currentModelLayout = "ModelOneLayout";
            this.currentModelPreview = "ModelOnePreview";
            action.setModelId(1);
            action.resetModelOneData();
            break;
          case "2":
            this.currentModel = "ModelTwoMain";
            this.currentModelLayout = "ModelTwoLayout";
            this.currentModelPreview = "ModelTwoPreview";
            action.setModelId(2);
            break;
          default:
            this.currentModel = "ModelOneMain";
            this.currentModelLayout = "ModelOneLayout";
            this.currentModelPreview = "ModelOnePreview";
            action.setModelId(1);
            action.resetModelOneData();
            break;
        }
      },

      back: function () {
        this.$route.router.go({
          'name': 'homeFlowList',
          'params': {}
        });
      },

      preview: function () {
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

      save: function () {
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
            var cityCode = thiz.city;
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
      }
    },
    created: function () {

    },
  }
</script>
