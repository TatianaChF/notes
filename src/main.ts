import { createApp } from 'vue'
import "./assets/style.css"
import App from './App.vue'
import router from "./utils/router.ts"
import {createPinia} from "pinia"

createApp(App).use(router).use(createPinia()).mount('#app')
