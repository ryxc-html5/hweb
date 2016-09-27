/*
 * 店铺管理-主图设置-图片单元
 * lxw
 * 2016-08-01
 **/
<style scoped>
  .hrt-shopimgs-body {
    background-color: #f6f6f6;
    position: relative;
    padding-top: 25px;
    padding-bottom: 0;
  }
  .hrt-shopimgs-title {
    position: absolute;
    top: 0;
    left: 5px;
    font-size: 20px;
    font-weight: bold;
    color: #999;
  }
  .hrt-shopimgs-delbtn {
    position: absolute;
    top: 0;
    right: 0;
  }
  .hrt-shopimgs-orderbtn {
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>

<template>
  <div class="panel panel-default">
    <div class="panel-body hrt-shopimgs-body">
      <div class="row">
        <div class="hrt-shopimgs-title">主图 {{ index + 1 }}</div>
        <div class="col-sm-6">
          <Img-upload :url-data="uploadImg.banner"
                      :size="uploadImg.banner.size"
                      :weight="uploadImg.banner.weight"
                      :set-url="setUrl"
                      :img-url="imgCellData.stsPath"
                      :show-img="2"
                      :show-img-style="{'height':'125px', 'background-color':'#ddd', 'margin-top':'6px'}"
                      :show-tips="1"></Img-upload>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label>图片链接：</label>
            <input type="text" class="form-control" placeholder="" v-model="imgCellData.stsLink" maxLength="200">
          </div>
          <div class="form-group">
            <label>图片描述：</label>
            <input type="text" class="form-control" placeholder="最多输入20个字" v-model="imgCellData.stsTitle" maxLength="20">
          </div>
        </div>
      </div>
      <div class="hrt-shopimgs-delbtn">
        <a class="btn btn-danger" @click="delImg"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>
      </div>
      <div class="hrt-shopimgs-orderbtn">
        <a class="btn btn-info" @click="orderUp" :class="{'disabled': isFirst}"><span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></a>
        <a class="btn btn-info" @click="orderDn" :class="{'disabled': isLast}"><span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></a>
      </div>
    </div>
  </div>
</template>

<script>
  import ImgUpload from '../../../../common/js/components/ImgUpload';

  module.exports = {
    props: {
      imgCellData: Object,
      index: Number,
      len: Number
    },
    data: function() {
      return {
        uploadImg: {
          banner: hrtCommon.getUploadObj({
            width: 1080,
            height: 360
          })
        }
      }
    },
    computed: {
      isFirst: function() {
        return this.index == 0 ? true : false;
      },
      isLast: function() {
        return this.index == this.len - 1 ? true : false;
      }
    },
    components: {
      ImgUpload: ImgUpload
    },
    methods: {
      setUrl: function(data) {
        if (data.state != 'SUCCESS') {
          swal('上传失败', data.state, 'warning');
        } else {
          this.imgCellData.stsPath = data.origin_img_url;
        }
      },
      delImg: function() {
        this.$dispatch('delImg', this.index);
      },
      orderUp: function() {
        this.$dispatch('orderUp', this.index);
      },
      orderDn: function() {
        this.$dispatch('orderDn', this.index);
      }
    }
  }
</script>
