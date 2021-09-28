import axios from 'axios';

export default {
	async getRoomsFromApi(context) {
		try {
			const res = await axios.get(
				`${context.$store.getters.getURL}/api/rooms`
			);
			//console.log(res.data)
			return res.data
		} catch (e) {
			console.log(e);
			return false
		}
	}
};
