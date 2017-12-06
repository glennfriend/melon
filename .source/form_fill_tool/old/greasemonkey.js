// ==UserScript==
// @name        Form-Pre-Fill
// @author      glenn ; 最初的作者 Aaron Bassett http://foobr.co.uk , modify in "Comment Pre-fill"
// @description ALT+1 is paste
// @description ALT+2 is copy
// @description ALT+3 is clear
// @version     2.2
// @include     http*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

/*
    程式版本 v1.0 - 2009-02-10 能調用 text, textarea
             v1.1 - 2009-02-11 能調用 select-one, checkbox, checkbox[], radio
             v1.2 - 2009-03-27 ALT+3 可以清除這個網頁上 name 名稱的所有設定
             v2.0 - 2012-03-12 改成 JQuery 版本
             v2.1 - 2017-04-25 增加 email, tel 的 type
             v2.2 - 2017-06-02 upgrade jquery to 3.2.1
             v2.2 - 2017-06-02 fix select-one, select-multiple bug


    本程式感謝以下資源:
        http://www.firefox.net.cn/dig/toc/index.html

    使用說明:
        有資料才會儲存,沒資料不儲存
            text
            textarea
            email
            tel
        有選擇才會儲存,沒資料不儲存
            select-one
            radio
        全部儲存
            checkbox

*/

var _help='';    //儲存 debug information

/**
 * Slightly compressed version of shortcuts.js
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */
function shortcut(shortcut,callback,opt) {
    var default_options = {'type':'keydown','propagate':false,'target':document}
    if(!opt) opt = default_options;
    else {for(var dfo in default_options) {if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];}}
    var ele = opt.target;
    if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
    var ths = this;
    var func = function(e) {
        e = e || window.event;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;
        var character = String.fromCharCode(code).toLowerCase();
        var keys = shortcut.toLowerCase().split("+");
        var kp = 0;
        var shift_nums = {"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"}
        var special_keys = {'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123}
        for(var i=0; k=keys[i],i<keys.length; i++) {
            if(k == 'ctrl' || k == 'control') {if(e.ctrlKey) kp++;
            } else if(k ==  'shift') {if(e.shiftKey) kp++;
            } else if(k == 'alt') {if(e.altKey) kp++;
            } else if(k.length > 1) { if(special_keys[k] == code) kp++;
            } else { if(character == k) kp++;
                else {if(shift_nums[character] && e.shiftKey) {
                        character = shift_nums[character];
                        if(character == k) kp++;
                    }
                }
            }
        }
        if(kp == keys.length) {
            callback(e);
            if(!opt['propagate']) {
                e.cancelBubble = true;
                e.returnValue = false;
                if (e.stopPropagation) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                return false;
            }
        }
    }
    if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
    else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
    else ele['on'+opt['type']] = func;
}

function _new_help(str) {
    _help = str;
}

function _add_help(str) {
    _help += str+"\n";
}

function _get_data(name) {
    return GM_getValue('formprefill_'+name);
}

function _set_data(name,data) {
    return GM_setValue('formprefill_'+name,data);
}

