import util from './common/browserUtility.js';
import dialog from './common/dialog.js';
import localStorageManager from './common/localStorageManager.js';
import mousetrap from 'mousetrap';
import php from 'phpjs';
import './styles.css';

// --------------------------------------------------------------------------------
//  init
// --------------------------------------------------------------------------------
localStorageManager.init(localStorage, 'fft_');
//console.log(localStorageManager.getAll());
//console.log(localStorageManager.get('update_time'));
//console.log(localStorageManager.get('sub_status[]'));


// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
(function(){
    // dev only
    console.clear();

    //
    Mousetrap.bind(['alt+1'], rewriteForm);
    Mousetrap.bind(['alt+2'], saveForm);
    Mousetrap.bind(['alt+3'], clearForm);
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
    let elements;
    var allElements = [];

    //
    elements = document.querySelectorAll("input");
    for (let key in elements) {
        if (elements.hasOwnProperty(key)) {
            allElements.push(elements[key]);
        } 
    }

    elements = document.querySelectorAll("select");
    for (let key in elements) {
        if (elements.hasOwnProperty(key)) {
            allElements.push(elements[key]);
        } 
    }

    return allElements;
}

function getConvertElementMessage(element, value)
{
    let type = element.type;
    switch(type) {
        case 'select-one':      type = 'sel-one';   break;
        case 'select-multiple': type = 'sel-many';  break;
    }

    let myType = type + php.str_repeat("&nbsp;", (8-type.length));
    if (value.length > 100) {
        value = php.htmlspecialchars(value.substr(0, 100)) + '<span style="color:#6666ff"> ...</span>';
    }
    else {
        value = php.htmlspecialchars(value);
    }

    return myType + ' <span style="color:#66ff66">' + element.name + '</span> ' + value;
}

function copyRun()
{
    var elements = getAllElements();
    var message = '';
    for (let index in elements) {
        var element = elements[index];
        
        if (! element.name) {
            continue;
        }


        //
        if (-1 != ["text", "textarea", "hidden", "email", "tel", "date"].indexOf(element.type)) {
            if( element.value!='' ) {
                localStorageManager.set( element.name , element.value );
                message += getConvertElementMessage(element, element.value);
                message += '<br>';
            }

        } else if ( element.type=="checkbox" ) {
            // save true/false
            localStorageManager.set( element.name , element.checked );
            message += getConvertElementMessage(element, element.checked);
            message += '<br>';

        } else if (element.type=="radio") {
            if (element.checked===true) {
                // save value
                localStorageManager.set( element.name , element.value );
                message += getConvertElementMessage(element, element.value);
                message += '<br>';
            }

        } else if (element.type=="select-one") {
            for (var select_index=0 ; select_index < element.length ; select_index++ ) {
                if( element[select_index].selected===true &&
                    element[select_index].value!='' &&
                    element[select_index].value!=0 )
                 {
                    localStorageManager.set( element.name , select_index );
                    message += getConvertElementMessage(element, element.value);
                    message += '<br>';
                }
            }

        } else if ( element.type=="select-multiple" ) {
            for( var select_index=0 ; select_index < element.length ; select_index++ ) {
                if( element[select_index].selected===true &&
                    element[select_index].value!='' &&
                    element[select_index].value!=0 )
                 {
                    localStorageManager.set( element.name , select_index );
                    message += getConvertElementMessage(element, element.value);
                    message += '<br>';
                }
            }

        } else {
            // nothing
            message += getConvertElementMessage(element, '? (not save)');
            message += '<br>';
        }

    }

    if (message) {
        dialog.show(message);
    }
    else {
        dialog.show('not copy anything');
    }

}

function pasteRun()
{
    var type,name,data;
    let elements = getAllElements();
    for (let index in elements) {
        let element = elements[index];

        if (! element.name) {
            continue;
        }

        type = element.type;
        name = element.name;
        data = localStorageManager.get( name );
        if (null === data) {
            continue;
        }

        if (-1 != ["text", "textarea", "email", "tel", "date"].indexOf(type)) {
            try{ element.value = data; } catch(e) {}
        }
        else if ( type=="checkbox" ) {
            try{ element.checked = data; } catch(e) {}
        }
        else if ( type=="radio" ) {
            if( element.value != data ) { continue; }
            try{ element.checked = true; } catch(e) {}
        }
        else if ( type=="select-one" ) {
            try{ element[data].selected = true; } catch(e) {}
        }
        else {
            //nothing
        }
    }
    
    dialog.basic('Paste');
}





var _help = '';
function _add_help(str) {
    _help += str+"<br>\n";
}

function _new_help(str) {
    _help = str;
}

function clearRun() {

    let all = localStorageManager.getAll();
    let msg = '';

    for (let key in all)
    {
        // msg += `<div>[Enable] [Disable] ${key}</div>`
        msg += `<div>${key}</div>`
    }

    if (msg) {
        let message = `<div>${msg}</div><input type="button" value="Delete All" onclick="publicModule.clearAll()">`;
        dialog.show(message);
    }
    else {
        dialog.basic(`<div>Nothing</div>`);
    }

}

// --------------------------------------------------------------------------------
//  public to window
// --------------------------------------------------------------------------------
window.publicModule =
{
    clearAll: function()
    {
        localStorageManager.clearAll();
    },
};
