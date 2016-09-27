<style scoped>
  .no-padding-top{
    padding-top: 0;
  }
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">用户定制广告编辑</h4>
    </div>
    <div class="panel-body">
      <div class="form-horizontal" role="form">
        <div class="form-group">
          <label class="col-sm-2 control-label">广告名称</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="custom.adName">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label no-padding-top">
            <select class="form-control" v-model="custom.urlType" @change="changeType">
              <option v-for="option in urlTypes" :value="option.typeValue" v-if="option.typeValue!=5">{{option.typeName}}</option>
            </select>
          </label>
          <div class="col-sm-10">
            <input v-model="cLinkTo" type="text" class="form-control">
          </div>
        </div>
        <Image-conponent
                btn-label="上传主图"
                :image-url="custom.mainPicUrl"
                :fail="mainFail"
                :success="mainSuccess"></Image-conponent>
        <Image-conponent
                btn-label="上传APP图"
                :image-url="custom.appPicUrl"
                :fail="appFail"
                :success="appSuccess"></Image-conponent>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button @click="back" type="button" class="btn btn-default">取 消</button>
            <button @click="reset" type="button" class="btn btn-default">重 置</button>
            <button @click="save" type="button" class="btn btn-default">确 定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import adminConfig from '../../../../../common/js/config/admin.config';
  import ImageConponent from './ImageConponent';
  import config from './config';
  export default{
    data(){
      return {
        custom:{
          adId:"",
          adName:"",
          urlType:1,
          adUrl:'',
          mainPicUrl:"",
          mainPicWidth:1020,
          mainPicHigh:270,
          appPicUrl:"",
          appPicWidth:1020,
          appPicHigh:270
        },
        urlTypes:adminConfig.urlType.data
      }
    },
    computed:{
      cLinkTo:{
        get:function(){
          var prefix=adminConfig.urlType.getTypeData(this.custom.urlType).prefix;
          return this.custom.adUrl.split(prefix)[1]||"";
        },
        set: function (val) {
          var prefix=adminConfig.urlType.getTypeData(this.custom.urlType).prefix;
          this.custom.adUrl=prefix+val;
        }
      }
    },
    methods:{
      changeType:function () {
        this.custom.adUrl='';
      },
      mainFail:function () {
        this.custom.mainPicUrl='';
      },
      mainSuccess:function (data) {
        this.custom.mainPicUrl=data.origin_img_url
      },
      appFail:function () {
        this.custom.appPicUrl='';
      },
      appSuccess:function (data) {
        this.custom.appPicUrl=data.origin_img_url
      },
      getAdContent:function (adId) {
        var thiz = this;

        thiz.$http.get(config.ajaxUrl.detail, {
          params: {
            adId:adId
          }
        }).then(
          function (response) {
            let data = response.json();
            if (data.code == '0') {
              thiz.custom=data.data.custom;
            } else {
              swal('获取数据失败', data.msg, 'warning');
            }
          },
          function (response) {
            swal("获取数据失败!", response.json().msg, "warning");
          }
        );
      },
      /**
       * 取消按钮，返回
       */
      back:function () {
        this.$route.router.go({
          'name': 'customFlowList',
          'params': {}
        });
      },

      /**
       * 重置
       */
      reset:function () {
        this.custom.adName="";
        this.custom.urlType="1";
        this.custom.adUrl="";
        this.custom.mainPicUrl="";
        this.custom.appPicUrl=""
      },
      /**
       * 保存
       */
      save:function () {
        var thiz=this;

        if(thiz.custom.adName.trim()==''){
          swal("保存失败!", '请输入广告名称！', "warning");
          return false;
        }else{
          thiz.custom.adName=thiz.custom.adName.trim();
        }

        if(thiz.custom.adUrl.trim()==''){
          swal("保存失败!", '请输入广告链接！', "warning");
          return false;
        }else{
          thiz.custom.adUrl=thiz.custom.adUrl.trim();
        }

        if(thiz.custom.mainPicUrl.trim()==''){
          swal("保存失败!", '请上传广告主图！', "warning");
          return false;
        }else{
          thiz.custom.mainPicUrl=thiz.custom.mainPicUrl.trim();
        }

        if(thiz.custom.appPicUrl.trim()==''){
          swal("保存失败!", '请上传广告app图！', "warning");
          return false;
        }else{
          thiz.custom.appPicUrl=thiz.custom.appPicUrl.trim();
        }

        swal({
          title: "是否确定发布?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            thiz.$http.post(config.ajaxUrl.save,thiz.custom ).then(
              function (response) {
                let data = response.json();
                if (data.code == "0") {
                  swal("成功保存", "", "success");
                  thiz.back();
                } else {
                  swal("保存失败!", data.msg, "warning");
                }
              },
              function (response) {
                swal("保存失败!", response.json().msg, "warning");
              }
            );

          } else {
            swal("已取消", "", "error");
          }
        });
      }
    },
    components: {
      ImageConponent:ImageConponent
    },
    route: {
      data: function (transition) {
        if (transition.to.name == 'customFlowAdd') {

        } else {
          this.getAdContent(transition.to.params.id);
        }
        transition.next();
      }
    }
  }
</script>
