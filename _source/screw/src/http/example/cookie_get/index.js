import cookies from '../../../common/cookies.js';

module.exports = class Example__cookie_get {

    constructor()
    {
    }

    main()
    {
        console.log("[load] example/cookie_get");
        console.log('PHPSESSID = ' + cookies.get('PHPSESSID'));
        console.log('__utma = ' + cookies.get('__utma'));
        console.log('SSID = ' + cookies.get('SSID'));
        console.log('cdn = ' + cookies.get('cdn'));
    }

}
