import { createRouter, createWebHashHistory } from 'vue-router';
import Signin from '../views/Signin';
import Game from '../views/Game';
import Menu from '../views/Menu';
import store from '../store';
const routes = [
	{
		path: '/signin',
		component: Signin,
		meta: {
			title: 'Ingresar',
		},
	},
	{
		path: '/game',
		meta: {
			requiresAuth: true,
			title: 'Jugando',
		},
		component: Game,
	},
	{
		path: '/menu',
		meta: {
			requiresAuth: true,
			title: 'Menu',
		},
		component: Menu,
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: (to) => {
			return '/signin';
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	await store.dispatch('authJwt');
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.state.auth) {
			if (to.path == '/menu') {
				if (localStorage.getItem('roomId'))
					next({ path: '/game' });
			} else if (to.path == '/game') {
				if (!localStorage.getItem('roomId'))
					next({ path: '/menu' });
			}
			next();
		} else {
			next({ path: '/signin' });
		}
	} else {
		next();
	}
});

router.afterEach((to, from) => {
	document.title = `${to.meta.title} - SaldaTriqui`;
});

export default router;
