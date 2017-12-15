import domUtil from './common/domUtility.js';
import stringUtil from './common/stringUtility.js';
import formManager from './common/formManager.js';
import dialog from './common/dialog.js';
import localStorageManager from './common/localStorageManager.js';
import mousetrap from 'mousetrap';
import php from 'phpjs';
import './styles.css';

// --------------------------------------------------------------------------------
//  init
// --------------------------------------------------------------------------------
localStorageManager.init(localStorage, 'fft_');


// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
(function(){
    Mousetrap.bind(['alt+1'], rewriteForm);
    Mousetrap.bind(['alt+2'], saveForm);
    Mousetrap.bind(['alt+3'], showStorageForm);
    Mousetrap.bind(['alt+4'], clearForm);
})();

function rewriteForm(e)
{
    pasteRun();
    return false;
}

function saveForm(e)
{
    copyRun();
    return false;
}

function showStorageForm(e)
{
    showStorageRun();
    return false;
}

function clearForm(e)
{
    clearRun();
    return false;
}

// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
function getAllElements()
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
}

function getAllUniqueElementNames()
{
    var names = [];
    var allElements = getAllElements();
    for (let key in allElements) {
        var elementName = allElements[key].name;
        if (names.indexOf(elementName) === -1) {
            names.push(elementName);
        }
    }

    return names;
}

function getConvertElementMessage(element, value)
{
    let type = element.type;
    switch(type) {
        case 'select-one':      type = 'sel-one';   break;
        case 'select-multiple': type = 'sel-mult';  break;
    }

    let myType = type + php.str_repeat("&nbsp;", (8-type.length));
    value = php.htmlspecialchars(value);
    value = stringUtil.cropWord(value, 50, '<span style="color:#6666ff"> ...</span>')
    return myType + ' <span style="color:#66ff66">' + element.name + '</span> ' + value;
}

function copyRun()
{
    let names = getAllUniqueElementNames();
    let message = '';
    let otherMessage = '';
    let copyCount = 0;
    let totalCount = 0;
    for (let index in names) {

        totalCount++;
        let name = names[index];
        let value = formManager.getValue(name);
        let element = document.getElementsByName(name)[0];

        // 不儲存空值
        if (value === null || value === undefined || value === "") {
            otherMessage += '&nbsp; ' + getConvertElementMessage(element, '');
            otherMessage += '<br>';
            continue;
        }
        // 不儲存空陣列
        if (Object.prototype.toString.call(value) === '[object Array]' && value.length < 1) {
            otherMessage += '&nbsp; ' + getConvertElementMessage(element, '');
            otherMessage += '<br>';
            continue;
        }

        // 儲存到 local-storage
        localStorageManager.set(name, value);
        copyCount++;
        
        // 顯示
        message += '+ ' + getConvertElementMessage(element, value);
        message += '<br>';
    }

    if (message) {
        otherMessage += '<br>';
        dialog.show(
            `${message} ${otherMessage} Copy ${copyCount}/${totalCount} items count`
        );
    }
    else {
        dialog.show('not copy anything');
    }
}

function pasteRun()
{
    let names = getAllUniqueElementNames();
    let message = '';
    let otherMessage = '';
    let updateCount = 0;
    let totalCount = 0;
    for (let index in names) {
    
        totalCount++;
        let name = names[index];
        let element = document.getElementsByName(name)[0];

        // 讀取自 local-storage
        let value = localStorageManager.get(name);

        // 不理會空值
        if (value === null || value === undefined || value === '') {
            otherMessage += '&nbsp; ' + getConvertElementMessage(element, '');
            otherMessage += '<br>';
            continue;
        }

        updateCount++;
        formManager.setValue(name, value);
        
        // 顯示
        message += 'v ' + getConvertElementMessage(element, value);
        message += '<br>';
    }

    if (totalCount > 0) {
        otherMessage += '<br>';
        dialog.show(
            `${message} ${otherMessage} Paste ${updateCount}/${totalCount} items count`
        );
    }
    else {
        dialog.basic('Not paste anything');
    }
}

/**
 * 顯示 local storage 裡面的值
 */
function showStorageRun()
{
    let all = localStorageManager.getAll();
    let message = '';

    for (let key in all)
    {
        var value = all[key];
        message += `
            <div>
                <a href="javascript:void(0)"
                   style="color: #ff8888;"
                   onclick="publicModule.remove('${key}'); publicModule.removeElement(this);">Remove</a>
                ${key}
            </div>`;
    }

    if (message) {
        dialog.show(`<div>${message}</div>`);
    }
    else {
        dialog.basic(`<div>Nothing</div>`);
    }
}

function clearRun() {

    let all = localStorageManager.getAll();
    let len = 0;
    for (let index in all) {
        len++;
    }

    if (len) {
        localStorageManager.clearAll();
        
    }
    dialog.basic(`<div>Clear ${len} items count</div>`);
}




// --------------------------------------------------------------------------------
//  public to window
// --------------------------------------------------------------------------------
window.publicModule =
{
    remove: function(key)
    {
        localStorageManager.remove(key);
    },

    removeElement: function(element, layer=2)
    {
        domUtil.removeElement(element, layer);
    },
};

