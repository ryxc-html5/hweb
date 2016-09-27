<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">频道编辑-华润质造</h4>
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
                <a href="#baseInfo" aria-controls="baseInfo" role="tab" data-toggle="tab">Banner编辑</a>
              </li>
              <li role="presentation">
                <a href="#priceSpec" aria-controls="priceSpec" role="tab" data-toggle="tab">优选精品</a>
              </li>
              <li role="presentation">
                <a href="#teletext" aria-controls="teletext" role="tab" data-toggle="tab">品类楼层</a>
              </li>

            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="baseInfo">
                <Banner-tab :tab-data="channel.cmContent[0]"></Banner-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="priceSpec">
                <Popularity-tab :tab-data="channel.cmContent[1]"></Popularity-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="teletext">
                <Category-tab :tab-data="channel.cmContent[2]"></Category-tab>
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
            <Hrzz-channel-preview :preview-data="previewData"></Hrzz-channel-preview>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
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
<script>
  var $=require('jquery');
  var Swiper = require('swiper');
  import BannerTab from '../common/BannerTab';
  import PopularityTab from './PopularityTab';
  import CategoryTab from './CategoryTab';
  import HrzzChannelPreview from './HrzzChannelPreview';

  var ajaxUrl={
    getChannelContent:'/Admin/ContentManagement/getChannelContent',
//    getGoodsInfo:"/Admin/ContentManagement/getGoodsInfo",
    getGoodsInfo:"/Admin/Goods/getGoodsList",
    saveChannelContent:"/Admin/ContentManagement/saveChannelContent"
  };

  function getHrzzInitData(){
    return [
      //banner
      {
        type:"banner",
        data:[]
      },
      //人气单品
      {
        type:"columnList",
        title:"人气单品",
        more:"",
        rows:[
          {
            type:"list",
            column:1,
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
          cmContent:getHrzzInitData()
        },
        previewData:$.extend(true, [], getHrzzInitData())
      }
    },
    computed: {},
    components: {
      BannerTab:BannerTab,
      PopularityTab:PopularityTab,
      CategoryTab:CategoryTab,
      HrzzChannelPreview:HrzzChannelPreview
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
        var thiz = this;
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

        let categorgs= previewData[2].categorys;
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
                          popularGoods[j].imageUrl=goodList[i].picture;

                          if(goodList[i].point && parseInt(goodList[i].point)!=0 ){
                            popularGoods[j].price = goodList[i].price+' 元+ '+goodList[i].point+'积分';
                          }else{
                            popularGoods[j].price= goodList[i].price+' 元';
                          }
                        }
                      }

                      for(let k=0;k<categorgs.length;k++){
                        let category=categorgs[k];
                        for(let j=0;j<category.items.length;j++){
                          if (category.items[j].goodId == goodList[i].goodsID) {
                            category.items[j].imageUrl=goodList[i].picture;

                            if(goodList[i].point && parseInt(goodList[i].point)!=0 ){
                              category.items[j].price = goodList[i].price+' 元+ '+goodList[i].point+'积分';
                            }else{
                              category.items[j].price= goodList[i].price+' 元';
                            }
                          }
                        }
                      }
                    }
                    thiz.previewData=previewData;
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
          if(item.desc.trim()==''  || thiz.getItemLinkTo(item)==''|| item.imageUrl.trim()==''){
            swal("保存失败!", '请补全banner信息！', "warning");
            return false;
          }
        }

        //人气推荐
        let popularTabData=thiz.channel.cmContent[1].rows[0].items;
        for(let i=0;i<popularTabData.length;i++){
          let item=popularTabData[i];
          if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全人气推荐信息！', "warning");
            return false;
          }
        }

        //品类商品
        let categoryTabData=thiz.channel.cmContent[2].categorys;
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
    ready: function () {}
  };
</script>
