import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router/index'
import './style.css'
import 'element-plus/dist/index.css'
import store from './store/index'
import * as echarts from "echarts"

// createApp(App).use(ElementPlus).use(router).use(store).mount('#app')

const app = createApp(App)
app.use(ElementPlus).use(router).use(store)
app.config.globalProperties.$ECharts = echarts
app.mount('#app')
