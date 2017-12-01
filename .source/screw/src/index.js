// import {showCurrent}    from './common/showCurrent.js';
// import {getConfig}      from './common/getConfig.js';
// import util             from './common/browserUtility.js';
// import cookies          from './common/cookies.js';
// import element          from './common/element.js';
// import php              from 'phpjs';
import controllersList  from './http/controllersList.js';
import route            from './http/route.js';
import './styles.css';


if (window.screw) {
    console.log('%c[Alert] "window.screw" exists, will cover the value !' ,'color:red');
}
window.screw = {
    do: function(url, params={}) {
        route.run(url, params);
    },
};

//
if ("8080" === location.port) {
    console.log('%c[Debug Mode] for 8080 port' ,'color:red');
    console.log('=>');
    for (let item in controllersList.getAll()) {
        console.log('    screw.do("' + item + '")');
    }
    console.log('====');
}


// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
//  (function(){
//      util.docReady(function(){
//          main();
//      });
//  })();
// 
//  function main()
//  {
//      //
//      if (cookies.get('glenn_example_is_debug')) {
//          console.log('==== Debug Mode =============');
//          showCurrent();
//      }
//  }
