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
      <h4 class="panel-title">频道编辑-积分频道</h4>
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
                <a href="#two" aria-controls="two" role="tab" data-toggle="tab">限时抢兑</a>
              </li>
              <li role="presentation">
                <a href="#three" aria-controls="three" role="tab" data-toggle="tab">热门活动</a>
              </li>
              <li role="presentation">
                <a href="#four" aria-controls="four" role="tab" data-toggle="tab">积分兑换</a>
              </li>
              <li role="presentation">
                <a href="#five" aria-controls="five" role="tab" data-toggle="tab">推荐商户</a>
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="one">
                <Banner-tab :tab-data="channel.cmContent[0]"></Banner-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="two">
                <Limit-time-exchange-tab :tab-data="channel.cmContent[1]"></Limit-time-exchange-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="three">
                <Integral-marketing-tab :tab-data="channel.cmContent[2]"></Integral-marketing-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="four">
                <Category-floor-tab :tab-data="channel.cmContent[3]"></Category-floor-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="five">
                <Integral-exchange-tab :tab-data="channel.cmContent[4]"></Integral-exchange-tab>
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
            <Jfpd-channel-preview :preview-data="previewData"></Jfpd-channel-preview>
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
  import LimitTimeExchangeTab from './LimitTimeExchangeTab';
  import IntegralMarketingTab from './IntegralMarketingTab';
  import CategoryFloorTab from './CategoryFloorTab';
  import IntegralExchangeTab from './IntegralExchangeTab';
  import JfpdChannelPreview from './JfpdChannelPreview';


  var ajaxUrl={
    getChannelContent:'/Admin/ContentManagement/getChannelContent',
//    getGoodsInfo:"/Admin/ContentManagement/getGoodsInfo",
    getGoodsInfo:"/Admin/Goods/getGoodsList",
    saveChannelContent:"/Admin/ContentManagement/saveChannelContent"
  };

  function getJfpdInitData(){
    return [
      //banner
      {
        type:"banner",
        data:[]
      },
      //限时抢兑
      {
        type:"rowList",
        title:"限时抢兑",
        more:"",
        rows:[
          {
            type:"ad",
            column:1,
            items:[]
          }
        ]
      },
      //积分营销
      {
        type:"ads",
        title:"积分营销",
        more:"",
        rows:[
          {
            type:"ad",
            column:2,
            items:[]
          }
        ]
      },
      //品类楼层
      {
        type:"group",
        title:"品类楼层",
        more:"",
        groups:[

        ]
      },
      //积分兑换品牌
      {
        type:"group",
        title:"积分兑换品牌",
        more:"",
        groups:[

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
          cmContent:getJfpdInitData()
        },
        previewData:$.extend(true, [], getJfpdInitData())
      }
    },
    computed: {

    },
    components: {
      BannerTab:BannerTab,
      LimitTimeExchangeTab:LimitTimeExchangeTab,
      IntegralMarketingTab:IntegralMarketingTab,
      CategoryFloorTab:CategoryFloorTab,
      IntegralExchangeTab:IntegralExchangeTab,
      JfpdChannelPreview:JfpdChannelPreview
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
          new Swiper('.ad-4-swiper', {
            slidesPerView: 'auto',
            paginationClickable: true,
            spaceBetween: 0
          });
        });

        var previewData=$.extend(true,[],this.channel.cmContent);

        let goodIds=[];
        let popularGoods= previewData[1].rows[0].items;
        for(let i=0;i<popularGoods.length;i++){
          let goodId=popularGoods[i].linkTo.split('#type=good&goodId=')[1]||"";
          popularGoods[i].goodId=goodId;
          if(goodId!=""){
            goodIds.push(goodId);
          }
        }

        let marketingGoods= previewData[2].rows[0].items;
        for(let i=0;i<marketingGoods.length;i++){
          let goodId=marketingGoods[i].linkTo.split('#type=good&goodId=')[1]||"";
          marketingGoods[i].goodId=goodId;
          if(goodId!=""){
            goodIds.push(goodId);
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

                      for (let j = 0; j < popularGoods.length; j++) {
                        if (popularGoods[j].goodId == goodList[i].goodsID) {
                          popularGoods[j].imageUrl = goodList[i].picture;
                          if (goodList[i].point && parseInt(goodList[i].point)!=0) {
                            popularGoods[j].price = goodList[i].price + '元+' + goodList[i].point + '积分';
                          } else {
                            popularGoods[j].price = goodList[i].price + '元';
                          }
                        }
                      }

                      for (let j = 0; j < marketingGoods.length; j++) {
                        if (marketingGoods[j].goodId == goodList[i].goodsID) {
                          marketingGoods[j].imageUrl=goodList[i].picture;
                          if(goodList[i].point&& parseInt(goodList[i].point)!=0){
                            marketingGoods[j].price= goodList[i].price+'元+'+goodList[i].point+'积分';
                          }else{
                            marketingGoods[j].price= goodList[i].price+'元';
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

        //banner tab页校验
        let bannerTabData=thiz.channel.cmContent[0].data;
        for(let i=0;i<bannerTabData.length;i++){
          let item=bannerTabData[i];
          if(item.desc.trim()==''  || thiz.getItemLinkTo(item)=='' || item.imageUrl.trim()==''){
            swal("保存失败!", '请补全banner信息！', "warning");
            return false;
          }
        }

        //限时抢兑
        let limitedTimeTabData=thiz.channel.cmContent[1].rows[0].items;
        for(let i=0;i<limitedTimeTabData.length;i++){
          let item=limitedTimeTabData[i];
          if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全限时抢兑信息！', "warning");
            return false;
          }
        }

        //积分营销
        let integralMarketingTabData=thiz.channel.cmContent[2].rows[0].items;
        for(let i=0;i<integralMarketingTabData.length;i++){
          let item=integralMarketingTabData[i];
          if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全积分营销信息！', "warning");
            return false;
          }
        }

        //品类楼层
        let categoryFloorTabData=thiz.channel.cmContent[3].groups;
        for(let i=0;i<categoryFloorTabData.length;i++){
          let groupItems=categoryFloorTabData[i].items;
          for(let j=0;j<groupItems.length;j++){
            var item=groupItems[j];
            if(item.desc.trim()=='' || item.imageUrl.trim()=='' || thiz.getItemLinkTo(item)==''){
              swal("保存失败!", '请补全品类楼层信息！', "warning");
              return false;
            }
          }
        }

        //积分兑换品牌
        let integraExchangeTabData=thiz.channel.cmContent[4].groups;
        for(let i=0;i<integraExchangeTabData.length;i++){
          let groupItems=integraExchangeTabData[i].items;
          for(let j=0;j<groupItems.length;j++){
            var item=groupItems[j];
            if(item.desc.trim()==''  || item.imageUrl.trim()==''  || thiz.getItemLinkTo(item)==''){
              swal("保存失败!", '请补全积分兑换品牌信息！', "warning");
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
