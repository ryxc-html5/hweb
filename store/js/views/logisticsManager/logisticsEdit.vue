<style lang="less" scoped>
</style>

<template>
  <div class="panel panel-info">
    <div class="panel-heading">
      <h4 class="panel-title">新增运费模板</h4>
    </div>
    <div class="panel-body">
      <div class="form-horizontal">
        <div class="form-group">
          <label for="ltName" class="col-sm-2 control-label">模板名称</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="ltName" v-model="ltName" maxLength="50">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">计价方式</label>
          <div class="col-sm-10">
            <label class="radio-inline">
              <input type="radio" name="ltPriceMethod" :value="0" v-model="ltPriceMethod"> 按件数
            </label>
            <label class="radio-inline">
              <input type="radio" name="ltPriceMethod" :value="1" v-model="ltPriceMethod"> 按重量
            </label>
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">运送方式</label>
          <div class="col-sm-10">
            <template v-for="item in lmList">
              <div class="checkbox">
                <label>
                  <input type="checkbox" name="lmId{{ item.lmId }}" v-model="item.show"> {{ item.lmName }}
                </label>
              </div>
              <logistics-edit-temp :lm-data="item" :lt-price-method="ltPriceMethod"></logistics-edit-temp>
            </template>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-10 col-sm-offset-2">
            <button type="submit" class="btn btn-primary" @click.prevent="save" data-loading-text="Loading..." autocomplete="off">保 存</button>
            <button class="btn btn-danger" @click="reset">取 消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from './config';
  import logisticsEditTemp from './logisticsEditTemp';

  var ltInitData = {
    ltId: '', //模板id
    ltName: '', //模板名称
    ltPriceMethod: -1,  //计价方式
    ltSort: 0,  //排序
    shopId: 0, //店铺id
    distList: [ //运送方式list
      // {
      //   crId: [], //区域id
      //   ldId: 0,  //id
      //   lmId: 0,  //运送方式id
      //   ldRegion: '', //配送区域
      //   ldFirst: '',  //首件/首重
      //   ldFirstPrice: '', //首费
      //   ldSecond: '', //续件/续重
      //   ldSecondPrice: '' //续费
      // }
    ],
    lmList: [
      // {
      //   lmId: 1,
      //   lmName: '快递',
      //   lmData: [],
      //   show: false
      // },
      // {
      //   lmId: 2,
      //   lmName: 'EMS',
      //   lmData: [],
      //   show: false
      // },
      // {
      //   lmId: 3,
      //   lmName: '平邮',
      //   lmData: [],
      //   show: false
      // }
    ]
  };

  module.exports = {
    data() {
      return $.extend(true, {}, ltInitData);
    },
    components: {
      logisticsEditTemp
    },
    route: {
      data(transition) {
        if (transition.to.name == 'logisticsEdit') {  //编辑时
          $.ajax({
            url: config.ajaxUrl.getLt,
            type: 'GET',
            dataType: 'json',
            data: {
              ltId: transition.to.params.ltId
            },
            beforeSend() {
              hrtCommon.showLoading();
            }
          }).done((data) => {
            if (data.code == '0') {
              data.data.lmList.forEach((item) => {
                item.lmData = [];
                item.show = false;
              });
              data.data.distList.forEach((item) => {
                data.data.lmList.forEach((lm) => {
                  if (item.lmId == lm.lmId) {
                    lm.lmData.push(item);
                    lm.show = true;
                  }
                });
              });
              this.$data = data.data;
              ltInitData = $.extend(true, {}, this.$data);
              transition.next();
            } else {
              swal('读取失败', data.msg, 'warning');
              transition.abort();
            }
          }).fail((xhr, exception) => {
            hrtCommon.ajaxFail(xhr, exception, '读取失败');
            transition.abort();
          }).always(() => {
            hrtCommon.hideLoading();
          });

          // if (this.distList.length) {
          //   this.distList.forEach((item) => {
          //     this.lmList.forEach((lm) => {
          //       if (item.lmId == lm.lmId) {
          //         lm.lmData.push(item);
          //         lm.show = true;
          //       }
          //     });
          //   });
          //   ltInitData = $.extend(true, {}, this.$data);
          // }
        } else {  //新增时
          $.ajax({
            url: config.ajaxUrl.getLmList,
            type: 'GET',
            dataType: 'json',
            beforeSend() {
              hrtCommon.showLoading();
            }
          }).done((data) => {
            if (data.code == '0') {
              data.data.forEach((item) => {
                item.lmData = [];
                item.show = false;
              });
              this.lmList = data.data;
              ltInitData = $.extend(true, {}, this.$data);
              transition.next();
            } else {
              swal('读取失败', data.msg, 'warning');
              transition.abort();
            }
          }).fail((xhr, exception) => {
            hrtCommon.ajaxFail(xhr, exception, '读取失败');
            transition.abort();
          }).always(() => {
            hrtCommon.hideLoading();
          });
        }
      }
    },
    methods: {
      save(e) {
        if (!$.trim(this.ltName)) {
          swal('保存失败', '请填写模板名称', 'warning');
          return false;
        }
        if (this.ltPriceMethod < 0) {
          swal('保存失败', '请选择计价方式', 'warning');
          return false;
        }
        var ltMethod = false;
        this.distList = [];
        for (let i = 0, l = this.lmList.length; i < l; i++) {
          let item = this.lmList[i];
          if (item.show) {
            ltMethod = true;
            if (item.lmData.length) {
              this.distList = this.distList.concat(item.lmData);
            }
          }
        }
        if (!ltMethod || !this.distList.length) {
          swal('保存失败', '请设置运送方式', 'warning');
          return false;
        }
        var valid = hrtCommon.validate;
        for (let i = 0, l = this.distList.length; i < l; i++) {
          let item = this.distList[i];
          if (!item.ldRegion || !$.trim(item.ldFirst) || !valid.int(item.ldFirst) || !valid.price(item.ldFirstPrice) || !$.trim(item.ldSecond) || !valid.int(item.ldSecond) || !valid.price(item.ldSecondPrice)) {
            swal('保存失败', '请正确设置运送方式', 'warning');
            return false;
          }
        }

        var saveData = {
          ltName: this.ltName,
          ltPriceMethod: this.ltPriceMethod,
          logisDistrInfo: this.distList
        };
        if (this.ltId != '') {
          //
        }
        console.log(this.$data, saveData);
        var $this = $(e.target);
        swal({
          title: "是否确定保存并发布？",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确认",
          cancelButtonText: "取消"
        }, () => {
          $.ajax({
            url: config.ajaxUrl.saveLt,
            type: 'POST',
            dataType: 'json',
            data: saveData,
            beforeSend() {
              $this.button('loading');
              hrtCommon.showLoading(true);
            }
          }).done((data) => {
            if (data.code == '0') {
              swal({
                title: '保存成功',
                type: 'success'
              }, () => {
                this.$route.router.go({
                  name: 'logisticsList'
                });
              });
            } else {
              swal('保存失败', data.msg, 'warning');
              transition.abort();
            }
          }).fail((xhr, exception) => {
            hrtCommon.ajaxFail(xhr, exception, '保存失败');
          }).always(() => {
            $this.button('reset');
            hrtCommon.hideLoading(true);
          });
        });
      },
      reset() {
        swal({
          title: '确定要取消模板编辑吗？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }, () => {
          this.$data = $.extend(true, {}, ltInitData);
        });
      }
    }
  }
</script>
