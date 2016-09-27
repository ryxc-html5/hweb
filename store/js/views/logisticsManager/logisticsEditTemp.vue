<style lang="less" scoped>
  .panel {
    margin-top: 10px;
    margin-bottom: 10px;
    td {
      vertical-align: middle;
      > .form-control {
        width: 100px;
        margin: 0 auto;
      }
    }
  }
  .btn-link {
    cursor: pointer;
  }
  .city-thead {
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    > .btn-link {
      padding-left: 4px;
      padding-right: 4px;
    }
  }
  .city-tbody {
    max-height: 300px;
    overflow: auto;
    .city-items {
      padding-top: 5px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      .city-item:not(:last-child) {
        padding-bottom: 10px;
        margin-bottom: 5px;
        border-bottom: 1px dashed #ccc;
      }
      .city-row {
        padding-left: 1em;
      }
    }
  }
</style>

<template>
  <div class="panel panel-default" v-show="lmData.show">
    <div class="panel-body">
      <table class="table table-bordered table-hover text-center">
        <thead>
          <tr>
            <td>运送到</td>
            <td>{{ ltPriceMethod == 1 ? '首重(kg)' : '首件' }}</td>
            <td>首费</td>
            <td>{{ ltPriceMethod == 1 ? '续重(kg)' : '续件' }}</td>
            <td>续费</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lmData.lmData">
            <td>{{ item.ldRegion }}</td>
            <td><input type="text" class="form-control" v-model="item.ldFirst" maxlength="20"></td>
            <td><input type="text" class="form-control" v-model="item.ldFirstPrice" maxlength="20"></td>
            <td><input type="text" class="form-control" v-model="item.ldSecond" maxlength="20"></td>
            <td><input type="text" class="form-control" v-model="item.ldSecondPrice" maxlength="20"></td>
            <td><a class="btn-link" @click="editLD($index)">编辑</a> <a class="btn-link" @click="delLD($index)">删除</a></td>
          </tr>
        </tbody>
      </table>
      <div><a class="btn-link" @click="addLD">为指定地区城市设置运费</a></div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modal{{ boxTitle }}" tabindex="-1" role="dialog" aria-labelledby="modalLabel{{ boxTitle }}" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          <h4 class="modal-title" id="modalLabel{{ boxTitle }}">选择城市</h4>
        </div>
        <div class="modal-body">
          <div class="city-thead">
            <a class="btn-link" @click="goKey('All')">全部</a>
            <a class="btn-link" @click="goKey(key)" v-for="(key, value) in cityList">{{ key }}</a>
          </div>
          <div class="city-tbody container-fluid">
            <div class="row city-items" id="valueName{{ boxTitle }}All">
              <div class="col-sm-11 col-sm-offset-1">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" name="citys" :value="1" :data-pid="0" v-model="selectId" @click="selectCity"> 全国（包含港澳）
                  </label>
                </div>
                <div class="checkbox">
                  <label>
                    <input type="checkbox" name="citys" :value="2" :data-pid="0" v-model="selectId" @click="selectCity"> 中国大陆（不包含港澳）
                  </label>
                </div>
              </div>
            </div>
            <div class="row city-items" v-for="(key, value) in cityList" id="valueName{{ boxTitle + value.name }}">
              <h4 class="col-sm-1">{{ value.name }}</h4>
              <div class="col-sm-11">
                <div class="city-item" v-for="item in value.data">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" name="citys" :value="item.crId" :data-name="value.name" :data-pid="1" v-model="selectId" @click="selectCity" :disabled="disableId.indexOf(item.crId) != -1"> {{ item.crName }}
                    </label>
                  </div>
                  <div class="city-row">
                    <label class="checkbox-inline" v-for="cell in item.region">
                      <input type="checkbox" name="citys" :value="cell.crId" :data-name="value.name" :data-pid="item.crId" v-model="selectId" @click="selectCity" :disabled="disableId.indexOf(cell.crId) != -1"> {{ cell.crName }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="saveLD">确认</button>
        </div>
      </div>
    </div>
  </div>

  <!-- <logistics-edit-city v-show="showCity" :is-show.sync="showCity" :temp-data="tempData"></logistics-edit-city> -->
</template>

<script>
  // import logisticsEditCity from './logisticsEditCity';
  import cityList from './logisticsCity';

  var ajaxUrl = {
    getCity: ''
  };

  function getLdInitData() {
    return {
      crId: [],
      lmId: 0,
      ldRegion: '',
      ldFirst: '',
      ldFirstPrice: '',
      ldSecond: '',
      ldSecondPrice: ''
    }
  }

  module.exports = {
    props: {
      lmData: Object,
      ltPriceMethod: Number
    },
    data() {
      return {
        current: -1,
        cityList: cityList.data,
        selectId: [],
        disableId: [],
        crName: []
      }
    },
    computed: {
      boxTitle() {
        return this.lmData.lmId;
      }
    },
    components: {
      // logisticsEditCity
    },
    methods: {
      // 点击字母滚动到相应位置
      goKey(id) {
        let $main = document.querySelector('#modal' + this.boxTitle + ' .city-tbody');
        let $target = document.querySelector('#valueName' + this.boxTitle + id);
        $main.scrollTop = Math.max($target.offsetTop - $main.offsetTop, 0);
      },
      // 添加运费设置
      addLD() {
        $('#modal' + this.boxTitle).modal('show');
        // 重置滚动条到顶部
        setTimeout(() => {
          this.goKey('All');
        }, 150);

        this.current = -1;
        this.selectId = [];
        this.disableId = [];
        this.crName = [];
        if (this.lmData.lmData.length) {
          this.lmData.lmData.forEach((ld) => {
            this.disableId = this.disableId.concat(ld.crId);
          });
          for (let key in this.cityList) {
            this.cityList[key].data.forEach((item) => {
              if (this.disableId.indexOf(item.crId) != -1) {
                item.region.forEach((cell) => {
                  this.disableId.push(cell.crId);
                });
              }
            });
          }
        }
      },
      // 编辑运费设置
      editLD(index) {
        $('#modal' + this.boxTitle).modal('show');
        // 重置滚动条到顶部
        setTimeout(() => {
          this.goKey('All');
        }, 150);

        this.current = index;
        this.selectId = [];
        this.disableId = [];
        this.crName = [];
        this.lmData.lmData.forEach((ld, i) => {
          if (index == i) {
            this.selectId = this.selectId.concat(ld.crId);
            this.crName = ld.ldRegion.split('，');
          } else {
            this.disableId = this.disableId.concat(ld.crId);
          }
        });
        for (let key in this.cityList) {
          this.cityList[key].data.forEach((item) => {
            if (this.selectId.indexOf(item.crId) != -1 || this.disableId.indexOf(item.crId) != -1) {
              item.region.forEach((cell) => {
                if (this.selectId.indexOf(item.crId) != -1) {
                  this.selectId.push(cell.crId);
                  this.crName.push(cell.crName);
                }
                if (this.disableId.indexOf(item.crId) != -1) {
                  this.disableId.push(cell.crId);
                }
              });
            }
          });
        }
      },
      // 选择城市
      selectCity(e) {
        let el = e.target;
        let elText = $.trim(el.parentNode.textContent);
        if (el.checked) {
          this.selectId.push(el.value);
          this.crName.push(elText);
        } else {
          this.selectId.$remove(el.value);
          this.crName.$remove(elText);
        }
        if (el.dataset.pid == 0) {  //点击中国时
          if (el.value == 1) {  //点击全国时
            //
          } else if (el.value == 2) { //点击大陆时
            //
          }
        } else if (el.dataset.pid == 1) { //点击省份时
          this.cityList[el.dataset.name].data.forEach((item) => {
            if (item.crId == el.value) {
              item.region.forEach((cell) => {
                if (el.checked) {
                  if (this.selectId.indexOf(cell.crId) == -1) {
                    this.selectId.push(cell.crId);
                    this.crName.push(cell.crName);
                  }
                } else {
                  if (this.selectId.indexOf(cell.crId) != -1) {
                    this.selectId.$remove(cell.crId);
                    this.crName.$remove(cell.crName);
                  }
                }
              });
            }
          });
        } else {  // 点击城市时
          this.cityList[el.dataset.name].data.forEach((item) => {
            if (item.crId == el.dataset.pid) {
              if (el.checked) {
                let all = true;
                item.region.forEach((cell) => {
                  if (this.selectId.indexOf(cell.crId) == -1) {
                    all = false;
                  }
                });
                if (all) {
                  this.selectId.push(item.crId);
                  this.crName.push(item.crName);
                }
              } else {
                this.selectId.$remove(item.crId);
                this.crName.$remove(item.crName);
              }
            }
          });

          // if (el.checked) {
          //   let all = true;
          //   this.cityList[el.dataset.name].data.forEach((item) => {
          //     if (item.crId == el.dataset.pid) {
          //       item.region.forEach((cell) => {
          //         if (this.cityId.indexOf(cell.crId) == -1) {
          //           all = false;
          //         }
          //       });
          //     }
          //   });
          //   if (all) {
          //     if (this.cityId.indexOf(el.dataset.pid) == -1) {
          //       this.cityId.push(el.dataset.pid);
          //     }
          //   } else {
          //     if (this.cityId.indexOf(el.dataset.pid) != -1) {
          //       this.cityId.$remove(el.dataset.pid);
          //     }
          //   }
          // } else {
          //   this.cityList[el.dataset.name].data.forEach((item) => {
          //     // if (item.crId == pid)
          //   })
          //   if (this.cityId.indexOf(el.dataset.pid) != -1) {
          //     this.cityId.$remove(el.dataset.pid);
          //   }
          // }
        }
      },
      // 删除运费设置
      delLD(index) {
        this.lmData.lmData.splice(index, 1);
      },
      // 保存运费设置
      saveLD() {
        if (!this.selectId.length) {
          swal('保存失败', '请先选择城市', 'warning');
          return false;
        } else {
          for (let key in this.cityList) {
            this.cityList[key].data.forEach((item) => {
              if (this.selectId.indexOf(item.crId) != -1) {
                item.region.forEach((cell) => {
                  if (this.selectId.indexOf(cell.crId) != -1) {
                    this.selectId.$remove(cell.crId);
                    this.crName.$remove(cell.crName);
                  }
                });
              }
            });
          }
        }
        if (this.current < 0) {
          let obj = getLdInitData();
          obj.lmId = this.lmData.lmId;
          obj.ldRegion = this.crName.join('，');
          obj.crId = [].concat(this.selectId);
          this.lmData.lmData.push(obj);
        } else {
          let obj = this.lmData.lmData[this.current];
          obj.ldRegion = this.crName.join('，');
          obj.crId = [].concat(this.selectId);
        }
        $('#modal' + this.boxTitle).modal('hide');
      }
    }
  }
</script>
