import { createRouter, createWebHashHistory } from 'vue-router';
import Signin from '../views/Signin';
import Game from '../views/Game';
import Menu from '../views/Menu';
import store from '../store';
const routes = [
	{
		path: '/signin',
		component: Signin,
	},
	{
		path: '/game',
		meta: {
			requiresAuth: true,
		},
		component: Game,
	},
	{
		path: '/menu',
		meta: {
			requiresAuth: true,
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
			next();
		} else {
			next({ path: '/signin' });
		}
	} else {
		next();
	}
});

export default router;
