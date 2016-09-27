<template>
  <div>
    <Channel-list :channel-list="channelList">
      <span slot="channelName">品牌频道列表</span>
      <button slot="addBtnWrapper" @click="addBrand" class="btn btn-default">创建品牌频道</button>
    </Channel-list>
  </div>
</template>
<style scoped>

</style>
<script>
  import ChannelList from '../common/ChannelList';
  var $=require('jquery');

  var ajaxUrl={
    getBrandChannelList:'/Admin/ContentManagement/getChannelContentList'
  };
  module.exports = {
    props: {

    },
    data: function () {
      return {
        channelList:[]
      }
    },
    computed: function () {
      return {}
    },
    components: {
      ChannelList:ChannelList
    },
    methods: {
      addBrand: function () {
        this.$route.router.go({
          'name': 'brandChannelAdd'
        });
      },
      getList: function ( ) {
        var thiz = this;

        thiz.$http.get(ajaxUrl.getBrandChannelList, {
          params: {
            cmType:2
          }
        }).then(function (response) {
                  let data = response.json();
                  if (data.code == '0') {
                    thiz.channelList=data.data;
                  } else {
                    swal('获取数据失败', data.msg, 'warning');
                  }
                },
                function (response) {
                  swal("获取数据失败!", response.json().msg, "warning");
                }
        );
      }
    },
    events: {},
    route: {
      data: function (transition) {
        this.getList();
        transition.next();
      }
    },
    ready: function () {

    }
  };
</script>
