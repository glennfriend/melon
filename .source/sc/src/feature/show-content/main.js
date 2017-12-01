import './main.css';

/**
 *
 */
function sc_show_content_init()
{
    var debug = true;
    var classMains = document.getElementsByClassName("sc-show-content-main");
    var classSubs  = document.getElementsByClassName("sc-show-content-sub");

    if (classMains.length <= 0 || classSubs.length <= 0) {
        if (debug) {
            console.log('sc-show-content: mains or subs not found any class-name');
        }
        return;
    }

    // subs 用途是被 mains 關連
    // 所以 subs 記錄 id 做 hash-table, 以利於 mains 取得
    var subs  = [];
    for (var i in classSubs) {
        var el = classSubs[i];
        if (!el.dataset) {
            continue;
        }
        if (typeof(el.dataset.scId)=="undefined") {
            continue;
        }
        var id = el.dataset.scId;
        subs[id] = el;
    }

    // mains bind click
    for (var i in classMains) {
        var main = classMains[i];
        if (!main.dataset) {
            continue;
        }
        if (typeof(main.dataset.scId) == "undefined") {
            continue;
        }

        // 如果 main 對應的 sub 不存在就略過
        var id = classMains[i].dataset.scId;
        if (!subs[id]) {
            continue;
        }
        var sub = subs[id];

        // bind click
        main.addEventListener("click", function(event) {
            if (-1 !== ['none',''].indexOf(this.style.display)) {
                this.style.display = 'inline';
            }
            else {
                this.style.display = 'none';
            }
        }.bind(sub), false);
    }
}


window.sc_show_content_init = sc_show_content_init;