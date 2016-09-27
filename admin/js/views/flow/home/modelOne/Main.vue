<style scoped>
  .content-wrapper{
    border: 1px solid #C1C1C1;
    padding-top: 10px;
  }

  .menu-wrapper{
    border: 1px solid #C1C1C1;
    padding-top: 10px;
    margin: 0 10px 10px 10px;
  }

  .form-item{
    line-height: 30px;
    margin-bottom: 10px;
    width: 100%;
    cursor: pointer;
    border: 1px solid #C1C1C1;
    text-align: center;
  }

  .form-item:hover,
  .form-item.v-link-active{
    background-color: #A1DBE6;
    border-color: #8c8c8c;
  }
</style>

<template>
  <div class="container-fluid">
    <div class="row content-wrapper">
      <div class="col-md-3 menu-wrapper">
        <div class="row">
          <div class="col-md-12">
            <div @click="toggleAd($event,'Banner')" class="form-item v-link-active">
              首页bannner广告
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div @click="toggleAd($event,'One')" class="form-item">
              活动广告位一
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div @click="toggleAd($event,'Two')" class="form-item">
              活动广告位二
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div @click="toggleAd($event,'Three')" class="form-item">
              活动广告位三
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div @click="toggleAd($event,'Four')" class="form-item">
              活动广告位四
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div @click="toggleAd($event,'Five')" class="form-item">
              活动广告位五
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <component :is="currentView" keep-alive></component>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import Banner from './Banner';
  import One from './One';
  import Two from './Two';
  import Three from './Three';
  import Four from './Four';
  import Five from './Five';

  export default{
    data(){
      return {
        currentView: "Banner"
      }
    },
    components: {
      Banner:Banner,
      One:One,
      Two:Two,
      Three:Three,
      Four:Four,
      Five:Five
    },
    methods:{
      toggleAd: function (e, currentView) {
        var thiz = $(e.target);
        $(this.$el).find('.form-item.v-link-active').removeClass("v-link-active");
        thiz.addClass("v-link-active");
        this.currentView = currentView;
      }
    }
  }
</script>
