import {apiRequest} from './api';

export const customerService = {
	getAllCustomers: async () => await apiRequest("/users"),
	getCustomerById: async (id) => await apiRequest(`/users/${id}`),
	saveCustomer: async (customerData) => await apiRequest("/users", "POST", customerData),
	updateCustomer: async (id, customerData) => await apiRequest(`/users/${id}`, "PUT", customerData),

	getDashboardStats: async () => await apiRequest("/reports/customer-summary"),
	getBills: async () => await apiRequest("/bills/my-bills"),
	getBillById: async (id) => await apiRequest(`/bills/${id}`),

	getProfile: async () => await apiRequest("/users/me"),
	updateProfile: async (profileData) => await apiRequest("/users/profile", "PUT", profileData)
};