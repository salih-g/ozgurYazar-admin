import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import TextareaAutosize from 'vue-textarea-autosize';

import App from './App.vue';
import router from './router';
import store from './store';

import './assets/css/bootstrap.css';
import './assets/css/main.css';

Vue.config.productionTip = false;
sync(store, router);

Vue.use(TextareaAutosize);
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
