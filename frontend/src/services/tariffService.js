const BASE_URL = 'http://localhost:8080/api/tariffs';

const getAuthHeader = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return {
		'Authorization': `Bearer ${user?.token}`, 'Content-Type': 'application/json'
	};
};

export const tariffService = {
	getAllTariffs: async () => {
		const response = await fetch(BASE_URL, {
			headers: getAuthHeader()
		});
		if (!response.ok) throw new Error('Failed to fetch tariffs');
		return await response.json();
	},

	getTariffById: async (id) => {
		const response = await fetch(`${BASE_URL}/${id}`, {
			headers: getAuthHeader()
		});
		if (!response.ok) throw new Error('Failed to fetch tariff details');
		return await response.json();
	},

	createTariff: async (tariffData) => {
		const response = await fetch(BASE_URL, {
			method: 'POST', headers: getAuthHeader(), body: JSON.stringify(tariffData)
		});
		if (!response.ok) throw new Error('Failed to create tariff');
		return await response.json();
	},

	updateTariff: async (id, tariffData) => {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'PUT', headers: getAuthHeader(), body: JSON.stringify(tariffData)
		});
		if (!response.ok) throw new Error('Failed to update tariff');
		return await response.json();
	}
};