<style scoped>
  .atuo-image-good{
    border: 1px solid #cccccc;
    padding-top: 15px;
    margin-top: 10px;
  }
</style>

<template>
  <div class="atuo-image-good container-fluid">
    <div class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-4 control-label">商品编号</label>
        <div class="col-sm-8">
          <input type="text" class="form-control" v-model="goodId" placeholder="">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-4 control-label">主标题</label>
        <div class="col-sm-8">
          <input @change="change" type="text" class="form-control" v-model="imageData.title" placeholder="最多输入20个字符">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-4 control-label">副标题</label>
        <div class="col-sm-8">
          <input @change="change" type="text" class="form-control" v-model="imageData.subTitle" placeholder="最多输入20个字符">
        </div>
      </div>
      <div class="form-group">
        <div class=" col-sm-12">
          <button type="submit"
                  class="btn btn-default"
                  v-if="imageData.hideBtn"
                  @click="deleteFun(imageData)">删 除</button>
          <button type="submit"
                  class="btn btn-default"
                  @click="upFun(imageData)">上 移</button>
          <button type="submit"
                  class="btn btn-default"
                  @click="downFun(imageData)">下 移</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 图片自动获取的单品组件
   */

  var $=require('jquery');
  var swal = require('sweetalert');
  module.exports = {
    props: {
      imageData:Object,
      deleteFun:{
        type:Function,
        default:function(data){

        }
      },
      upFun:{
        type:Function,
        default:function(data){

        }
      },
      downFun:{
        type:Function,
        default:function(data){

        }
      }
    },
    data: function () {
      return {
        channelList:[]
      }
    },
    computed: {
      goodId:{
        get: function () {
          let value=this.imageData.linkTo.split('#type=good&goodId=')[1]||"";
          return value;
        },
        set: function (val) {
          this.imageData.linkTo='#type=good&goodId='+val;
        }
      },
      cTitle:{
        get: function () {
          let value=this.imageData.title;
          return value;
        },
        set: function (val) {
          this.imageData.title=val;
        }
      },
      cSubTitle:{
        get: function () {
          let value=this.imageData.subTitle;
          return value;
        },
        set: function (val) {
          this.imageData.subTitle=val;
        }
      }
    },
    components: {},
    methods: {
      change: function (e) {
        if(e.target.value.trim().length>20){
          swal("最多只能输入20个字符!", "", "error");
          e.target.value="";
          return;
        }
      }
    },
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    ready: function () {}
  };
</script>
