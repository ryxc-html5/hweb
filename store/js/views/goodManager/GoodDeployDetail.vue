/*
 * 商品管理-商品编辑-图文详情单元
 * lxw
 * 2016-08-08
 **/
<style scoped>
  .hrt-deploy-content {
    padding: 15px 15px 0;
  }
  .hrt-deploy-detail {
    position: relative;
    background-color: #f6f6f6;
  }
  .hrt-deploy-detail.detail-img {
    padding-bottom: 0;
  }
  .hrt-deploy-delbtn {
    position: absolute;
    top: 0;
    right: 0;
  }
  .hrt-deploy-orderbtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>

<template>
  <div class="hrt-deploy-content">
      <div class="panel panel-default" v-for="item in goodInfo.desc" transition="fade" transition-mode="out-in">
        <div class="panel-body hrt-deploy-detail" :class="{'detail-img': item.type == 'img'}">
          <div class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">{{ item.type == 'img' ? '添加图片' : '添加文字' }}</label>
              <div class="col-sm-9">
                <div v-if="item.type == 'img'">
                  <Img-upload :url-data="uploadImg[$index]"
                              :size="uploadImg[$index].size"
                              :weight="uploadImg[$index].weight"
                              :set-url="setUrl"
                              :set-url-param="{index: $index}"
                              :img-url="item.content"
                              :show-img="1"
                              :show-tips="1"></Img-upload>
                </div>
                <div v-if="item.type == 'text'">
                  <input type="text" class="form-control" v-model="item.content">
                </div>
              </div>
            </div>
          </div>
          <div class="hrt-deploy-delbtn">
            <a class="btn btn-danger" @click="delBox(item)"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
          </div>
          <div class="hrt-deploy-orderbtn">
            <a class="btn btn-info" @click="orderUp($index)" :class="{'disabled': $index == 0}"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></a>
            <a class="btn btn-info" @click="orderDn($index)" :class="{'disabled': $index == goodInfo.desc.length - 1}"><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></a>
          </div>
        </div>
      </div>
      <a class="btn btn-info" @click="addBox('img')">添加图片</a>
      <a class="btn btn-info" @click="addBox('text')">添加文字</a>
  </div>
</template>

<script>
  import ImgUpload from '../../../../common/js/components/ImgUpload';

  // 生成图片组件所需对象
  function GetPicObj() {
    return hrtCommon.getUploadObj({
      width: 800,
      weight: 300,
      imgType: 'goods'
    })
  }

  // 图文内容块调序
  function orderSwap(arr, iOld, iNew) {
    var elOld = arr.splice(iOld, 1)[0];
    setTimeout(function() {
      arr.splice(iNew, 0, elOld);
    }, 300);
  }

  module.exports = {
    props: {
      goodInfo: Object
    },
    data: function() {
      return {
      }
    },
    computed: {
      uploadImg: function() {
        var arr = [];
        if (this.goodInfo.desc.length) {
          for (var i = 0, l = this.goodInfo.desc.length; i < l; i++) {
            arr.push(GetPicObj());
          }
        }
        return arr;
      }
    },
    components: {
      ImgUpload: ImgUpload
    },
    methods: {
      setUrl: function(data, param) {
        if (data.state != 'SUCCESS') {
          swal('上传失败', data.state, 'warning');
        } else {
          this.goodInfo.desc[param.index].content = data.origin_img_url;
        }
      },
      addBox: function(type) {
        this.uploadImg.push(GetPicObj());
        this.goodInfo.desc.push({
          type: type,
          content: ''
        });
      },
      delBox: function(item) {
        var _this = this;
        swal({
          title: '确定要删除' + (item.type == 'img' ? '图片' : '文字') + '吗？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }, function() {
          _this.goodInfo.desc.$remove(item);
        });
      },
      orderUp: function(index) {
        if (index == 0) {
          return;
        }
        orderSwap(this.goodInfo.desc, index, index - 1);
      },
      orderDn: function(index) {
        if (index == this.goodInfo.desc.length - 1) {
          return;
        }
        orderSwap(this.goodInfo.desc, index, index + 1);
      }
    }
  }
</script>
