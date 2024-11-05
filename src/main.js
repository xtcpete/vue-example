import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

//vue+vite boiler-plate css
import './assets/main.css'

const app = createApp(App)
app.use(router)

app.mount('#app')