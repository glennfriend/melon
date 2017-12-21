/*
form 的管理與操作

    -- formManager.getValue('wedding_date[year]');
    -> select[name="wedding_date[year]"]
        =>
            <select name="wedding_date[year]">
                <option value="2001">2001</option>
            </select>
        =>
            "2001"

    -- formManager.get("interest")
    -> checkbox[name=interest]
        =>
            <input type="checkbox" value="good" checked="checked">
            <input type="checkbox" value="game" checked="checked">
            <input type="checkbox" value="movie">
        =>
            ["food", "game"]

*/
const formManager = {

    /**
     * 依照 元件的名稱 (使用 document.getElementsByName() 方式取得)
     * 取得作用用的 value 值
     */
    getValue: function(elementName, isToString=false)
    {
        let elements = document.getElementsByName(elementName);
        if (! elements || elements.length < 1) {
            return null;
        }
        let element = elements[0];
        let result = null;

        switch (element.type) {
            case 'text':
            case 'textarea':
            case 'hidden':
            case 'email':
            case 'tel':
            case 'date':
                result = element.value;
                break;
            case 'radio':
                for (let index = 0 ; index < elements.length ; index++) {
                    if (elements[index].checked === true) {
                        result = elements[index].value;
                        break;
                    }
                }
                break;
            case 'checkbox':
                result = [];
                for (let index = 0 ; index < elements.length ; index++) {
                    if (elements[index].checked === true) {
                        result.push(elements[index].value);
                    }
                }
                break;
            case 'select-one':
                if (-1 === element.selectedIndex) {
                    return null;
                }
                result = element.value;
                break;
            case 'select-multiple':
                result = [];
                for (let index = 0 ; index < element.options.length ; index++) {
                    let option = element.options[index];
                    if (option.selected === true) {
                        result.push(option.value);
                    }
                }
                break;
            default:
                result = undefined;
        }
        
        if (isToString) {
            if (result) {
                return result.toString();
            }
            else {
                return result;
            }
        }
        else {
            return result;
        }
    },

    /**
     * 依照 元件的名稱 (使用 document.getElementsByName() 方式取得)
     * 以及值, 設定該 元件 的 value 值
     */
    setValue: function(elementName, unknownValue)
    {
        let elements = document.getElementsByName(elementName);
        if (! elements || elements.length < 1) {
            return null;
        }
        let element = elements[0];

        let value = null;
        let values = [];
        switch (Object.prototype.toString.call(unknownValue)) {
            case '[object Array]': 
            case '[object Object]': 
                values = unknownValue;
                break;
            default:
                value = unknownValue;
                break;
        }

        switch (element.type) {
            case 'text':
            case 'textarea':
            case 'hidden':
            case 'email':
            case 'tel':
            case 'date':
            case 'text':
                element.value = value;
                break;
            case 'radio':
                for (let index = 0 ; index < elements.length ; index++) {
                    if (value === elements[index].value) {
                        elements[index].checked = true;
                    }
                }
                break;
            case 'checkbox':
                for (let index = 0 ; index < elements.length ; index++) {
                    if (values.indexOf(elements[index].value) !== -1) {
                        elements[index].checked = true;
                    }
                }
                break;
            case 'select-one':
                for (let index = 0 ; index < element.options.length ; index++) {
                    if (element.options[index].value === value) {
                        element.selectedIndex = index;
                    }
                }
                break;
            case 'select-multiple':
                for (let index = 0 ; index < element.options.length ; index++) {
                    if (values.indexOf(element.options[index].value) !== -1) {
                        element.options[index].selected = true;
                    }
                }
                break;
            default:
                // ??
                break;
        }
    },

};

export default formManager;
