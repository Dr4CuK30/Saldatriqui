import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const socket = io(
	`${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
	{
		transports: ['websocket', 'polling'],
	}
);

library.add([faSyncAlt, faChevronRight]);

createApp(App)
	.component('font-awesome-icon', FontAwesomeIcon)
	.use(store)
	.use(router)
	.use(VueSocketIOExt, socket, { store })
	.mount('#app');
