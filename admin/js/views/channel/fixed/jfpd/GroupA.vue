<style scoped>
  .group-a {
    padding: 5px;
    border:1px solid forestgreen;
    margin-bottom: 10px;
  }
  .top-row-left>div{
    height: 500px;
  }

  .top-row-right>div{
    height: 250px;
  }

  .btn-wrapper{
    height: 60px;
    line-height: 60px;
  }
</style>

<template>
  <div class="container-fluid group-a">
    <div class="row">
      <div class="col-md-6">
        <div class="top-row-left">
          <Group-image-item :image-data="groupData.items[0]"></Group-image-item>
        </div>
      </div>
      <div class="col-md-6">
        <div class="top-row-right">
          <Group-image-item :image-data="groupData.items[1]"></Group-image-item>
          <Group-image-item :image-data="groupData.items[2]"></Group-image-item>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <Group-image-item :image-data="groupData.items[3]"></Group-image-item>
      </div>
      <div class="col-md-6">
        <Group-image-item :image-data="groupData.items[4]"></Group-image-item>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 btn-wrapper" >
        <button class="btn btn-primary btn-sm" type="button" @click="del(groupData)">删 除</button>
        <button class="btn btn-primary btn-sm" type="button" @click="up(groupData)">上 移</button>
        <button class="btn btn-primary btn-sm" type="button" @click="down(groupData)">下 移</button>
      </div>
    </div>
  </div>
</template>

<script>
  var swal = require('sweetalert');
  import GroupImageItem from './GroupImageItem';

  module.exports = {
    props: {
      groupData:Object,
      del:{
        type: Function,
        default: function (data) {
        }
      },
      up:{
        type:Function,
        default:function(data){

        }
      },
      down:{
        type:Function,
        default:function(data){

        }
      }
    },
    data: function () {
      return {

      }
    },
    computed: {},
    components: {
      GroupImageItem: GroupImageItem
    },
    methods: {

    },
    events: {},
    route: {
      data: function (transition) {
        transition.next();
      }
    },
    ready: function () {

    }

  }
</script>
