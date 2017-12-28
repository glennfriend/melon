;"use strict";

// TODO: 該程式的資料轉換 還未完成!!



// 如果資料已存在, 進行 資料轉換 + 送出
(function(){

    var keyword = "trackingTool";
    var getOriginPushData = null;
    if ('[object Array]' === Object.prototype.toString.call(window[keyword]) && window[keyword].length > 0) {
        getOriginPushData = window[keyword];
    }



    /**
     * Tracker Tool
     *      - 自動集成頁面基本資訊
     *      - 可以自定義參數代入 key/value
     *      - 提供 plugin 讓開發者將 function 代入程式, 對資料進行修改
     *
     * plugin 特性
     *      - filter
     *      - 資料內部 (plugin) 轉換
     *      - 資料轉傳遞
     *      - 請注意 plugin list 順序
     *
     */
    window[keyword] = (function()
    {
        var config = {
            markId: keyword,
            markUrl: "//" + window.location.hostname + "/tracking-tool/track",
            pluginList: {},
            pluginSplitTag: '#',
            isDebug: false,
            version: "0.1",
        };

        var _ = {

            /**
             *
             */
            createScriptElement: function(options)
            {
                var url = '';
                for (var key in options) {
                    // debug
                    if (this.isDebug) {
                        console.log(key + ' -> ('+ typeof options[key] + ') ' + options[key]);
                    }

                    // build url
                    url += "&" + key + "=" + encodeURIComponent(options[key]);
                }

                // create
                var element = document.createElement('script');
                element.setAttribute('src', config.markUrl + '?' + url);
                document.body.appendChild(element);
            },


            /**
             * 將代入的資料經過 plugins 的轉換
             */
            convertPluginsPerform: function(options)
            {
                for (var key in options) {
                    var content = options[key];
                    var keyName    = this.getKeyByInputName(key);
                    var pluginName = this.getPluginNameByInputName(key);
                    if (! pluginName) {
                        continue;
                    }

                    try {
                        var func = config.pluginList[pluginName];
                        content = func(content);
                        options[key] = content;
                    }
                    catch (error) {
                        console.log('[' + config.markId + ' error]: Plugin name is "' + encodeURIComponent(pluginName) + '"');
                    }
                }

                return options;
            },

            /**
             * 代入 json 當中的 key 會帶有 plugin name (e.g. "email#base64")
             * 所以需要額外的提取
             */
            getKeyByInputName(input)
            {
                var info = input.split(config.pluginSplitTag);
                if (info.length > 0) {
                    return info[0];
                }
                return null;
            },

            /**
             * 代入 json 當中的 key 會帶有 plugin name (e.g. "email#base64")
             * 所以需要額外的提取
             */
            getPluginNameByInputName(input)
            {
                var info = input.split(config.pluginSplitTag);
                if (info.length === 2) {
                    return info[1];
                }
                return null;
            },

            /**
             *
             */
            debugLog: function(message)
            {
                var title = "[" + config.markId + " error] ";
                console.log("%c" + title + "%c" + message, "color:red", "color:blue");
            },

            /**
             * build default client information
             *      - NOTE: tm, rd 的用途是用來防止 cache 發生
             *
             */
            makeBasicInfo: function()
            {
                return {
                    "name": null,
                    "hn": window.location.hostname,
                    "pn": window.location.pathname,
                    "qs": window.location.search,
                    "cs": (document.characterSet ? document.characterSet : document.charset),
                    "tt": document.title,
                    "lg": (navigator.language ? navigator.language : navigator.userLanguage),
                    "sw": window.screen.width,
                    "sh": window.screen.height,
                    "cw": document.documentElement.clientWidth,
                    "ch": document.documentElement.clientHeight,
                    "rf": (document.referrer ? document.referrer : (location.referrer ? location.referrer : "")),
                    "ua": window.navigator.userAgent,
                    "tm": Math.floor(new Date().getTime() / 1000),
                    "rd": Math.floor(Math.random()*1000000)
                };

                // etc.
                //  "cc": document.cookie.replace(/;/g,"||"),
                //  如果需要 cookie , 請不要用以上的方式
                //  請用 plugin 完成一件事
            },

        };

        // --------------------------------------------------------------------------------
        // public
        // --------------------------------------------------------------------------------
        return {

            /**
             * 將資料送出
             * 提供 options 做自定義參數儲存
             */
            push: function(eventName, options)
            {
                // validate eventName
                if (typeof(eventName) == "undefined") {
                    _.debugLog("event name is empty");
                    return;
                }

                // filter and validate options
                if (typeof(options) == "undefined") {
                    var options = {};
                }
                if (typeof(options) !== "object") {
                    _.debugLog("options is not object");
                    return;
                }

                // plugins convert
                options = _.convertPluginsPerform(options);

                //
                var info = _.makeBasicInfo();
                info.name = eventName;

                // merge custom values 
                for (var name in options) {
                    var key = _.getKeyByInputName(name);
                    info["custom_" + key] = options[name];
                }

                //
                _.createScriptElement(info);

            },

            /**
             * 提供變數名稱開頭相符合的參數
             * 經行資料的代換
             *
             * e.g.
             *      // add plugin
             *      trackingTool.addPlugin('reverse', function(input){
             *          return input.split('').reverse().join('');
             *      });
             *
             *      // use plugin
             *      trackingTool.push("event-test", {
             *          "str1":            "hello",     // send "hello"
             *          "str2#reverse":    "hello",     // send "olleh"
             *      });
             *
             */
            addPlugin: function(pluginName, callbackFunc)
            {
                config.pluginList[pluginName] = callbackFunc;
            },

        };

    })();




    // 如果先前有資料, 在這裡進行資料轉換
    if (getOriginPushData) {

        // 進行資料轉換
        // 資料有可能會是 [string, string, object, string, object] 的存儲形式
        // 請小心轉換
        var correctData = [];
        // ....


        // auto push
        // ....
    }

})();





// --------------------------------------------------------------------------------
//  default plugins
// --------------------------------------------------------------------------------
trackingTool.addPlugin('base64', function(string) {
    return btoa(string);
});


// --------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------
/*
sample
    <script>
        window.trackingTool = window.trackingTool || [];
        trackingTool.push("event-1001");
    </script>
    <script src="//localhost/tracking-tool/js/tracker.src.js"></script>

載入 tracker 的方式
    1. 直接載入 <script src=""></script>
    2. 或是由 GTM 管理, 載入


push() e.g.
    <script>
        // 利用 array 的特性, 如果 script 還沒載入時, 資料會先保留, 提供沿遲送出所須
        window.trackingTool = window.trackingTool || [];
    </script>
    <script>
        trackingTool.push("event-1001");

        trackingTool.push("event-1002", {
            "type": "page"
        });

        trackingTool.push("event-1003", {
            "type":          "product",
            "product_name":  "pen",
            "product_price": "19.99"
        });

        trackingTool.push("event-1004", {
            "food_name":        "Oulong noodles (烏龍麵)",
            "food_price":       29.50,
            "food_description": "is <b>good</b> food! ^__^ ",
            "hn":               "不會出現這個值, 因為預設值 hostname 不會被覆蓋"
        });

        trackingTool.push("event-1005", {
            "email":            "test1@localhost.com",
            "email2#base64":    "test1@localhost.com",
        });
    </script>


*/