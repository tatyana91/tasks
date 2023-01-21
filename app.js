require('./bootstrap');

import { createApp } from 'vue'
import { i18nVue } from 'laravel-vue-i18n'
import App from './App.vue'
import router from './router'

let app = createApp(App).use(i18nVue, {
                            lang: 'ru',
                            fallbackLang: 'en',
                            resolve: lang => import(`../lang/${lang}/${lang}.json`),
                        }).use(router);
app.mount('#app');
