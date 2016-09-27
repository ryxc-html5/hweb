<template>
  <div>
    <div class="container-fluid">
      <div class="row channel-list-name">
        <div class="col-md-6 ">
          <slot name="channelName"></slot>
        </div>
        <div class="col-md-6 text-right">
          <slot name="addBtnWrapper"></slot>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Channel v-for="channel in channelList" :channel="channel"></Channel>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .channel-list-name{
    height: 50px;
    line-height: 50px;
    font-size: 30px;
  }
</style>
<script>
  import Channel from './Channel'

  var ajaxUrl={
    delChannelContent:'/Admin/ContentManagement/delChannelContent'
  };

  module.exports = {
    props: {
      channelList:Array
    },
    data: function () {
      return {

      }
    },
    computed: function () {
      return {}
    },
    components: {
      Channel:Channel
    },
    methods: {

    },
    events: {
      'deleteChannel': function (channel) {
        var thiz = this;
        swal({
          title: "是否确定删除该频道?",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "确 定",
          cancelButtonText: "取 消",
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            thiz.$http.post(
                    ajaxUrl.delChannelContent,
                    {
                      "cmId": channel.cmId
                    }
            ).then(function (response) {
                      let data = response.json();
                      if (data.code == "0") {
                        swal("成功删除", "", "success");
                        this.channelList.$remove(channel);

                      } else {
                        swal("删除失败!", data.msg, "warning");
                      }
                    },
                    function (response) {
                      swal("删除失败!", response.json().msg, "warning");
                    }
            );

          } else {
            swal("已取消", "", "error");
          }
        });
      }
    },
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    ready: function () {

    }
  };
</script>
