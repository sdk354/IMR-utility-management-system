import { apiRequest } from './api';

export const meterService = {
	getAllMeters: async (page = 0, size = 10) => {
		return await apiRequest(`/meters?page=${page}&size=${size}`, 'GET');
	},
	getMeterById: async (id) => {
		return await apiRequest(`/meters/${id}`, 'GET');
	},
	createMeter: async (meterData) => {
		return await apiRequest('/meters', 'POST', meterData);
	},
	updateMeter: async (id, meterData) => {
		return await apiRequest(`/meters/${id}`, 'PUT', meterData);
	},

	// ADD THIS: Links the Manual Entry Form to the Meter_Reading table
	addReading: async (readingData) => {
		// Points to /api/readings (The new controller you'll add)
		return await apiRequest('/readings', 'POST', readingData);
	}
};