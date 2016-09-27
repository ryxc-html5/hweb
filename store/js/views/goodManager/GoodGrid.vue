/*
 * 商品管理-商品列表-列表单元
 **/
<style scoped>
    .goodGrid {
        margin-bottom: 0;
    }
    .goodGrid .table {
        margin-bottom: 5px;
    }
    .goodGrid .pagination {
        margin: 0;
        float: right;
    }
    .goodGrid .pagination li{
        cursor: pointer;
    }
</style>

<template>
    <div class="panel panel-default goodGrid">
        <div class="panel-heading">
            <div class="form-inline">
                <button @click="addGood" class="btn btn-info btn-sm">新增商品</button>
                <select class="form-control input-sm" v-model="cField">
                    <option value="g_name">商品名称</option>
                    <option value="g_sn">商品编码</option>
                </select>
                <input class="form-control input-sm" type="text" v-model="cKeyWord">
                <button @click="getList" class="btn btn-default btn-sm">搜 索</button>
            </div>
        </div>
        <div class="panel-body" v-show="goodGridData.datas.length">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover table-condensed">
                        <thead>
                        <tr>
                            <td class="text-center"><input type="checkbox"/></td>
                            <td class="text-center">操作</td>
                            <td class="text-center">序号</td>
                            <td class="text-center">编码</td>
                            <td class="text-center">名称</td>
                            <td class="text-center">类目</td>
                            <td class="text-center">类型</td>
                            <td class="text-center">销售价</td>
                            <td class="text-center">更新时间</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="good in goodGridData.datas" :goodId="good.goodId">
                            <td class="text-center"><input name="dataList" type="checkbox"/></td>
                            <td class="text-center">
                                <a @click="putaway" v-if="type=='unPublished'" class="" style="cursor:pointer;">上架</a>
                                <a @click="outStock" v-if="type=='published'" class="" style="cursor:pointer;">下架</a>
                                <a v-link="{name: 'goodDeployEdit', params: {typeId: good.typeId, goodId: good.goodId}}">编辑</a>
                                
                            </td>
                            <td class="text-center">{{good.goodId}}</td>
                            <td class="text-center">{{good.goodCode}}</td>
                            <td class="text-center">{{good.goodName}}</td>
                            <td class="text-center">{{good.category}}</td>
                            <td class="text-center">{{good.goodType}}</td>
                            <td class="text-center">{{good.price}}</td>
                            <td class="text-center">{{good.updateTime}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul class="pagination">
                        <li>
                            <a @click="go" targetIndex="pre" aria-label="Previous"><span
                                    aria-hidden="true">&laquo;</span></a>
                        </li>
                        <li v-for="index in goodGridData.pageIndex"
                            class="{{ (index==goodGridData.currentPage) ? 'active' : '' }}">
                            <a @click="go" targetIndex={{index}}>{{index}}</a>
                        </li>
                        <li>
                            <a @click="go" targetIndex="next" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                        </li>
                    </ul>
                </nav>
        </div>
    </div>
</template>

<script>
    import store from '../../store/store'
    import * as  acction from '../../actions/actions'
    import $ from 'jquery';

    var ajaxUrl = {
        getData: "/Ucenter/ShopGoods/getShopGoodsList",
        goodStatusUpdate: "/Ucenter/ShopGoods/updateGoodsStatus"
    };

    module.exports = {
        props: {
            type: String //published or unPublished
        },
        data: function () {
            if (this.type == 'published') {
                return {
                    goodGridData: this.$select('goods.publishedGoodData as goodGridData'),
                    tabs: 'website',
                    loads: 0
                }
            } else {
                return {
                    goodGridData: this.$select('goods.notPublishedGoodData as goodGridData'),
                    tabs: 'shelves',
                    loads: 0
                }
            }
        },
        computed: {
            cField: {
                get: function () {
                    return this.goodGridData.field
                },
                set: function (val) {
                    if (this.type == 'published'){
                        store.dispatch(acction.setPublishedField(val));
                    }else{
                        store.dispatch(acction.setNotPublishedField(val));
                    }
                }
            },
            cKeyWord: {
                get: function () {
                    return this.goodGridData.keyWord;
                },
                set: function (val) {
                    if (this.type == 'published'){
                        store.dispatch(acction.setPublishedKeyWord(val));
                    }else{
                        store.dispatch(acction.setNotPublishedKeyWord(val));
                    }
                }
            }
        },
        components: {},
        methods: {
            addGood: function () {
                this.$route.router.go({'name':'goodTypeChoice'});
            },
            //下架
            outStock: function (e) {
                var goodId=$(e.target).closest("tr").attr("goodId") ;
                var data={
                    data:goodId,
                    type:"2"
                };
                var thiz = this;
                $.ajax({
                    url: ajaxUrl.goodStatusUpdate,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    beforeSend: function() {
                        hrtCommon.showLoading(true);
                    }
                }).done(function (data) {
                    if (data.code == '0') {
                        // swal('下架成功', data.msg, 'success');
                        // thiz.getList();
                        swal({
                            title: "下架成功",
                            type: "success"
                        }, function () {
                            thiz.getList();
                        });
                    } else {
                        swal('下架失败', data.msg, 'warning');
                    }
                }).fail(function (xhr, exception) {
                    hrtCommon.ajaxFail(xhr, exception, '下架失败');
                }).always(function () {
                    hrtCommon.hideLoading(true);
                });
            },
            //上架
            putaway: function (e) {
                var goodId=$(e.target).closest("tr").attr("goodId") ;
                var data={
                    data:goodId,
                    type:"1"
                };
                var thiz = this;
                $.ajax({
                    url: ajaxUrl.goodStatusUpdate,
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                    beforeSend: function() {
                        hrtCommon.showLoading(true);
                    }
                }).done(function (data) {
                    if (data.code == '0') {
                        // swal('上架成功', data.msg, 'success');
                        // thiz.getList();
                        swal({
                            title: "上架成功",
                            type: "success"
                        }, function () {
                            thiz.getList();
                        });
                    } else {
                        swal('上架失败', data.msg, 'warning');
                    }
                }).fail(function (xhr, exception) {
                    hrtCommon.ajaxFail(xhr, exception, '上架失败');
                }).always(function () {
                    hrtCommon.hideLoading(true);
                });
            },
            go: function (e) {
                var $this = $(e.currentTarget);
                var tartgetIndex = $this.attr("targetIndex");
                switch (tartgetIndex) {
                    case 'pre':
                        if (this.goodGridData.currentPage == 1) {
                            return;
                        } else {
                            if (this.type == 'published'){
                                store.dispatch(acction.setPublishedCurrentPage(this.goodGridData.currentPage - 1));
                            }else{
                                store.dispatch(acction.setNotPublishedCurrentPage(this.goodGridData.currentPage - 1));
                            }
                        }
                        break;
                    case 'next':
                        if (this.goodGridData.currentPage == this.goodGridData.pageCount) {
                            return;
                        } else {
                            if (this.type == 'published'){
                                store.dispatch(acction.setPublishedCurrentPage(this.goodGridData.currentPage + 1));
                            }else{
                                store.dispatch(acction.setNotPublishedCurrentPage(this.goodGridData.currentPage + 1));

                            }
                        }
                        break;
                    default:
                        if (this.type == 'published'){
                            store.dispatch(acction.setPublishedCurrentPage(parseInt(tartgetIndex)));

                        }else{
                            store.dispatch(acction.setNotPublishedCurrentPage(parseInt(tartgetIndex)));
                        }
                }

                this.getList();
            },
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
            getList: function ( ) {
                var thiz = this;
                var dada={
                        field: thiz.goodGridData.field,
                        val: thiz.goodGridData.keyWord,
                        currentPage: thiz.goodGridData.currentPage,
                        pageSize: thiz.goodGridData.pageSize,
                        tabs: thiz.tabs,
                        search:'easy'
                    };
                    console.log(dada);
                $.ajax({
                    url: ajaxUrl.getData,
                    type: 'GET',
                    data: {
                        field: thiz.goodGridData.field,
                        val: thiz.goodGridData.keyWord,
                        currentPage: thiz.goodGridData.currentPage,
                        pageSize: thiz.goodGridData.pageSize,
                        tabs: thiz.tabs,
                        search:'easy'
                    },
                    dataType: 'json',
                    beforeSend: function() {
                      if (thiz.type == 'published') {
                        if (!thiz.loads) {
                          hrtCommon.showLoading();
                        } else {
                          hrtCommon.showLoading(true);
                        }
                      } else {
                        if (thiz.loads) {
                          hrtCommon.showLoading(true);
                        }
                      }
                    }
                }).done(function (data) {
                    if (data.code == '0') {
                        var pageIndex=thiz.getPageIndexs(thiz.goodGridData.currentPage,data.data.pageCount,5);

                        if (thiz.type == 'published'){
                            store.dispatch(acction.setPublishedPageGoods({
                                datas: data.data.data,
                                pageCount: data.data.pageCount,
                                totalCount: data.data.totalCount,
                                pageIndex: pageIndex
                            }));

                        }else{
                            store.dispatch(acction.setNotPublishedPageGoods({
                                datas: data.data.data,
                                pageCount: data.data.pageCount,
                                totalCount: data.data.totalCount,
                                pageIndex: pageIndex
                            }));
                        }

                    } else {
                        swal('获取数据失败', data.msg, 'warning');
                    }
                }).fail(function (xhr, exception) {
                    hrtCommon.ajaxFail(xhr, exception, '获取数据失败');
                }).always(function () {
                  if (thiz.type == 'published') {
                    if (!thiz.loads) {
                      hrtCommon.hideLoading();
                    } else {
                      hrtCommon.hideLoading(true);
                    }
                  } else {
                    if (thiz.loads) {
                      hrtCommon.hideLoading(true);
                    }
                  }
                  thiz.loads = 1;
                });
            }
        },
        ready: function () {
            this.getList();
        }
    }
</script>
