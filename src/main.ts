import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import '@/assets/style/reset.css';
import '@/registerServiceWorker';

createApp(App).use(createPinia()).use(createPinia()).use(router).mount('#app');
