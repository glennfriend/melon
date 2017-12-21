/**
 * validate RegExp rule
 */
export default class verifier
{

    static email(value)
    {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (! re.test(value.toLowerCase())) {
            return false;
        }
        return true;
    }

}
