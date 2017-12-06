
const docReady = function(cb)
{
    if (document.readyState != 'loading'){
        cb();
    }
    else {
        document.addEventListener('DOMContentLoaded', cb);
    }
};

/**
 * 猜測現在的 domain
 * Note: 可能會出錯
 * e.g.
 *      www.pchome.com.tw:8080  => 錯誤, 請不要帶入 port
 *      www.pchome.com.tw       => .pchome.com.tw
 *      pchome.com.tw           => .com.tw  (猜錯)
 *      tw.yahoo.com            => .yahoo.com
 *      yahoo.com               => .com  (猜錯)
 *
 */
const guessRootDomain = function(hostname)
{
    let temp = hostname.split('.');
    temp.shift();
    return '.' + temp.join('.');
};


// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
const browserUtility = {

    docReady: function(func) {
        return docReady(func);
    },

    getGuessRootDomain: function()
    {
        // 請不要使用 location.host
        return guessRootDomain(location.hostname);
    },

    /**
     * 從 window 裡面取資料
     */
    getWindow: function(key, defaultValue=null)
    {
        return window[key] || defaultValue;
    },

    /**
     * 從 url 裡面取 get 資料
     * @return string|null
     */
    getQuery: function(name, url=null)
    {
        if (! url) {
            var url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);
        if (! results) {
            return null;
        }
        if (! results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

};

export default browserUtility;
