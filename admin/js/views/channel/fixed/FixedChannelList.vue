<template>
  <div>
    <Channel-list :channel-list="channelList">
      <span slot="channelName">固定频道列表</span>
    </Channel-list>
  </div>
</template>
<style scoped>

</style>
<script>
  import ChannelList from '../common/ChannelList'
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
      getList: function ( ) {
        var thiz = this;

        thiz.$http.get(ajaxUrl.getBrandChannelList, {
          params: {
            cmType:1
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
