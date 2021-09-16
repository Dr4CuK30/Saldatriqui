import axios from 'axios';

export default {
	async login(context, user, password) {
		const data = {
			usuario: user,
			password,
		};
		try {
			const res = await axios.post(
				`${context.$store.getters.getURL}/api/auth/login`,
				data
			);
			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				context.$store.state.user = res.data.usuariox;
				return true;
			}
		} catch (e) {
			return false;
		}
	},

	async authToken(store) {
		const res = await axios.get(
			`${store.getters.getURL}/api/auth/token`,
			{
				headers: {
					tokenx: localStorage.getItem('token'),
				},
			}
		);
		if (res.status == 200) {
			return true;
		}
		return false;
	},
};
