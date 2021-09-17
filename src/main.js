import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';

const socket = io(
	`${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
	{
		transports: ['websocket', 'polling'],
	}
);

createApp(App)
	.use(store)
	.use(router)
	.use(VueSocketIOExt, socket, { store })
	.mount('#app');
