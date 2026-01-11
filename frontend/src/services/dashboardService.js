import { apiRequest } from './api';

export const dashboardService = {
	/**
	 * Fetches the main summary metrics (Customers, Meters, Balance, and Revenue Trend)
	 * Calls: @GetMapping("/api/reports/summary")
	 */
	getStats: async () => {
		return await apiRequest("/reports/summary");
	},

	/**
	 * Optional: Fetches active alerts for the "Recent Alerts" section
	 * Calls: @GetMapping("/api/reports/alerts")
	 */
	getRecentAlerts: async () => {
		return await apiRequest("/reports/alerts");
	},

	/**
	 * Optional: Quick count for the pending complaints button
	 * Calls: @GetMapping("/api/complaints/count/pending")
	 */
	getPendingComplaintsCount: async () => {
		return await apiRequest("/complaints/count/pending");
	}
};