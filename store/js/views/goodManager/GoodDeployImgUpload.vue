/*
* 图片上传控件
* props
* @progress {function} 回掉函数百分比
* @setUrl {function} 回掉设置URL的参数
* @size {object} 图片长宽限制
* @weight {number} KB为单位的图片大小限制
* lc
* 2016-07-07
*
* @useType {string} 用户类型，可选值：admin、shop，默认值：admin
* @imgType {string} 图片标签，可选值：logo、banner、goods、datum、other、ad等，默认值：ad
* lxw
* 2016-08-01
**/
<style>
    .image-wraper .img-container {
        border: 1px solid #cccccc;
    }

    .image-wraper .btn-container {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
</style>

<template>
    <div class="image-wraper" :style="{width: size.width + 'px' }">
        <div class="img-container" :style="{width: size.width + 'px',height: size.height + 'px' }">
            <img style="width:100%;">
        </div>
        <!--    <span class="image-name">{{urlData.src}}</span>-->
        <input type="file" class="dn" @change="change($event)" accept="image/gif, image/jpeg, image/png">

        <div class="btn-container">
            <button class="btn btn-primary btn-sm" type="button" @click="upload">{{btnText}}</button>
        </div>
    </div>
</template>

<script>
    var swal = require('sweetalert');
    var $ = require('jquery');
    module.exports = {
        props: {
            size: Object,
            weight: Number,
            progress: Function,
            setUrl: Function,


            useType: String,
            imgType: String
        },
        data: function () {
            return {
                urlData: {
                    src:"上传图片"
                }
            }
        },
        computed: {
            btnText: function () {
                if (!this.urlData || !this.urlData.src || this.urlData.src == '' || this.urlData.src == '请选择图片！') {
                    return "上传图片"
                } else {
                    return "重新上传图片"
                }
            },
            urlUseType: function () {
                return this.useType || 'admin';
            },
            urlImgType: function () {
                return this.imgType || 'ad';
            }
        },
        methods: {
            upload: function () {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent('click', true, true);
                $(this.$el).find('input')[0].dispatchEvent(evt);
            },
            change: function (e) {
                if (!e.target.files.length) {
                    return false;
                }
                try {
                    var reader = new FileReader();
                    var file = e.target.files[0];
                    if (this.weight && this.weight * 1024 < file.size) {
//            swal('图片超过最大' + this.weight + 'KB限制，请重新上传！');
                        swal('图片超过限制大小，请重新上传！');
                        return;
                    }
                    var size = this.size;
                    if (size) {
                        reader.onload = function (e) {
                            //图片尺寸判断
                            var image = document.createElement('img');
                            image.style.position = 'absolute';
                            image.style.left = '-10000px';
                            image.style.top = '-10000px';
                            image.src = e.target.result;
                            document.body.appendChild(image);
                            setTimeout(function () {
                                var res = getComputedStyle(image);
                                // console.log(parseInt(res.width), parseInt(res.height));
                                if (!(parseInt(res.width) === size.width)) {
//                  swal('该图片的宽度应为' + size.width);
                                    swal('图片尺寸不符合要求，请重新上传！');
                                    return;
                                }
                                if (size.height && !(parseInt(res.height) === size.height)) {
//                  swal('该图片的高度应为' + size.height);
                                    swal('图片尺寸不符合要求，请重新上传');
                                    return;
                                }
                                this.toServer(file);
                            }.bind(this), 10);
                        }.bind(this);

                        reader.readAsDataURL(file);
                    } else {
                        this.toServer();
                    }
                } catch (e) {
                    alert(JSON.stringify(arguments));
                }
            },
            toServer: function (file) {
                var fd = new FormData();
                var _this = this;
                fd.append("upload_imgs", file);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://127.0.0.1:8888/Tools/Ueditor/?action=uploadimage&encode=utf-8&use=' + this.urlUseType + '&img_action=' + this.urlImgType, true);

                if (this.progress) {
                    xhr.upload.onprogress = function (e) {
                        if (e.lengthComputable) {
                            var percentComplete = (e.loaded / e.total) * 100;
                            _this.progress(percentComplete.toFixed(2));
                        }
                    };
                }
                xhr.onload = function () {
                    var resp = JSON.parse(this.response);

                    if (this.status === 200) {
                        _this.urlData.src = resp.original;
                        $('img',_this.$el).attr('src',resp.origin_img_url);
                        _this.setUrl(resp);//调用setUrl回调函数。
                    } else {
                        swal('上传图片失败，请重新上传！');
                    }
                };
                xhr.send(fd);
            }
        }
    }
</script>
