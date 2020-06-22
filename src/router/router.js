import VueRouter from 'vue-router'
import Home from '../pages/Home'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'Home',
            component: Home,
            path: '/'
        },
        {
            path: '*',
            component: Home,
        },

    ]
})
export default router