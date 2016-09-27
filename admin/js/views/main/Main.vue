<template>
    <div id="manageApp" class="container-fluid">
        <div class="navbar navbar-fixed-top hrt-topbar">
            <Manage-top :username="username"></Manage-top>
        </div>

        <div class="hrt-sidebar">
            <Manage-menu :menu-list="menuList" open-sub="@ALL" :open-multi="true"></Manage-menu>
        </div>

        <div class="hrt-mainer">
            <div id="hrtPageContent">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .hrt-topbar {
        height: 50px;
        background-color: #f8f8f8;
        border-bottom: 1px solid #e7e7e7;
        color: #777;
    }

    .hrt-sidebar {
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0;
        width: 250px;
        background-color: #f8f8f8;
        border-right: 1px solid #e7e7e7;
        overflow: auto;
    }

    .hrt-mainer {
        margin-bottom: 15px;
    }
</style>
<script>

    import ManageTop from './ManageTop';
    import ManageMenu from './ManageMenu';

    module.exports = {
        props: {
            userName:String,
            menuList:Array
        },
        data: function () {
            return {
                minHeight: 0
            }
        },
        computed: function () {
            return {}
        },
        components: {
            ManageTop: ManageTop,
            ManageMenu: ManageMenu
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
    };
</script>
