<style scoped>
  .time-iuput {
    width: 45%;
    display: inline-block;
  }

  .calendar.calendar-transition {
    z-index: 1;
  }

  .order-list{
    border-top:3px solid #ddd ;
  }

  .page-btn{
    cursor: pointer;
  }

  .table a{
    cursor: pointer;
  }

  .export-time{
    width: 100px;
  }
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">订单列表</h4>
    </div>
    <div class="panel-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="form-horizontal" role="form">
              <div class="form-group">
                <label class="col-sm-1 control-label">订单编号：</label>
                <div class="col-sm-2">
                  <input v-model="orderId" type="text" class="form-control" placeholder="">
                </div>
                <label class="col-sm-1 control-label">商品名称：</label>
                <div class="col-sm-2">
                  <input v-model="goodName" type="text" class="form-control" placeholder="">
                </div>
                <label class="col-sm-1 control-label">订单状态：</label>
                <div class="col-sm-2">
                  <select v-model="orderStatus" class="form-control" >
                    <option v-for="option in orderStatusList" :value="option.status">{{option.statusText}}</option>
                  </select>
                </div>
                <div class="col-sm-3">
                  <button @click="go(1)" class="btn btn-default">查询</button>
                  <button @click="exportBefore" class="btn btn-default">导出Excel</button>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-1 control-label">会员名称：</label>
                <div class="col-sm-2">
                  <input v-model="vipName" type="text" class="form-control" placeholder="">
                </div>
                <label class="col-sm-1 control-label">收货人：</label>
                <div class="col-sm-2">
                  <input v-model="consignee" type="text" class="form-control" placeholder="">
                </div>
                <label class="col-sm-1 control-label">支付时间：</label>
                <div class="col-sm-4">
                  <input @click.stop="open($event,'startTime')" v-model="calendar.items.startTime.value" type="text"
                         class="form-control time-iuput" placeholder="">
                  ——
                  <input @click.stop="open($event,'endTime')" v-model="calendar.items.endTime.value" type="text"
                         class="form-control time-iuput" placeholder="">
                  <Calendar
                          :show.sync="calendar.show"
                          :type="calendar.type"
                          :value.sync="calendar.value"
                          :x="calendar.x"
                          :y="calendar.y"
                          :begin.sync="calendar.begin"
                          :end.sync="calendar.end"
                          :range.sync="calendar.range"
                          :weeks="calendar.weeks"
                          :months="calendar.months"
                          :sep="calendar.sep">
                  </Calendar>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-1 control-label">历史订单：</label>
                <div class="col-sm-2">
                  <select v-model="hisOrder" class="form-control">
                    <option v-for="option in historyOrder" :value="option.value">{{option.label}}</option>
                  </select>
                </div>
                <label class="col-sm-1 control-label"></label>
                <div class="col-sm-2">

                </div>
                <label class="col-sm-1 control-label">特殊订单</label>
                <div class="col-sm-2">
                  <select v-model="specOrder" class="form-control">
                    <option v-for="option in specialOrder" :value="option.value">{{option.label}}</option>
                  </select>
                </div>
                <label class="col-sm-1 control-label"></label>
                <div class="col-sm-2">

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row order-list">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                <tr>
                  <td class="text-center">
                    <input @change="toggleAllCheck" type="checkbox" v-model="isAllCheck">
                  </td>
                  <td class="text-center">订单编号</td>
                  <td class="text-center">买家ID</td>
                  <td class="text-center">收货人</td>
                  <td class="text-center">电话</td>
                  <td class="text-center">订单金额</td>
                  <td class="text-center">支付金额</td>
                  <td class="text-center">更新时间</td>
                  <td class="text-center">是否需要发票</td>
                  <td class="text-center">订单状态</td>
                  <td class="text-center"></td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in orderList" @click="toggleCheck(item)">
                  <td class="text-center">
                    <input type="checkbox" v-model="item.checked">
                  </td>
                  <td>{{item.oId}}</td>
                  <td>{{item.mId}}</td>
                  <td>{{item.oReceiverName}}</td>
                  <td class="text-center">{{item.oReceiverMobile}}</td>
                  <td class="text-right">{{item.oTotalPrice}}</td>
                  <td class="text-right">{{item.oPay}}</td>
                  <td class="text-center">{{item.oUpdateTime}}</td>
                  <td class="text-center">
                    <span v-if="item.isInvoice==1">是</span><span v-else>否</span>
                  </td>
                  <td class="text-center">{{item.oStatusText}}</td>
                  <td class="text-center">
                    <a @click="detail(item.oId)">查看</a>
                    <a v-if="item.oStatus=='WAIT_SELLER_SEND_GOODS'" @click="sendBefore(item.oId)">发货</a>
                    <a v-if="item.oStatus==2" @click="notice(item.oId)">通知提货</a>
                  </td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                  <td class="text-right" colspan="11">
                    共 {{cPageTotal}} 页 共 {{orderCount}} 记录 <span v-for="pageIndex in pageIndexList" class="page-btn"> <a @click="go(pageIndex)">{{pageIndex}}</a> </span>
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal mid="sendModal" title="发货">
      <div slot="content">
        <div role="form">
          <div class="form-group">
            <label>订单号</label>
            <input v-model="sendOrder.orderId" type="text" class="form-control" readonly>
          </div>
          <div class="form-group">
            <label>物流公司</label>
            <select v-model="sendOrder.odLogiId" class="form-control">
              <option v-for="option in logisticList" :value="option.lcId">{{option.lcName}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>物流号</label>
            <input v-model="sendOrder.odLogiNo" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label>备注信息</label>
            <textarea v-model="sendOrder.odMemo" class="form-control" rows="3"></textarea>
          </div>
        </div>
      </div>
      <button @click="send" slot="btn" type="button" class="btn btn-primary">提 交</button>
    </Modal>
    <Modal mid="exportModal" title="导出">
      <div slot="content">
        <div role="form">
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" value="1" v-model="qType">
              导出最新的1000条订单
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" value="2" v-model="qType">
              导出选定日期内的前1000条订单
            </label>
            <input @click.stop="open($event,'oPayTimeStart','show2')" v-model="calendar.items.oPayTimeStart.value" type="text"
                   class="form-control time-iuput export-time" placeholder="">
            ——
            <input @click.stop="open($event,'oPayTimeEnd','show2')" v-model="calendar.items.oPayTimeEnd.value" type="text"
                   class="form-control time-iuput export-time" placeholder="">
            <Calendar
                    :show.sync="calendar.show2"
                    :type="calendar.type"
                    :value.sync="calendar.value"
                    :x="calendar.x"
                    :y="calendar.y"
                    :begin.sync="calendar.begin"
                    :end.sync="calendar.end"
                    :range.sync="calendar.range"
                    :weeks="calendar.weeks"
                    :months="calendar.months"
                    :sep="calendar.sep">
            </Calendar>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" value="3" v-model="qType">
              导出查询结果的前1000条订单
            </label>
          </div>
          <div class="radio">
            <label>
              <input type="radio" name="optionsRadios" value="4" v-model="qType">
              导出选中的订单
            </label>
          </div>
        </div>
        <div v-if="downloadUrl!=''" class="text-center">
          <a :href="downloadUrl">点击链接下载</a>
        </div>
      </div>
      <button @click="exportData" slot="btn" type="button" class="btn btn-primary">导 出</button>
    </Modal>
  </div>
</template>

<script>
  import Calendar from "../../../../common/js/components/Calendar";
  import config from "./config";
  import Modal from "./Modal";
  var $ = require('jquery');
  var swal = require('sweetalert');

  export default {
    data() {
      return {
        orderId:"",//订单编号
        goodName:"",//商品名称
        orderStatus:"",//订单状态
        vipName:"",//vip名称
        consignee:"",//收货人
        startTime:"",//支付开始时间
        endTime:"",//支付结束时间
        hisOrder:"0",//历史订单
        specOrder:"0",//特殊订单
        orderStatusList: [],//订单状态列表
        specialOrder: config.specialOrder,//特殊订单列表
        historyOrder: config.historyOrder,//历史订单列表
        logisticList:[],//物流公司列表

        page:1,//页码
        pageSize:30,//每页记录条数
        // 数据绑定
        calendar: {
          show: false,
          show2:false,
          x: 0,
          y: 0,
          picker: "",
          type: "date",
          value: "",
          begin: "",
          end: "",
          sep: "/",
          weeks: [],
          months: [],
          range: false,
          items: {
            // 日期模式
            startTime: {
              type: "date",
              value: "",
              sep: ".",
            },
            // 日期模式
            endTime: {
              type: "date",
              value: "",
              sep: ".",
            },
            // 日期模式
            oPayTimeStart: {
              type: "date",
              value: "",
              sep: "-",
            },
            oPayTimeEnd: {
              type: "date",
              value: "",
              sep: "-",
            }
          }
        },

        isAllCheck:false,
        orderCount:0,
        orderList:[],
        pageIndexList:[1],

        sendOrder:{
          orderId:"",
          odLogiId:"",
          odLogiNo:"",
          odMemo:""
        },

        qType:"1",
        oPayTimeStart:"",
        oPayTimeEnd:"",

        downloadUrl:'',
      }
    },
    computed:{
      cPageTotal:{
        get:function () {
          return Math.ceil(this.orderCount/this.pageSize);
        }
      }
    },
    components: {
      Calendar: Calendar,
      Modal:Modal
    },
    // 处理值的传递
    watch: {
      'calendar.value': function (value) {
        this.calendar.items[this.calendar.picker].value = value;
        this[this.calendar.picker]=value;
      }
    },
    methods: {
      // 打开显示选择器
      open(e, type,item) {
        // 设置类型
        this.calendar.picker = type;
        this.calendar.type = this.calendar.items[type].type;
        this.calendar.range = this.calendar.items[type].range;
        this.calendar.begin = this.calendar.items[type].begin;
        this.calendar.end = this.calendar.items[type].end;
        this.calendar.value = this.calendar.items[type].value;
        // 可不用写
        this.calendar.sep = this.calendar.items[type].sep;
        this.calendar.weeks = this.calendar.items[type].weeks;
        this.calendar.months = this.calendar.items[type].months;

        if(item){
          this.calendar[item] = true;
        }else{
          this.calendar.show = true;
        }
        this.calendar.x = e.target.offsetLeft;
        this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8
      },
      /**
       * 返回页码数组
       * @param currentPage 当前页号
       * @param totalPage 总页数
       * @param length 获取页码数
       * @returns {Array}
       */
      getPageIndexs:function(currentPage,totalPage,length){

        var limit=Math.floor(length/2);
        var startPage=currentPage-limit;

        if(startPage<=0){
          startPage=1;
        }


        var offset;
        if(totalPage-currentPage<limit){
          offset=limit-(totalPage-currentPage);
          startPage=(startPage-offset)>0?(startPage-offset):1;
        }

        var pageIndexs=[];
        for(var i=startPage;i<(startPage+length);i++){
          if(i<=totalPage){
            pageIndexs.push(i);
          }
        }

        return pageIndexs;
      },
      /**
       * 跟订单列表数据添加一个是否选中的标志位
       * @param list
       */
      addFlag:function (list) {
        for(let i=0;i<list.length;i++){
          list[i].checked=false;
        }
        return list;
      },
      /**
       *
       * @param pageIndex
       */
      go:function(pageIndex){
        var thiz=this;
        thiz.page=pageIndex;
        thiz.$http.get(config.ajaxUrl.orderList, {params: {
          gName:thiz.goodName,
          mName:thiz.vipName,
          oHistory:thiz.hisOrder,
          orderId:thiz.orderId,
          oPayTimeStart:thiz.startTime,
          oPayTimeEnd:thiz.endTime,
          oReceiverName:thiz.consignee,
          oSpecial:thiz.specOrder,
          oStatus:thiz.orderStatus,
          page:thiz.page,
          pageSize:thiz.pageSize
        }}).then(
                function (response) {
                  let data = response.json();
                  if (data.code == '0') {
                    thiz.orderCount=data.data.orderCount;
                    thiz.orderList=thiz.addFlag(data.data.orderList);
                    thiz.pageIndexList=thiz.getPageIndexs(thiz.page,thiz.cPageTotal,5);
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
       * 切换订单的选中状态
       * @param item
       */
      toggleCheck:function (item) {
        item.checked=!item.checked;
      },
      /**
       * 切换全选
       */
      toggleAllCheck:function () {
        for(let i=0;i<this.orderList.length;i++){
          this.orderList[i].checked=this.isAllCheck;
        }
      },
      /**
       * 跳转详情页面
       *
       */
      detail:function (orderId) {
        this.$route.router.go({
          'name': 'orderDetail',
          'params':{
            orderId:orderId
          }
        });
      },
      /**
       * 准备发货
       */
      sendBefore:function (orderId) {
        this.sendOrder.orderId=orderId;
        $("#sendModal").modal();
        return;
      },
      /**
       * 通知提货
       */
      notice:function (orderId) {
        var thiz=this;
        thiz.$http.post(config.ajaxUrl.noticeOrder, {orderId:orderId}).then(
          function (response) {
            let data = response.json();
            if (data.code == "0") {
              swal("通知成功", "", "success");
              thiz.go(thiz.page);
            } else {
              swal("通知失败!", data.msg, "warning");
            }
          },
          function (response) {
            swal("通知失败!", response.json().msg, "warning");
          }
        );
      },
      /**
       * 发货
       * @returns {boolean}
       */
      send:function () {
        var thiz=this;

        thiz.sendOrder.orderId=thiz.sendOrder.orderId.toString().trim();
        thiz.sendOrder.odLogiId=thiz.sendOrder.odLogiId.toString().trim();
        thiz.sendOrder.odLogiNo=thiz.sendOrder.odLogiNo.trim();
        thiz.sendOrder.odMemo=thiz.sendOrder.odMemo.trim();

        if(thiz.sendOrder.orderId==''){
          swal("请选择订单！", "", "error");
          return false
        }

        if(thiz.sendOrder.odLogiId==''){
          swal("请选择物流公司！", "", "error");
          return false
        }

        if(thiz.sendOrder.odLogiNo==''){
          swal("请输入物流编号！", "", "error");
          return false
        }


        thiz.$http.post(config.ajaxUrl.sendOrder, thiz.sendOrder).then(
          function (response) {
            let data = response.json();
            if (data.code == "0") {
              swal("提交成功", "", "success");

              $('#sendModal').modal('hide');

              thiz.sendOrder = {
                orderId: "",
                odLogiId: "",
                odLogiNo: "",
                odMemo: ""
              };

              thiz.go(thiz.page);

            } else {
              swal("发货失败!", data.msg, "warning");
            }
          },
          function (response) {
            swal("发货失败!", response.json().msg, "warning");
          }
        );
      },
      /**
       * 导出按钮事件处理函数
       */
      exportBefore:function () {
        $("#exportModal").modal();
        return;
      },
      /**
       * 导出数据
       */
      exportData:function () {
        let thiz=this;

        if(thiz.qType=="1"){

        }else if(thiz.qType=="2"){

        }else if(thiz.qType=="3"){

        }else{

        }

        let orderIds=[];
        for(let i=0;i<thiz.orderList.length;i++){
          thiz.orderList[i].checked && orderIds.push(thiz.orderList[i].oId);
        }

        let params={
          gName:thiz.goodName,
          mName:thiz.vipName,
          oHistory:thiz.hisOrder,
          orderId:orderIds.join(","),
          oPayTimeStart:thiz.oPayTimeStart,
          oPayTimeEnd:thiz.oPayTimeEnd,
          oReceiverName:thiz.consignee,
          oSpecial:thiz.specOrder,
          oStatus:thiz.orderStatus,
          qType:thiz.qType
        };

        thiz.$http.get(config.ajaxUrl.exportOrder, {params: params}).then(
          function (response) {
            let data = response.json();
            if (data.code == '0') {
              thiz.downloadUrl=data.data;
            } else {
              swal('导出失败', data.msg, 'warning');
            }
          },
          function (response) {
            swal("导出失败!", response.json().msg, "warning");
          }
        );
      }
    },
    created(){
      var thiz = this;
      thiz.$http.get(config.ajaxUrl.logisticList, {params: {}}).then(
        function (response) {
          let data = response.json();
          if (data.code == '0') {
            thiz.logisticList=data.data.logisticList;
          } else {
            swal('获取数据失败', data.msg, 'warning');
          }
        },
        function (response) {
          swal("获取数据失败!", response.json().msg, "warning");
        }
      );

      thiz.$http.get(config.ajaxUrl.orderStatusList, {params: {}}).then(
        function (response) {
          let data = response.json();
          if (data.code == '0') {
            thiz.orderStatusList=data.data.statusList;
          } else {
            swal('获取数据失败', data.msg, 'warning');
          }
        },
        function (response) {
          swal("获取数据失败!", response.json().msg, "warning");
        }
      );
    },
    ready(){
      var thiz=this;
      $('#sendModal').on('hidden.bs.modal', function (e) {
        thiz.sendOrder = {
          orderId: "",
          odLogiId: "",
          odLogiNo: "",
          odMemo: ""
        }
      });

      $('#exportModal').on('hidden.bs.modal', function (e) {
        thiz.downloadUrl="";
      })
    },
    route:{
      data:function (transition) {
        let thiz=this;
        thiz.$http.get(config.ajaxUrl.orderList, {params: {
          gName:thiz.goodName,
          mName:thiz.vipName,
          oHistory:thiz.hisOrder,
          orderId:thiz.orderId,
          oPayTimeStart:thiz.startTime,
          oPayTimeEnd:thiz.endTime,
          oReceiverName:thiz.consignee,
          oSpecial:thiz.specOrder,
          oStatus:thiz.orderStatus,
          page:thiz.page,
          pageSize:thiz.pageSize
        }}).then(
          function (response) {
            let data = response.json();
            if (data.code == '0') {
              thiz.orderCount=data.data.orderCount;
              thiz.orderList=thiz.addFlag(data.data.orderList);
              thiz.pageIndexList=thiz.getPageIndexs(thiz.page,thiz.cPageTotal,5);
              transition.next();
            } else {
              swal('获取数据失败', data.msg, 'warning');
            }
          },
          function (response) {
            swal("获取数据失败!", response.json().msg, "warning");
          }
        );


      }
    }
  }
</script>