(function(){

    function getAllElements()
    {
        var items = [
            $("form input"),
            $("form select")
        ];

        var elements = [];
        var index = 0;
        for (var itemIndex in items) {
            for (var key in items[itemIndex]) {
                elements[index++] = items[itemIndex][key];
            }
        }

        return elements;
    }

    function copyShortcutRun() {

        var elements = getAllElements();
        for (var index in elements) {
            var element = elements[index];

            if ( -1 != ["text", "textarea", "hidden", "email", "tel"].indexOf(element.type) ) {
                if( element.value!='' ) {
                    _set_data( element.name , element.value );
                    if( element.type=='text' )     { var type_string = '[text            ] ';   }
                    if( element.type=='email' )    { var type_string = '[email         ] ';     }
                    if( element.type=='tel' )      { var type_string = '[tel              ] ';  }
                    if( element.type=='textarea' ) { var type_string = '[textarea    ] ';       }
                    if( element.type=='hidden' )   { var type_string = '[hidden      ] ';       }
                    _add_help( type_string + element.name + '= ' + element.value );
                }

            } else if ( element.type=="checkbox" ) {
                // save true/false
                _set_data( element.name , element.checked );
                _add_help( '[checkbox  ] ' + element.name + '= ' + element.checked );

            } else if (element.type=="radio") {
                if (element.checked===true) {
                    // save value
                    _set_data( element.name , element.value );
                    _add_help( '[radio          ] ' + element.name + '= ' + element.value );
                }


            } else if (element.type=="select-one") {
                for (var select_index=0 ; select_index < element.length ; select_index++ ) {
                    if( element[select_index].selected===true &&
                        element[select_index].value!='' &&
                        element[select_index].value!=0 )
                     {
                        _set_data( element.name , select_index );
                        _add_help( '[sel-1:index ] ' + element.name + '= ' + element.value );
                    }
                }

            } else if ( element.type=="select-multiple" ) {
                for( var select_index=0 ; select_index < element.length ; select_index++ ) {
                    if( element[select_index].selected===true &&
                        element[select_index].value!='' &&
                        element[select_index].value!=0 )
                     {
                        _set_data( element.name , select_index );
                        _add_help( '[sel-m:index] ' + element.name + '= ' + element.value );
                    }
                }

            } else {
                // nothing
            }

        }

        if (_help) {
            alert(_help);
            _new_help('');
        } else {
            alert('not copy anything');
        }

    }


    function pasteShortcutRun()
    {
        var type,name,data;
        var elements = getAllElements();
        for (var index in elements) {
            var element = elements[index];

            type = element.type;
            name = element.name;
            data = _get_data( name );
            if( typeof data == 'undefined' ) {
                continue;
            }

            if (-1 != ["text", "textarea", "email", "tel"].indexOf(type)) {
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
    }




    function clearShortcutRun() {
        var tmp;
        var inputCount = $("form input").length;
        for( var i=0 ; i<inputCount ; i++ ) {
            var element = $("form input")[i];
            switch( element.type ) {
                case "text":            tmp='[text                ]';     break;
                case "email":           tmp='[email            ]';        break;
                case "tel":             tmp='[tel                 ]';     break;
                case "textarea":        tmp='[textarea       ]';          break;
                case "checkbox":        tmp='[checkbox     ]';            break;
                case "radio":           tmp='[radio           ]';         break;
                case "select-one":      tmp='[select-one      ]';         break;
                case "select-multiple": tmp='[select-multiple]';          break;
                //
                case "undefined":       tmp='[undefined      ]';          break;
                case "button":          tmp='[button            ]';       break;
                case "hidden":          tmp='[hidden            ]';       break;
                case "submit":          tmp='[submit            ]';       break;
                default:                tmp='{'+ element.type +'}'; break;
            }
            _set_data( element.name , ''  );
            _add_help( tmp + ' ' + element.name  );

        }

        if(_help) {
            alert("Clear list:\n" + _help);
            _new_help('');
        }

    }

    function LoadJquery()
    {
        if( typeof(jQuery)!="undefined" ) {
            return true;
        }
        var element = document.createElement('script');
        // var jqueryVersion = "1.7.1";
        var jqueryVersion = "3.2.1";
        element.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + jqueryVersion + '/jquery.min.js';

        element.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(element);
        // Check if jQuery's loaded
        function GM_wait() {
            if( typeof unsafeWindow.jQuery == 'undefined' ) {
                window.setTimeout(GM_wait,100);
            }
            else {
                $ = unsafeWindow.jQuery;
            }
        }
        GM_wait();
    }

    //LoadJquery();
    GM_registerMenuCommand("Copy Prefill Comment",  copyShortcut);
    GM_registerMenuCommand("Paste Prefill Comment", pasteShortcut);
    GM_registerMenuCommand("Clear Prefill Comment", clearShortcut);

    var pasteShortcut = (GM_getValue('pasteShortcut') != undefined && GM_getValue('pasteShortcut') != '') ? GM_getValue('pasteShortcut') : "ALT+1";
    var copyShortcut  = (GM_getValue('copyShortcut')  != undefined && GM_getValue('copyShortcut')  != '') ? GM_getValue('copyShortcut')  : "ALT+2";
    var clearShortcut = (GM_getValue('clearShortcut') != undefined && GM_getValue('clearShortcut') != '') ? GM_getValue('clearShortcut') : "ALT+3";
    shortcut(pasteShortcut,pasteShortcutRun);
    shortcut(copyShortcut,copyShortcutRun);
    shortcut(clearShortcut,clearShortcutRun);


})();
