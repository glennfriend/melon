
// --------------------------------------------------------------------------------
//  local storage 如果儲存 object 須要配合 JSON.stringify & JSON.parse 使用
//  但是實作上發生未知的錯誤, 所以目前使用分散的變數來儲存
// --------------------------------------------------------------------------------
const localStorageManager = {

    prefix: 'please_setting_the_value_',

    init: function(localStorage, prefix)
    {
        if (! localStorage) {
            console.log('Error: localStorage not found!');
        }
        this.localStorage = localStorage;

        if (! prefix) {
            console.log('Error: localStorage prefix not found!');
        }
        else {
            this.prefix = prefix;
        }
    },

    remove: function(name) {
        var key = this.prefix + name;
        this.localStorage.removeItem(key);
    },

    set: function(name, value) {
        var key = this.prefix + name;
        this.localStorage.setItem(key, value);
    },

    get: function(name)
    {
        var key = this.prefix + name;
        return this.localStorage.getItem(key);
    },

    getAll: function()
    {
        let prefix = this.prefix;
        let prefixLen = prefix.length;
        let ls = this.localStorage;
        let data = {};
        for (let key in ls)
        {
            if (key.substr(0, prefixLen) !== prefix) {
                continue;
            }
            let name = key.substr(prefixLen);
            data[name] = ls[key];
        }

        return data;
    },

    clearAll: function()
    {
        let all = this.getAll();

        for (let key in all)
        {
            this.remove(key);
        }
    },
};

export default localStorageManager;
