
// --------------------------------------------------------------------------------
//  local storage 儲存時只能是 string
//  所以如果值是 array, object 就必須要配合轉型
//  該程式已處理基本的轉型
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
        let key = this.prefix + name;
        this.localStorage.removeItem(key);
    },

    /**
     * 儲存時要轉型
     */
    set: function(name, value) {
        let key = this.prefix + name;
        let type = Object.prototype.toString.call(value);

        this.localStorage.setItem(key, type + ":" + value.toString());
    },

    /**
     * 讀取時要依 type 轉型
     */
    get: function(name)
    {
        let key = this.prefix + name;
        let storageValue = this.localStorage.getItem(key);
        if (! storageValue) {
            return null;
        }

        let index = storageValue.indexOf(':');
        if (index === -1) {
            return undefined;
        }
        
        let type  = storageValue.substr(0, index);
        let value =  storageValue.substr(index+1);
        
        // console.log(type);
        if (type === '[object Array]') {
            return value.split(',');
        }
        //else if (type === '[object Object]') {
        //    TODO: 請嘗試轉型 !!!!
        //}
        else {
            return value;
        }
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
