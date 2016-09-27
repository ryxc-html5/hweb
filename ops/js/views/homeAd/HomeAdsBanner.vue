<template>
  <!--banner图片配置-->
  <div adl-id="banner" class="adv-part adv-banner-1">
    <div class="form-item-name">首页banner广告</div>
    <Img-group type="banner" column="1" :img-cell-list="banner.data"></Img-group>
    <div class="add-banner" @click="addCell">+添加banner</div>
  </div>
</template>
<style>

</style>
<script>
  var swal = require('sweetalert');
  var ImgGroup = require('../../components/ImgGroup');
  import { getHomeAdsOne_banner } from '../../vuex/action_index'
  module.exports = {
    props: {
      imgCellList: Array
    },
    data: function () {
      return {}
    },
    vuex: {
      getters: {
        banner: getHomeAdsOne_banner
      }
    },
    components: {
      ImgGroup: ImgGroup
    },
    methods: {
      addCell: function () {
        if (this.banner.data.length < 5) {
          this.banner.data.push({
            title: "",
            shareUrl: "",
            hideBtn: true,
            name: "banner-",
            size: {width: 1080, height: 500},
            weight: 500,
            tips: "图片分辨率为1080*500，不得超过500k",
            src: "请选择图片！",
            type: '1',
            linkTo: '',
            imageUrl: ""
          })
        } else {
          swal("Banner最多只能添加五张图！", "", "error");
        }
      }
    },
    events: {}
  }
</script>
