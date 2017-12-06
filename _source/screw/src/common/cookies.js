// @see https://www.npmjs.com/package/browser-cookies
import browserCookies from 'browser-cookies';

/**
 *  e.g.
 *      console.log(Cookie.get('aaa'));
 *      Cookie.set('aaa', Date.now());
 *      console.log(Cookie.get('aaa'));
 *
 */
export default class cookies
{

    static get (name, defaultValue=null)
    {
        let value = browserCookies.get(name);
        if (! value) {
            return defaultValue;
        }
        
        return value;
    }

    static set (name, value, options=null)
    {
        browserCookies.defaults.secure  = false;
        browserCookies.defaults.expires = 30;
        // browserCookies.defaults.domain = "";

        if (! options) {
            options = {};
            // options = {expires: 30};
        }

        try {
            let result = browserCookies.set(name, value.toString(), options);
        }
        catch (err) {
            // console.log(err);
            return false;
        }

        return true;
    }

}

    
    