import { Validator } from 'vee-validate';
import verifier from '../common/verifier.js';

var externalErrors;
var externalCallbackFunc;

const _ = {

    getEventNameMatchType: function(typeName)
    {
        const maps = {
            'text':             'change',
            'textarea':         'change',
            'hidden':           'change',
            'email':            'change',
            'tel':              'change',
            'date':             'change',
            'select-one':       'change',
            'select-multiple':  'change',
            'radio':            'click',
            'checkbox':         'click',
        };

        let eventName = maps[typeName];
        if (! eventName) {
            return undefined;
        }
        return eventName;
    },

    getHaveNameFormElements: function()
    {
        var elements = [];
        var allElements = document.querySelectorAll("input, textarea, select");
        for (let key in allElements) {
            if (! allElements.hasOwnProperty(key)) {
                continue;
            }
            var el = allElements[key];
            if (! el.name) {
                continue;
            }

            elements.push(el);
        }

        return elements;
    },

};

const eventControl = {

    doValidate: function(event)
    {
        let element = event.target;
        let validateContent = element.dataset.validate;
        if (! validateContent) {
            return;
        }

        const validator = new Validator();

        // e.g.
        //      validator.attach(  'email', 'required|email');
        //      validator.validate('email', 'hello@mail.com');

        validator.attach(element.name, validateContent);
        let result = validator.validate(element.name, element.value);
        // console.log(result);
        // console.log(externalErrors);

        result.then(function(resolve)
        {
            if (resolve) {
                externalErrors[element.name] = '';
            }
            else {
                externalErrors[element.name] = 'error';
            }
            externalCallbackFunc({
                isSuccess:  resolve,
                isError:    ! resolve,
                target:     event.target,
                rule:       validateContent,
            });
        });

    },

};


export default class validatorUtil
{
    static run(vue, callback)
    {
        externalErrors = vue.error;
        externalCallbackFunc = callback;
        this.bindAll();
    }

    /**
     * bind 所有擁有 name 的 element
     *      - input     is on change
     *      - select    is on change
     *      - checkbox  is on click
     *      - radio     is on click
     *
     * @param function, 供給最外部使用
     */
    static bindAll()
    {
        let elements = _.getHaveNameFormElements();
        for (let key in elements) {
            let element = elements[key];
            let eventType = _.getEventNameMatchType(element.type);
            if (! eventType) {
                console.log('Warring: type not listen event:' + element.type);
                continue;
            }

            // console.log(element.name, element.type, eventType);
            element.addEventListener(eventType, function(event) {
                eventControl.doValidate(event);
            });
        }
    }

    static dispatchAll()
    {
        let elements = _.getHaveNameFormElements();
        for (let key in elements) {
            let element = elements[key];
            let eventType = _.getEventNameMatchType(element.type);
            if (! eventType) {
                continue;
            }

            element.dispatchEvent(new Event(eventType));
        }
    }

    

}
