import index from './views/index.vue'
import form from './views/form.vue'
import liveCycle from './views/live_cycle.vue'

export default {
    routes: [
        {
            path: '/index',
            component: index
        },
        {
            path: '/form',
            component: form
        },
        {
            path: '/live_cycle',
            component: liveCycle
        },
    ]
}