import {apiRequest} from './api';

const AUTH_URL = "/auth";

export const authService = {
	login: async (username, password) => {
		const data = await apiRequest(`${AUTH_URL}/login`, "POST", {username, password});
		if (data.token) {
			localStorage.setItem("user", JSON.stringify(data));
		}
		return data;
	},

	register: async (userData) => {
		return apiRequest(`${AUTH_URL}/register`, "POST", userData);
	},

	logout: () => {
		localStorage.removeItem("user");
	},

	getCurrentUser: () => {
		const userStr = localStorage.getItem("user");
		if (!userStr) return null;
		try {
			return JSON.parse(userStr);
		} catch (error) {
			console.error("Error parsing user from localStorage", error);
			return null;
		}
	}
};