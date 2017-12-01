import path from 'path';

const currentTime = function()
{
    let date = new Date();
    let current = date.getFullYear() + "-"
        + (date.getMonth()+1)  + "-"
        + date.getDate()
        + ' '
        + date.getHours() + ":"
        + date.getMinutes() + ":"
        + date.getSeconds();
    return current;
}

exports.showCurrent = function ()
{
    let info = {
        current: __filename + __dirname,
        location_href: location.href,
        timezone_offset: new Date().getTimezoneOffset(),
    };

    console.log('%c==== ' + currentTime() + ' ====', 'background: #ddd; color: #000');
    let content = '';
    for (let key in info) {
        content += '[' + key + ']' + info[key] + "\n";
    }
    console.log(content);
    console.log('%c=============================', 'background: #ddd; color: #000');
};

