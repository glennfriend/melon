//import './styles.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import routerConfig from './router';

// --------------------------------------------------------------------------------
//  init
// --------------------------------------------------------------------------------
Vue.use(VueRouter);

var router = new VueRouter(routerConfig)
new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});


// --------------------------------------------------------------------------------
//  public to window
// --------------------------------------------------------------------------------
/*
window.vue2_sample_publicModule =
{
    hello: function()
    {
        console.log('hello world');
    },

};
*/
