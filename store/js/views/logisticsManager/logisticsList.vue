/*
 * 店铺管理-物流设置单元
 * lxw
 * 2016-09-12
 **/
<style lang="less" scoped>
  .main-thead {
    margin-bottom: 15px;
  }
  .main-tbody {
    > .panel:last-child {
      margin-bottom: 10px;
    }
    .btn-link {
      padding-right: 5px;
      cursor: pointer;
    }
  }
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">物流设置</h4>
    </div>
    <div class="panel-body">
      <div class="main-thead">
        <a class="btn btn-info" @click="addLT">新增运费模板</a>
      </div>
      <div class="main-tbody">
        <div class="panel panel-default" v-for="(index, item) in ltList">
          <div class="panel-heading">
            <div class="row">
              <div class="col-sm-3">模板名称：{{ item.ltName }}</div>
              <div class="col-sm-2">
                <label class="radio-inline">
                  <input type="radio" name="defaultId" :value="item.ltId" v-model="defaultId" @change="setLT(item.ltId, index)"> 设为默认
                </label>
              </div>
              <div class="col-sm-5 text-right">最后修改时间：{{ item.ltUpdateTime }}</div>
              <div class="col-sm-2 text-right">
                <a class="btn-link" @click="editLT(item.ltId)">编辑</a>
                <a class="btn-link" @click="delLT(item.ltId, index)">删除</a>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table table-bordered table-hover text-center">
              <thead>
                <tr>
                  <td>运送方式</td>
                  <td>运送到</td>
                  <td>{{ item.ltPriceMethod == 1 ? '首重(kg)' : '首件' }}</td>
                  <td>运费</td>
                  <td>{{ item.ltPriceMethod == 1 ? '续重(kg)' : '续件' }}</td>
                  <td>续费</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cell in item.ldData">
                  <td>{{ cell.lmName }}</td>
                  <td>{{ cell.ldRegion }}</td>
                  <td>{{ cell.ldFirst }}</td>
                  <td>{{ cell.ldFirstPrice | price }}</td>
                  <td>{{ cell.ldSecond }}</td>
                  <td>{{ cell.ldSecondPrice | price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from './config';

  module.exports = {
    data() {
      return {
        ltList: [
          // {
          //   ltId: 88, //模板ID
          //   ltName: '模板名称', //模板名称
          //   ltPriceMethod: 0, //计价方式，0按件数 1按重量
          //   ltUpdateTime: '2015-09-16 11:01:35',  //最后修改时间
          //   ltUsing: 1, //是否启用，1启用 0禁用
          //   ldData: [ //配送方案列表
          //     {
          //       ldId: 0,  //配送方案ID
          //       crId: [], //地区ID
          //       ldRegion: '全国', //配送区域
          //       ldFirst: '1', //首件
          //       ldFirstPrice: 15.00,  //首费
          //       ldSecond: '1',  //续件
          //       ldSecondPrice: 5.00,  //续费
          //       lmName: 'EMS' //运送方式名
          //     },
          //     {
          //       crId: [],
          //       ldRegion: '广东，广西',
          //       ldFirst: '1',
          //       ldFirstPrice: 15.00,
          //       ldSecond: '1',
          //       ldSecondPrice: 5.00,
          //       lmName: 'EMS'
          //     }
          //   ]
          // }
        ]
      }
    },
    computed: {
      defaultId() {
        var id = '';
        if (this.ltList.length) {
          this.ltList.forEach((item) => {
            if (item.ltUsing) {
              id = item.ltId;
            }
          });
        }
        return id;
      }
    },
    methods: {
      addLT() {
        this.$route.router.go({
          name: 'logisticsAdd'
        });
      },
      editLT(id) {
        this.$route.router.go({
          name: 'logisticsEdit',
          params: {ltId: id}
        });
      },
      delLT(id, index) {
        swal({
          title: '确定要删除模板' + this.ltList[index].ltName + '吗？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }, () => {
          $.ajax({
            url: config.ajaxUrl.delLt,
            type: 'POST',
            data: {
              ltId: id
            },
            dataType: 'json',
            beforeSend() {
              hrtCommon.showLoading(true);
            }
          }).done((data) => {
            if (data.code == '0') {
              this.ltList.splice(index, 1);
              swal('删除成功', '', 'success');
            } else {
              swal('删除失败', data.msg, 'warning');
            }
          }).fail((xhr, exception) => {
            hrtCommon.ajaxFail(xhr, exception, '删除失败');
          }).always(() => {
            hrtCommon.hideLoading(true);
          });
        });
      },
      setLT(id, index) {
        swal({
          title: '确定要将模板' + this.ltList[index].ltName + '设为默认吗？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }, () => {
          $.ajax({
            url: config.ajaxUrl.setLt,
            type: 'POST',
            data: {
              ltId: id
            },
            dataType: 'json',
            beforeSend() {
              hrtCommon.showLoading(true);
            }
          }).done((data) => {
            if (data.code == '0') {
              swal('设置成功', '', 'success');
            } else {
              swal('设置失败', data.msg, 'warning');
            }
          }).fail((xhr, exception) => {
            hrtCommon.ajaxFail(xhr, exception, '设置失败');
          }).always(() => {
            hrtCommon.hideLoading(true);
          });
        });
      }
    },
    ready() {
      return;

      $.ajax({
        url: config.ajaxUrl.getLtList,
        type: 'GET',
        dataType: 'json',
        beforeSend() {
          hrtCommon.showLoading();
        }
      }).done((data) => {
        if (data.code == '0') {
          this.ltList = data.data;
        } else {
          swal('读取失败', data.msg, 'warning');
        }
      }).fail((xhr, exception) => {
        hrtCommon.ajaxFail(xhr, exception, '读取失败');
      }).always(() => {
        hrtCommon.hideLoading();
      });
    }
  }
</script>
