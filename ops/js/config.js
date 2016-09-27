/*
 * 商家后台管理配置
 * lxw
 * 2016-08-03
 **/
import $ from 'jquery';

window.hrtCommon = {
  // Ajax失败的回调函数
  ajaxFail: function(xhr, exception, title) {
    var msg = '';
    if (xhr.status === 0) {
      msg = 'Not connect.\n Verify Network.';
    } else if (xhr.status == 404) {
      msg = 'Requested page not found. [404]';
    } else if (xhr.status == 500) {
      msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
      msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
      msg = 'Time out error.';
    } else if (exception === 'abort') {
      msg = 'Ajax request aborted.';
    } else {
      msg = 'Uncaught Error.\n' + xhr.responseText;
    }
    swal(title, msg, 'warning');
  }
};

//$(window).ajaxSend(function (e, xhr, opt) {
// opt.url = 'http://127.0.0.1:8888' + opt.url;
// });

