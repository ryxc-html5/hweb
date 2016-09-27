<style scoped>
  .title {
    height: 34px;
    line-height: 34px;
  }

  .category-item{
    display: inline-block;
    float: left;
    margin-right: 10px;
    border: 1px solid #cccccc;
    position: relative;
  }

  .category-item.selected{
    border: 1px solid red;
  }

  .category-item .category-image{
    display: block;
  }

  .category-item .category-image img{
    width: 80px;
    height: 80px;
  }

  .category-item .category-name{
    height: 30px;
    line-height: 30px;
    padding: 5px;
    background-color: #FFFFFF;
    cursor: pointer;
  }

  .category-item .category-image .remove-mask{
    position: absolute;
    right: 0;
    bottom: 30px;
    left: 0;
    top: 0;
    cursor: pointer;
    display: none;
    background-color: #FFFFFF;
    background-color:rgba(0,0,0,0.2)
  }

  .category-item .category-image:hover .remove-mask{
    display: block;
  }

  .category-item:hover .remove-mask span{
    height: 30px;
    line-height: 30px;
    padding: 0 5px;
    border-radius: 5px;
    background-color: #FFFFFF;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    left: 50%;
    margin-left: -20px;
  }


</style>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="title">
          <div class="form-group">
            <label class="col-sm-2 control-label text-left">标签名称：</label>
            <div class="col-sm-3">
              <input type="text"
                     class="form-control"
                     v-model="name" placeholder="不超过5个字符">
            </div>
            <div class="col-sm-4">
              <Category-image :image-data="image"></Category-image>
            </div>
            <div class="col-sm-3">
              <button type="submit"
                      class="btn btn-default"
                      @click="addCategory">新增标签</button>最多{{limitedCategory}}个
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="category-item"
             v-bind:class="[$index==0 ? 'selected' : '']"
             v-for="item in tabData.categorys">
          <div class="category-image">
            <img :src="item.image.imageUrl">
            <div class="remove-mask">
              <span @click="deleteCategory(item)">删除</span>
            </div>
          </div>
          <div class="category-name" @click="selectCategory($event,$index)">{{item.name}}</div>
        </div>
      </div>
      <div class="row" >
        <div class="col-md-12 text-right" style="margin-top:10px;">
          <button @click="addGood" class="btn btn-default">新增单品</button>每个标签下最多添加20款商品
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="row">
            <div class="col-md-6"  v-for="item in goodList" track-by="$index">
              <Auto-image-good :image-data="item" :delete-fun="deleteGood" :up-fun="up" :down-fun="down"></Auto-image-good>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var $=require('jquery');
  var swal = require('sweetalert');
  import AutoImageGood from '../../common/AutoImageGood';
  import CategoryImage from '../common/CategoryImage';

  module.exports = {
    props: {
      tabData: Object
    },
    data: function () {
      return {
        limitedCategory:10,
        limitedCount:20,
        name: "",
        image:{//标签图片
          imageUrl:"",
          size:{
            width:40,
            height:40
          },
          weight:40
        },
        categoryIndex:0
      }
    },
    computed: {
      goodList:{
        get: function () {
          let list=[];
          if(this.tabData.categorys[this.categoryIndex]){
            list=this.tabData.categorys[this.categoryIndex].items;
          }
          return list;
        }
      }
    },
    components: {
      AutoImageGood: AutoImageGood,
      CategoryImage: CategoryImage
    },
    methods: {
      /**
       * 添加商品品类
       *
       */
      addCategory: function () {
        if(this.tabData.categorys.length>(this.limitedCategory-1)){
          swal("最多只能增加"+this.limitedCategory+"个标签!", "", "error");
          return;
        }else {
          let category={
            name:this.name,//标签名
            image:Object.assign({},this.image),
            type:"list",
            column:2,
            items:[
            ]
          };

          if(category.name.trim()=='' || category.name.length>5 || category.image.imageUrl.trim()==''){
            swal("请输入五个字符长度的标签名或者上传标签图标!", "", "error");
            return;
          }

          this.tabData.categorys.push(category);

          this.name="";
          this.image={//标签图片
            imageUrl:"",
            size:{
              width:40,
              height:40
            },
            weight:40
          };

        }

      },
      deleteCategory: function (data) {
        var thiz = this;
        swal({
          title: "是否确定删除该品类?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            thiz.tabData.categorys.$remove(data);
            swal("成功删除", "", "success");
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      /**
       * 切换品类
       */
      selectCategory: function (e,categoryIndex) {
        this.categoryIndex=categoryIndex;
        $(".selected",this.$el).removeClass("selected");
        $(e.target).closest(".category-item").addClass('selected');
      },
      /**
       * 新增单品
       */
      addGood: function () {
        if (this.goodList.length > (this.limitedCount-1)) {
          swal("最多只能增加"+this.limitedCount+"个商品!", "", "error");
          return;
        }

        this.goodList.push({
          "title": "",//主标题
          "subTitle": "",//副标题
          "desc": "",//描述

          "shareUrl": "",//暂时无用
          "name": "",//暂时无用
          "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
          "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

          "hideBtn": true,//是否显示删除按钮
          "type": "5",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
          "linkTo": ""//如果type是0（图片），则不需要填该属性值
        })
      },
      deleteGood: function (data) {
        var thiz = this;
        swal({
          title: "是否确定删除该商品?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            let items = thiz.goodList;
            items.$remove(data);
            swal("成功删除", "", "success");
          } else {
            swal("已取消", "", "error");
          }
        });
      },
      up: function (data) {
        let index = 0;
        let items = this.goodList;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }

        if (index == 0) {
          return
        } else {
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp = items[index - 1];
          items.$set(index - 1, items[index]);
          items.$set(index, temp);
        }
      },
      down: function (data) {
        let index = 0;
        let items = this.goodList;
        for (let i = 0; i < items.length; i++) {
          if (items[i] == data) {
            index = i;
            break;
          }
        }

        if (index == items.length - 1) {
          return
        } else {
          //此处不可直接用数据rows[index-1]=rows[index]方式实现
          let temp = items[index + 1];
          items.$set(index + 1, items[index]);
          items.$set(index, temp);
        }
      }
    },
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    created: function () {

    },
    ready: function () {

    }

  }
</script>
