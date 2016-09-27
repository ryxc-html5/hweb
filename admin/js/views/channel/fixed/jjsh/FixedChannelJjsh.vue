<style scoped>
  /*-------------------------预览窗体样式------------------------------*/
  #myModal{
    width: 640px;
    margin: auto;
    padding: 0!important;
  }
  #myModal .modal-dialog{
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #myModal .modal-body{
    padding: 0;
  }

  /* 设置滚动条的样式 */
  ::-webkit-scrollbar {
    width:0px;
  }
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:10px;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius:10px;
    background:rgba(0,0,0,0.1);
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background:rgba(255,0,0,0.4);
  }
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">频道编辑-家居生活</h4>
    </div>
    <div class="panel-body">
      <div class="row channel-title">
        <div class="col-md-8 form-inline"></div>
        <div class="col-md-4 text-right">
          <button class="btn btn-default" @click="preview">预览</button>
          <button class="btn btn-default" @click="save">保存</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="channel-deploy-tab">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active">
                <a href="#one" aria-controls="one" role="tab" data-toggle="tab">Banner编辑</a>
              </li>
              <li role="presentation">
                <a href="#two" aria-controls="two" role="tab" data-toggle="tab">独家推荐</a>
              </li>
              <li role="presentation">
                <a href="#three" aria-controls="three" role="tab" data-toggle="tab">精选活动</a>
              </li>
              <li role="presentation">
                <a href="#four" aria-controls="four" role="tab" data-toggle="tab">人气爆款</a>
              </li>
              <li role="presentation">
                <a href="#five" aria-controls="five" role="tab" data-toggle="tab">品类楼层</a>
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="one">
                <Banner-tab :tab-data="channel.cmContent[0]"></Banner-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="two">
                <Activity-recommend-tab :tab-data="channel.cmContent[1]"></Activity-recommend-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="three">
                <Selection-activity-tab :tab-data="channel.cmContent[2]"></Selection-activity-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="four">
                <Selection-good-tab :tab-data="channel.cmContent[3]"></Selection-good-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="five">
                <Category-tab :tab-data="channel.cmContent[4]"></Category-tab>
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
            <h4 class="modal-title" id="myModalLabel">预览</h4>
          </div>
          <div class="modal-body">
            <!--此处放于预览内容-->
            <Jjsh-channel-preview :preview-data="previewData"></Jjsh-channel-preview>
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
  var $=require('jquery');
  var Swiper = require('swiper');
  import BannerTab from '../common/BannerTab';
  import ActivityRecommendTab from './ActivityRecommendTab';
  import SelectionActivityTab from './SelectionActivityTab';
  import SelectionGoodTab from './SelectionGoodTab';
  import CategoryTab from './CategoryTab';
  import JjshChannelPreview from './JjshChannelPreview';


  var ajaxUrl={
    getChannelContent:'/Admin/ContentManagement/getChannelContent',
//    getGoodsInfo:"/Admin/ContentManagement/getGoodsInfo",
    getGoodsInfo:"/Admin/Goods/getGoodsList",
    saveChannelContent:"/Admin/ContentManagement/saveChannelContent"
  };

  function getJjshInitData(){
    return [
      //banner
      {
        type:"banner",
        data:[]
      },
      //活动推荐
      {
        type:"rowList",
        title:"活动推荐",
        more:"",
        rows:[
          {
            type:"ad",
            column:1,
            items:[
              {
                "title": "",//主标题
                "subTitle":"",//副标题
                "desc":"",//描述

                "shareUrl": "",//暂时无用
                "name": "",//暂时无用
                "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
                "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

                "hideBtn": true,//是否显示删除按钮
                "type": "2",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
                "linkTo": "",//如果type是0（图片），则不需要填该属性值
                "imageUrl": "",//图片地址
                "size": {
                  "width": 1020,
                  "height": 360
                },
                "weight": 100
              }
            ]
          },
          {
            type:"ad",
            column:1,
            items:[]
          }
        ]
      },
      //精选活动
      {
        type:"ads",
        title:"精选活动",
        more:"",
        rows:[
          {
            type:"list",
            column:1,
            items:[]
          }
        ]
      },
      //精选单品
      {
        type:"rowList",
        title:"精选单品",
        more:"",
        rows:[
          {
            type:"list",
            column:3,
            items:[]
          }
        ]
      },
      //品类商品
      {
        type:"category",
        title:"品类商品",
        more:"",
        categorys:[
        ]
      }
    ]
  }

  module.exports = {
    props: {},
    data: function () {
      return {
        //频道数据
        channel:{
          cmId:'',
          cmName:'',
          cmUrl:'',
          cmType:2,
          cmContent:getJjshInitData()
        },
        previewData:$.extend(true, [], getJjshInitData())
      }
    },
    computed: {

    },
    components: {
      BannerTab:BannerTab,
      ActivityRecommendTab:ActivityRecommendTab,
      SelectionActivityTab:SelectionActivityTab,
      SelectionGoodTab:SelectionGoodTab,
      CategoryTab:CategoryTab,
      JjshChannelPreview:JjshChannelPreview
    },
    methods: {
      getChannel: function (channelId) {
        var thiz = this;

        thiz.$http.get(ajaxUrl.getChannelContent, {
          params: {
            cmId:channelId
          }
        }).then(function (response) {
                  let data = response.json();
                  if (data.code == '0') {
                    let channel = data.data;
                    channel.cmContent = JSON.parse(channel.cmContent);
                    thiz.channel = channel;
                  } else {
                    swal('获取数据失败', data.msg, 'warning');
                  }
                }, function (response) {
                  swal("获取数据失败!", response.json().msg, "warning");
                }
        );
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
          new Swiper('.drag-swiper', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0
          });
        });


        var previewData=$.extend(true,[],this.channel.cmContent);

        let goodIds=[];

        //活动推荐
        let selectionActivityGood= previewData[1].rows[1].items;
        for(let i=0;i<selectionActivityGood.length;i++){
          let goodId=selectionActivityGood[i].linkTo.split('#type=good&goodId=')[1]||"";
          selectionActivityGood[i].goodId=goodId;
          if(goodId!=""){
            goodIds.push(goodId);
          }
        }
        //精选单品
        let selectionGood= previewData[3].rows[0].items;
        for(let i=0;i<selectionGood.length;i++){
          let goodId=selectionGood[i].linkTo.split('#type=good&goodId=')[1]||"";
          selectionGood[i].goodId=goodId;
          if(goodId!=""){
            goodIds.push(goodId);
          }
        }
        //品类商品
        let categorgs= previewData[4].categorys;
        for(let i=0;i<categorgs.length;i++){
          let category=categorgs[i];
          for(let j=0;j<category.items.length;j++){
            let goodId=category.items[j].linkTo.split('#type=good&goodId=')[1]||"";
            category.items[j].goodId=goodId;
            if(goodId!=""){
              goodIds.push(goodId);
            }
          }
        }

        var thiz = this;

        if(goodIds.length==0){
          thiz.previewData= previewData;
          $("#myModal").modal();
          return;
        }

        thiz.$http.get(ajaxUrl.getGoodsInfo, {
          params: {
            goodsIds: goodIds.join(",")
          }
        }).then(function (response) {
                  let data = response.json();
                  if (data.code == '0') {
                    let goodList = data.data;
                    for (let i = 0; i < goodList.length; i++) {

                      for (let j = 0; j < selectionActivityGood.length; j++) {
                        if (selectionActivityGood[j].goodId == goodList[i].goodsID) {
                          selectionActivityGood[j].imageUrl = goodList[i].picture;
                          if (goodList[i].point && parseInt(goodList[i].point)!=0) {
                            selectionActivityGood[j].price = goodList[i].price + '元+' + goodList[i].point + '积分';
                          } else {
                            selectionActivityGood[j].price = goodList[i].price + '元';
                          }
                        }
                      }

                      for (let j = 0; j < selectionGood.length; j++) {
                        if (selectionGood[j].goodId == goodList[i].goodsID) {
                          selectionGood[j].imageUrl = goodList[i].picture;
                          if (goodList[i].point && parseInt(goodList[i].point)!=0) {
                            selectionGood[j].price = goodList[i].price + '元+' + goodList[i].point + '积分';
                          } else {
                            selectionGood[j].price = goodList[i].price + '元';
                          }
                        }
                      }

                      for(let k=0;k<categorgs.length;k++){
                        let category=categorgs[k];
                        for(let j=0;j<category.items.length;j++){
                          if (category.items[j].goodId == goodList[i].goodsID) {
                            if (goodList[i].point && parseInt(goodList[i].point)!=0) {
                              //category.items[j].imageUrl=goodList[i].picture;
                              category.items[j].price= goodList[i].price+'元+'+goodList[i].point+'积分';
                            } else {
                              category.items[j].price= goodList[i].price+'元';
                            }
                          }
                        }
                      }

                    }
                    thiz.previewData=previewData;
                    thiz.$log('previewData');
                    $("#myModal").modal();
                    return;
                  } else {
                    swal('预览失败，请重试！', data.msg, 'warning');
                  }
                }, function (response) {
                  swal("预览失败，请重试！", response.json().msg, "warning");
                }
        );

      },
      getItemLinkTo: function (item) {
        let linkTo = "";
        if (item.type == "1") {//网页
          linkTo = item.linkTo.split('#type=url&url=')[1] || ""
        } else if (item.type == "2") {//单品
          linkTo = item.linkTo.split('#type=good&goodId=')[1] || ""
        } else if (item.type == "3") {//模板
          linkTo = item.linkTo.split('#type=dataTemplet&url=')[1] || ""
        } else if (item.type == "4") {//搜索
          linkTo = item.linkTo.split('#type=list&')[1] || ""
        }else if (item.type == "5") {//自动商品
          linkTo = item.linkTo.split('#type=good&goodId=')[1] || ""
        }else if (item.type == "6") {//频道
          linkTo = item.linkTo.split('#type=channel&cmId=')[1] || ""
        } else {
          linkTo = item.linkTo.split('#type=url&url=')[1] || ""
        }
        return linkTo.trim();
      },
      save: function () {
        var thiz = this;

        //banner
        let bannerTabData=thiz.channel.cmContent[0].data;
        for(let i=0;i<bannerTabData.length;i++){
          let item=bannerTabData[i];
          if(item.desc.trim()==''  || thiz.getItemLinkTo(item)=='' || item.imageUrl.trim()==''){
            swal("保存失败!", '请补全banner信息！', "warning");
            return false;
          }

          if(item.desc.length>20){
            swal("保存失败!", '图片描述最多输入20个字符！', "warning");
            return false;
          }
        }

        //活动推荐
        let activityRecommendTabTopData=thiz.channel.cmContent[1].rows[0].items;
        for(let i=0;i<activityRecommendTabTopData.length;i++){
          let item=activityRecommendTabTopData[i];
          if(item.desc.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全活动推荐信息！', "warning");
            return false;
          }

          if(item.desc.length>20){
            swal("保存失败!", '图片描述最多输入20个字符！', "warning");
            return false;
          }
        }

        let activityRecommendTabBottomData=thiz.channel.cmContent[1].rows[1].items;
        for(let i=0;i<activityRecommendTabBottomData.length;i++){
          let item=activityRecommendTabBottomData[i];
          if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)=='' ){
            swal("保存失败!", '请补全活动推荐信息！', "warning");
            return false;
          }
        }

        //精选活动
        let selectionActivityTabData=thiz.channel.cmContent[2].rows[0].items;
        for(let i=0;i<selectionActivityTabData.length;i++){
          let item=selectionActivityTabData[i];
          if(item.desc.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全精选活动信息！', "warning");
            return false;
          }

          if(item.desc.length>20){
            swal("保存失败!", '图片描述最多输入20个字符！', "warning");
            return false;
          }
        }

        //精选单品
        let selectionGoodTabData=thiz.channel.cmContent[3].rows[0].items;
        for(let i=0;i<selectionGoodTabData.length;i++){
          let item=selectionGoodTabData[i];
          if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全精选单品信息！', "warning");
            return false;
          }
        }

        //品类商品
        let categoryTabData=thiz.channel.cmContent[4].categorys;
        for(let i=0;i<categoryTabData.length;i++){
          let categoryName=categoryTabData[i].name;
          let categoryGoods=categoryTabData[i].items;

          if((categoryGoods.length % 2)!=0){
            swal("保存失败!", '品类商品个数必须为偶数个！', "warning");
            return false;
          }

          for(let j=0;j<categoryGoods.length;j++){
            let item=categoryGoods[j];
            if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)==''){
              swal("保存失败!", '请补全品类商品——'+categoryName+'的商品信息！', "warning");
              return false;
            }
          }
        }


        swal({
          title: "是否确定发布该频道?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            thiz.$http.post(ajaxUrl.saveChannelContent, {
              "cmId": thiz.channel.cmId,
              "cmName": thiz.channel.cmName,
              "cmUrl": "#type=channel&channel=" + thiz.channel.cmName,
              "cmContent": JSON.stringify(thiz.channel.cmContent)
            }).then(function (response) {
                      let data = response.json();
                      if (data.code == "0") {
                        swal("成功保存", "", "success");
                        //跳转到首页已发布列表页面
                        thiz.$route.router.go({
                          'name': 'fixedChannelList'
                        });
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
    events: {},
    route: {
      data: function (transition) {
        let channelId=transition.to.params.channelId;
        this.getChannel(channelId);
        transition.next();
      }
    },
    ready: function () {

    }
  };
</script>
