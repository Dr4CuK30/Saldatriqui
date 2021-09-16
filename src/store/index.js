import { createStore } from 'vuex';
import auth from '../services/auth';

const store = createStore({
	state: {
		auth: false,
		userData: null,
		apiData: {
			url: process.env.VUE_APP_API_URL,
			port: process.env.VUE_APP_API_PORT,
		},
		roomId: null,
	},
	getters: {
		getURL(state) {
			return `${state.apiData.url}:${state.apiData.port}`;
		},
	},
	mutations: {
		loadUser(state, data) {
			localStorage.setItem('token', data.jwt);
			state.userData = data.user;
			state.auth = true;
		},
		logout(state) {
			localStorage.removeItem('token');
			state.userData = null;
			state.auth = false;
		},
		authState(state, isAuth) {
			state.auth = isAuth;
		},
	},
	actions: {
		async authJwt(context) {
			if (!localStorage.getItem('token')) {
				context.commit('logout');
				return;
			}
			const isAuth = await auth.authToken(context);
			context.commit('authState', isAuth);
		},
	},
	modules: {},
});

export default store;
