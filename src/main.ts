import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// import './style.css';
import App from './App.vue';

// 路由配置
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/button',
            component: () => import('./routers/button.vue')
        },
        {
            path: '/avator',
            component: () => import('./routers/avator.vue')
        },
        {
            path: '/input',
            component: () => import('./routers/input.vue')
        },
        {
            path: '/cascader',
            component: () => import('./routers/cascader.vue')
        },
        {
            path: '/dropselect',
            component: () => import('./routers/dropselect.vue')
        },
        {
            path: '/date-time-picker',
            component: () => import('./routers/date-time-picker.vue')
        },
    ]
});
const app = createApp(App);
app.use(router);
app.mount('#app');
