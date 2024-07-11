//import './assets/main.css'

import { createApp } from 'vue'
import App from './components/app/App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const app = createApp(App)

app.use(router)

app.mount('#app')
