import { createRouter, createWebHistory } from 'vue-router'

const baseUrl = import.meta.env.BASE_URL;

const routes = [
    {
        name: "Main",
        path: baseUrl,
        component: () => import('../pages/MainPage.vue'),
    },
    {
        name: "PersonalAccount",
        path: `${baseUrl}/personal`,
        component: () => import('../pages/PersonalAccount.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;