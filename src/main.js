import { createApp } from "vue"
//import VueStorage from 'vue-ls'
//import config from '@/config/defaultSettings'
import App from "./App.vue"
import router from "./router"
import store from "./store"
//import ant from "./utils/ant_cps"
import "./base-ui/css/base.css"


import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

router.beforeEach((to,from,next)=>{
    if(to.meta.title)
    {
        document.title=to.meta.title
    }
    next()
})

const app = createApp(App)
app.use(store)
app.use(router)
//app.use(ant)
//app.use(VueStorage, config.storageOptions)
app.use(Antd);
app.mount("#app")
