import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: "Main",
        path: "/",
        component: () => import('../pages/MainPage.vue'),
    },
    {
        name: "Registration",
        path: "/registration",
        component: () => import('../pages/RegistrationPage.vue'),
    },
    {
        name: "PersonalAccount",
        path: "/personalAccount",
        component: () => import('../pages/PersonalAccount.vue'),
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;