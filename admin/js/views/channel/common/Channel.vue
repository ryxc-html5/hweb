<style scoped>
  .channel-item{
    /*width: 100%;*/
    position: relative;
    border: 1px solid #cccccc;
    background-color: #f7f7f7;
    padding: 10px 15px;
    margin-top: 10px;
  }

  .channel-item:hover{
    background-color:#E0EAF5;
    border: 1px solid #B1CAE6;
  }

  .btn-wrapper{
    position: absolute;
    right: 10px;
    top: 5px;
    /*display: none;*/
    cursor: pointer;
  }

  .btn-wrapper span{
    margin-left: 5px;
  }

  .btn-wrapper span:before{
    font-size: 20px;
    color: #7DA8D7;
  }

  .channel-item:hover .btn-wrapper span:before{
    color: #4682C3;
  }

  .channel-item:hover .btn-wrapper{
    display: block;
  }

  .channel-item .row>div{
    height: 30px;
    line-height: 30px;
  }
</style>

<template>
  <div class="channel-item container-fluid">
    <div class="row">
      <div class="col-md-4">频道名称</div>
      <div class="col-md-8">
        {{channel.cmName}}
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">频道编号</div>
      <div class="col-md-8">
        {{channel.cmId}}
      </div>
    </div>
    <div class="btn-wrapper">
      <span class="icon-edit" @click="edit"></span>
      <span class="icon-remove" @click="remove" v-if="channel.cmType==2"></span>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: {
      channel:Object
    },
    data: function () {
      return {

      }
    },
    computed: function () {
      return {}
    },
    components: {

    },
    methods: {
      edit: function () {
        if(this.channel.cmType==2){//品牌频道
          this.$route.router.go({
            'name': 'brandChannelEdit',
            'params':{
              channelId:this.channel.cmId
            }
          });
        }else{
          if(this.channel.cmNo==hrtCommon.config.fixChannel.HRZZ){//华润质造
            this.$route.router.go({
              'name': 'fixedChannelHrzz',
              'params':{
                channelId:this.channel.cmId
              }
            });
          }else if(this.channel.cmNo==hrtCommon.config.fixChannel.JFPD){//积分频道
            this.$route.router.go({
              'name': 'fixedChannelJfpd',
              'params':{
                channelId:this.channel.cmId
              }
            });
          }else if(this.channel.cmNo==hrtCommon.config.fixChannel.JJSH){//家居生活
            this.$route.router.go({
              'name': 'fixedChannelJjsh',
              'params':{
                channelId:this.channel.cmId
              }
            });
          }else if(this.channel.cmNo==hrtCommon.config.fixChannel.BJG){//保健馆
            this.$route.router.go({
              'name': 'fixedChannelBjg',
              'params':{
                channelId:this.channel.cmId
              }
            });
          }

        }

      },
      remove: function () {
        this.$dispatch('deleteChannel', this.channel);//ChannelList.vue删除
      }
    },
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    ready: function () {

    }
  };
</script>
