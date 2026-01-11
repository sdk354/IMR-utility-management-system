import {apiRequest} from './api';

export const dashboardService = {
	getStats: async () => {
		return await apiRequest("/reports/summary");
	}, getRecentAlerts: async () => {
		return await apiRequest("/reports/alerts");
	}, getPendingComplaintsCount: async () => {
		return await apiRequest("/complaints/count/pending");
	}
};