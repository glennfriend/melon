var config;

try {
    config = require("../../config.json");
}
catch (err) {
    config = {};
    console.log("Config Data Get Error:");
    console.log("============================");
    console.log(err);
    console.log("============================");
}

exports.getConfig = function (key=null, defaultValue=null)
{
    if (! key) {
        return config;
    }
    
    try {
        if (config[key]) {
            return config[key];
        }
    }
    catch (error) {}

    return defaultValue;
};

