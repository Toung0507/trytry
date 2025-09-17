import './assets/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router' 


// createApp(App).mount('#app')  //createApp(App) + mount 禁止 二度渲染 ，必須關閉，畫面才不會出錯
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
