//hrtAdminConfig
export default {
    //广告跳转链接
    urlType: (function () {
      var name = "链接类型";
      var data = [
        {
          typeName: "网页",
          typeValue: 1,
          typeLabel: "网页链接",
          prefix: "#type=url&url="
        },
        {
          typeName: "单品",
          typeValue: 2,
          typeLabel: "商品编号",
          prefix: "#type=good&goodId="
        },
        {
          typeName: "模板",
          typeValue: 3,
          typeLabel: "模板编号",
          prefix: "#type=dataTemplet&url="
        },
        {
          typeName: "搜索",
          typeValue: 4,
          typeLabel: "关键字",
          prefix: "#type=list&"
        },
        {
          typeName: "自动单品",
          typeValue: 5,
          typeLabel: "商品编号",
          prefix: "#type=good&goodId="
        },
        {
          typeName: "频道",
          typeValue: 6,
          typeLabel: "频道编号",
          prefix: "#type=channel&cmId="
        },
      ];

      /**
       * 根据值获取链接类型信息
       * @param type
       * @returns {{typeName, typeValue, typeLabel, prefix}|*}
       */
      function getTypeData(type) {

        var retData = {
          typeName: "未知类型",
          typeValue: type,
          typeLabel: "未知类型",
          prefix: "#type=unknown"
        };

        for (var i = 0; i < data.length; i++) {
          if (data[i].typeValue == parseInt(type)) {
            retData = data[i];
            break;
          }
        }

        return retData;
      }

      return {
        name: name,
        data: data,
        getTypeData: getTypeData
      }
    })()

}