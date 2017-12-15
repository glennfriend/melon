//import domUtil from './common/domUtility.js';
//import php from 'phpjs';
//import './styles.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import routerConfig from './router';
Vue.use(VueRouter);
var router = new VueRouter(routerConfig)
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});







// --------------------------------------------------------------------------------
//  init
// --------------------------------------------------------------------------------



// --------------------------------------------------------------------------------
// 
// --------------------------------------------------------------------------------
(function(){

})();


// --------------------------------------------------------------------------------
//  public to window
// --------------------------------------------------------------------------------
window.publicModule =
{
    hello: function()
    {
        console.log('hello world');
    },

};

