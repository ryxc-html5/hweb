/*
 * 导航信息单元
 * props
 * @menuList {Array} 导航栏目数组
 * @openSub {String} 默认展开的栏目，值为栏目标题，@ALL为全展开
 * @openMulti {Boolean} 是否允许同时展开多个栏目，默认为false
 * lxw
 * 2016-07-28
 **/
<style lang="less" scoped>
  .hrt-sidebar-menu {
    .nav {
      > li {
        border-bottom: 1px solid #e7e7e7;
        > a {
          background-color: #f8f8f8;
          color: #397ac1;
          &:hover,
          &:focus {
            background-color: #eee;
            color: #29569c;
          }
        }
      }
    }
    .menu-text {
      font-weight: bold;
    }
    .menu-arrow {
      float: right;
      position: relative;
      top: 5px;
      font-size: 12px;
    }
    .sub-nav {
      display: none;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
      > li {
        > a {
          display: block;
          padding: 10px 25px;
          color: #397ac1;
          &:hover,
          &:focus,
          &.v-link-active {
            text-decoration: none;
            background-color: #eee;
            color: #29569c;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="hrt-sidebar-menu" id="hrtManageMenu">
    <ul class="nav">
      <li v-for="menu in menuList">
        <a href="javascript:void(0)" class="menu-head"><span class="menu-text">{{ menu.head }}</span><span class="glyphicon glyphicon-menu-left menu-arrow"></span></a>
        <ul class="sub-nav">
          <li v-for="item in menu.body"><a v-link="item.link">{{ item.text }}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import $ from 'jquery';

  module.exports = {
    props: {
      menuList: Array,
      openSub: String,
      openMulti: Boolean
    },
    data: function() {
      return {

      }
    },
    ready: function() {
      var _this = this;
      var $menu = $(this.$el);
      var $head = null;
      var $sub = null;
      var $arrow = null;
      var arrowClass = 'glyphicon-menu-down';
      var headClass= 'opensub';

      setTimeout(function() {
        $head = $menu.find('.menu-head');
        $sub = $menu.find('.sub-nav');
        $arrow = $menu.find('.menu-arrow');
        if (_this.openSub == '@ALL') {
          $head.addClass(headClass);
          $sub.show();
          $arrow.addClass(arrowClass);
        } else {
          $head.removeClass(headClass);
          $sub.hide();
          $arrow.removeClass(arrowClass);
          if (_this.openSub) {
            $head.each(function(index, item) {
              var $item = $(item);
              if ($item.find('.menu-text').html() == _this.openSub) {
                $item.addClass(headClass)
                  .find('.menu-arrow').addClass(arrowClass)
                  .end()
                  .next().show();
                return false;
              }
            });
          }
        }
        $head.on('click', function(e) {
          e.preventDefault();
          var $this = $(this);
          var $thisSub = $this.next();
          var $thisArrow = $this.find('.menu-arrow');
          if ($this.hasClass(headClass)) {
            $this.removeClass(headClass);
            $thisSub.slideUp('fast');
            $thisArrow.removeClass(arrowClass);
          } else {
            if (!_this.openMulti) {
              $head.removeClass(headClass);
              $sub.slideUp('fast');
              $arrow.removeClass(arrowClass);
            }
            $this.addClass(headClass);
            $thisSub.slideDown('fast');
            $thisArrow.addClass(arrowClass);
          }
        });
      }, 0);
    }
  }
</script>
