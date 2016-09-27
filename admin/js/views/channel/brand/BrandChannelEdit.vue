<style scoped>
  .channel-title{
    margin-bottom: 10px;
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
  }

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
      <h4 class="panel-title">频道编辑-品牌页-{{title}}</h4>
    </div>
    <div class="panel-body">
      <div class="row channel-title">
        <div class="col-md-8 form-inline">
          <div class="form-group">
            <label>频道名称</label>
            <input type="text" class="form-control" v-model="channel.cmName" placeholder="">
          </div>
          <span>不超过10个字符，建议填写品牌名</span>
        </div>
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
                <a href="#baseInfo" aria-controls="baseInfo" role="tab" data-toggle="tab">品牌介绍图</a>
              </li>
              <li role="presentation">
                <a href="#priceSpec" aria-controls="priceSpec" role="tab" data-toggle="tab">人气单品</a>
              </li>
              <li role="presentation">
                <a href="#teletext" aria-controls="teletext" role="tab" data-toggle="tab">并列商品</a>
              </li>

            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="baseInfo">
                <Brand-introduce-tab :introduce-data="channel.cmContent[0]"></Brand-introduce-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="priceSpec">
                <Brand-popularity-tab :popularity-data="channel.cmContent[1]"></Brand-popularity-tab>
              </div>
              <div role="tabpanel" class="tab-pane " id="teletext">
                <Brand-tie-tab :tie-data="channel.cmContent[2]"></Brand-tie-tab>
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
            <Brand-channel-preview :preview-data="previewData"></Brand-channel-preview>
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
  var swal = require('sweetalert');
  import BrandIntroduceTab from './BrandIntroduceTab';
  import BrandPopularityTab from './BrandPopularityTab';
  import BrandTieTab from './BrandTieTab';
  import BrandChannelPreview from './BrandChannelPreview';

  var ajaxUrl={
    getChannelContent:'/Admin/ContentManagement/getChannelContent',
//    getGoodsInfo:"/Admin/ContentManagement/getGoodsInfo",
    getGoodsInfo:"/Admin/Goods/getGoodsList",
    saveChannelContent:"/Admin/ContentManagement/saveChannelContent"
  };

  function getBrandChannelInitData(){
    return [
      //品牌介绍
      {
        type:"banner",
        data:[
          {
            "title": "",//主标题
            "subTitle":"",//副标题
            "desc":"",//描述

            "shareUrl": "",//暂时无用
            "name": "",//暂时无用
            "tips": "",//图片上传提示，只有分类广告跟首页广告用到，后面根据size与weight自动生成
            "src": "",//web端使用，用于回显图片名称，方便养护知道自己上传了什么图

            "hideBtn": false,//是否显示删除按钮
            "type": "0",//0图片（不需要跳转地址linkTo）；1网页；2单品；3模板；4搜索；5自动商品（不需要用户上传图片，自动根据商品id获取图片地址）
//                  "linkTo": "",//如果type是0（图片），则不需要填该属性值
            "imageUrl": "",//图片地址
            "size": {
              "width": 1080,
              "height": 450
            },
            "weight": 70
          }
        ]
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
      //并列单品
      {
        type:"goodsCollects",
        title:"并列单品",
        more:"",
        rows:[
          {
            type:"list",
            column:2,
            items:[

            ]
          }
        ]
      }
    ]
  }

  module.exports = {
    props: {},
    data: function () {
      return {
        title:'',
        //频道数据
        channel:{
          cmId:'',
          cmName:'',
          cmUrl:'',
          cmType:2,
          cmContent:getBrandChannelInitData()
        },
        previewData:$.extend(true,[],getBrandChannelInitData())
      }
    },
    computed: function () {
      return {}
    },
    components: {
      BrandIntroduceTab:BrandIntroduceTab,
      BrandPopularityTab:BrandPopularityTab,
      BrandTieTab:BrandTieTab,
      BrandChannelPreview:BrandChannelPreview
    },
    methods: {
      getBrandChannel: function (cmId) {
        var thiz = this;

        thiz.$http.get(ajaxUrl.getChannelContent, {
          params: {
            cmId:cmId
          }
        }).then(function (response) {
            let data = response.json();
            if (data.code == '0') {
              let channel=data.data;
              channel.cmContent=JSON.parse(channel.cmContent);
              thiz.channel=channel;
            } else {
              swal('获取数据失败', data.msg, 'warning');
            }
          },
          function (response) {
            swal("获取数据失败!", response.json().msg, "warning");
          }
        );
      },
      preview: function () {
        let thiz = this;
        let previewData = $.extend(true,[], this.channel.cmContent);
        let goodIds = [];

        let popularGoods = previewData[1].rows[0].items;
        for (let i = 0; i < popularGoods.length; i++) {
          let goodId = popularGoods[i].linkTo.split('#type=good&goodId=')[1] || "";
          popularGoods[i].goodId = goodId;
          if (goodId != "") {
            goodIds.push(goodId);
          }
        }

        let tieGoods = previewData[2].rows[0].items;
        for (let i = 0; i < tieGoods.length; i++) {
          let goodId = tieGoods[i].linkTo.split('#type=good&goodId=')[1] || "";
          tieGoods[i].goodId = goodId;
          if (goodId != "") {
            goodIds.push(goodId);
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
              let goodItem=goodList[i];

              for (let j = 0; j < popularGoods.length; j++) {
                if (popularGoods[j].goodId == goodItem.goodsID) {
                  popularGoods[j].imageUrl = goodItem.picture;
                  if(goodItem.point && parseInt(goodItem.point)!=0){
                    popularGoods[j].price = goodItem.price+' 元+ '+goodItem.point+'积分';
                  }else{
                    popularGoods[j].price = goodItem.price+' 元';
                  }
                }
              }

              for (let k = 0; k < tieGoods.length; k++) {
                if (tieGoods[k].goodId == goodItem.goodsID) {
                  tieGoods[k].imageUrl = goodItem.picture;

                  if(goodItem.point && parseInt(goodItem.point)!=0){
                    tieGoods[k].price = goodItem.price+' 元+ '+goodItem.point+'积分';
                  }else{
                    tieGoods[k].price = goodItem.price+' 元';
                  }
                }
              }
            }

            thiz.previewData= previewData;
            thiz.$log('previewData');
            $("#myModal").modal();
            return;
          } else {
            swal('预览失败，请重试！', data.msg, 'warning');
          }
        },function (response) {
          swal("预览失败，请重试!", response.json().msg, "warning");
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

        if(thiz.channel.cmName.trim()=='' || thiz.channel.cmName.length>10){
          swal("保存失败!", '请输入不超过10个字符的频道名称！', "warning");
          return false;
        }

        //品牌介绍页
        if(thiz.channel.cmContent[0].data[0].imageUrl.trim()==''){
          swal("保存失败!", '请上传品牌介绍图！', "warning");
          return false;
        }

        //人气单品
        let popularTabDataList=thiz.channel.cmContent[1].rows[0].items;
        for(let i=0;i<popularTabDataList.length;i++){
          let item=popularTabDataList[i];
          if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全人气单品信息！', "warning");
            return false;
          }

        }

        //并列单品
        let tieTabData=thiz.channel.cmContent[2].rows[0].items;
        if((tieTabData.length % 2)!=0){
          swal("保存失败!", '并列单品个数必须为偶数个！', "warning");
          return false;
        }
        for(let i=0;i<tieTabData.length;i++){
          let item=tieTabData[i];
          if(item.title.trim()=='' || item.subTitle.trim()=='' || thiz.getItemLinkTo(item)==''){
            swal("保存失败!", '请补全并列单品信息！', "warning");
            return false;
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
                          'name': 'brandChannelList'
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
        if (transition.to.name == 'brandChannelAdd') {
          this.title = '新增'
        } else {
          this.title = '修改';
          this.getBrandChannel(transition.to.params.channelId);
        }

        transition.next();
      }
    },
    ready: function () {

    }
  };
</script>
