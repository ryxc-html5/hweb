<style scoped>
  .base-info,
  .wl-info{
    padding: 5px 15px;
    border: 1px solid gray;
    margin-bottom: 5px;
  }
  .wl-info .row,
  .base-info .row{
    line-height: 30px;
  }

  .info-title{
    font-size: 20px;
    font-weight: bold;
    line-height: 45px;
  }

  .table .row{
    margin: 0;
  }
</style>

<template>
  <div class="order-detail panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">订单详情</h4>
    </div>
    <div class="panel-body">
      <div class="container-fluid">

        <div class="row">
          <div class="col-md-12">
            <div class="base-info">
              <div class="row">
                <div class="col-md-2">
                  订单编号
                </div>
                <div class="col-md-4">
                  {{order.oId}}
                </div>
                <div class="col-md-2">
                  订单状态
                </div>
                <div class="col-md-4">
                  {{order.oStatus}}
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  订单金额
                </div>
                <div class="col-md-4">
                  {{order.oGoodsTotalPrice}}
                </div>
                <div class="col-md-2">
                  售后状态
                </div>
                <div class="col-md-4">
                  {{order.oAfterStatus}}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="wl-info">
              <div class="row">
                <div class="col-md-12 info-title">
                  收货信息
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">收货人</div><div class="col-md-8">{{order.oId}}</div>
              </div>
              <div class="row">
                <div class="col-md-4">收货人地址</div><div class="col-md-8">{{order.oId}}</div>
              </div>
              <div class="row">
                <div class="col-md-4">收货人电话</div><div class="col-md-8">{{order.oId}}</div>
              </div>
              <div class="row">
                <div class="col-md-4">订单备注</div><div class="col-md-8">{{order.oId}}</div>
              </div>
              <div class="row">
                <div class="col-md-4">发货备注</div><div class="col-md-8">{{order.oId}}</div>
              </div>

              <div class="row">
                <div class="col-md-12 info-title">
                  物流信息
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">物流公司</div><div class="col-md-8">{{order.oId}}</div>
              </div>
              <div class="row">
                <div class="col-md-4">物流单号</div><div class="col-md-8">{{order.oId}}</div>
              </div>

              <div class="row">
                <div class="col-md-12 info-title">
                  发票信息
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">发票类型</div><div class="col-md-8">{{order.oId}}</div>
              </div>
              <div class="row">
                <div class="col-md-4">发票抬头</div><div class="col-md-8">{{order.oId}}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="wl-info">
              <div class="row">
                <div class="col-md-12 info-title">
                  购物清单
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                      <tr>
                        <td class="text-center">商品图</td>
                        <td class="text-center">商品名称</td>
                        <td class="text-center">购买价</td>
                        <td class="text-center">购买数量</td>
                        <td class="text-center">商品小计</td>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in order.goodsList">
                        <td class="text-center">
                          {{item.oiGpPicture}}
                        </td>
                        <td class="text-left">
                          <div class="row">
                            <div class="col-md-12">{{item.oiGname}}</div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">商品编号：{{item.gid}}</div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">规格：{{item.oiSpecName}}</div>
                          </div>

                        </td>
                        <td class="text-right">
                          {{item.oiPrice}}
                        </td>
                        <td class="text-right">
                          {{item.oiNums}}
                        </td>
                        <td class="text-right">
                          {{item.tradePrice}}
                        </td>
                      </tr>
                      </tbody>
                      <tfoot>
                      <tr>
                        <td class="text-right" colspan="5">
                          <div class="row">
                            <div class="col-md-9 text-right">商品金额</div>
                            <div class="col-md-3">{{order.oCostFreight}}</div>
                          </div>
                          <div class="row">
                            <div class="col-md-9 text-right">运费金额</div>
                            <div class="col-md-3">{{order.oCostFreight}}</div>
                          </div>
                          <div class="row">
                            <div class="col-md-9 text-right">订单总金额</div>
                            <div class="col-md-3">{{order.oTotalPrice}}</div>
                          </div>
                          <div class="row">
                            <div class="col-md-9 text-right">支付金额</div>
                            <div class="col-md-3">{{order.oPay}}</div>
                          </div>
                        </td>
                      </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from "./config";
  var $ = require('jquery');
  var swal = require('sweetalert');

  export default{
    data(){
      return {
        order: {
          'oId':'',//订单编号
          'oStatus':'',//订单状态
          'oGoodsTotalPrice':'',//订单金额
          'oAfterStatus':'',//售后状态

          'oReceiverName':'',//收货人
          'oReceiverAddress':'',//收货人地址
          'oReceiverMobile':'',//收货人电话
          'oBuyerComments':'',//订单备注
          'odMemo':'',//发货备注

          'odLogiName':'',//物流公司
          'odLogiNo':'',//物流单号

          'invType':'',//发票类型
          'invNormalTitleType':'',//发票抬头

          'goodsList':[],//商品清单

          'oGoodsTotalPrice':'',//商品金额
          'oCostFreight':'',//运费金额
          'oTotalPrice':'',//订单总金额
          'oPay':'',//已支付金额
        }
      }
    },
    components: {},
    route: {
      data: function (transition) {
        let thiz = this;

        let orderId = transition.to.params.orderId;

        thiz.$http.get(config.ajaxUrl.orderDetail, {
          params: {
            orderId: orderId
          }
        }).then(
          function (response) {
            let data = response.json();
            if (data.code == '0') {
              thiz.order = data.order;
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
