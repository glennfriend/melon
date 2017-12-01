// ==UserScript==
// @name         load script by melon develop
// @version      1.0
// @include      localhost*
// ==/UserScript==

(function(){
    //
    // 0 = not include
    // 1 = webpack-server-dev
    // 2 = include production
    //
    var type = 0
    ;

    var isSsl = false;

    if (type==1) {
        loadExternalScript('http://' + getHostname() + ':35729/livereload.js?snipver=1');
        loadExternalScript(getScheme(isSsl) + '://' + getHostname() + ':8080/dist/app.js' + '?' + Date.now());
    }
    else if (type==2) {
        loadExternalScript(getScheme(isSsl) + '://' + getHostname() + '/melon/public/screw/app.js');
    }
})();

function getHostname()
{
    return "localhost";
}

function getScheme(isSsl)
{
    if (isSsl) {return 'https';}
    else {return 'http';}
}

function loadExternalScript(url)
{
    var el = document.createElement('script');
    el.setAttribute('src', url);
    document.body.appendChild(el);
}
