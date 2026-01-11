import { apiRequest } from './api';

export const customerService = {
	// --- Existing Admin/Management Methods ---
	getAllCustomers: async () => await apiRequest("/users"),
	getCustomerById: async (id) => await apiRequest(`/users/${id}`),
	saveCustomer: async (customerData) => await apiRequest("/users", "POST", customerData),
	updateCustomer: async (id, customerData) => await apiRequest(`/users/${id}`, "PUT", customerData),

	// --- New Functional Methods for Customer Dashboard ---
	getDashboardStats: async () => await apiRequest("/reports/customer-summary"),
	getBills: async () => await apiRequest("/bills/my-bills"),
	getBillById: async (id) => await apiRequest(`/bills/${id}`),

	// ADDED: Profile Methods
	getProfile: async () => await apiRequest("/users/me"),
	updateProfile: async (profileData) => await apiRequest("/users/profile", "PUT", profileData)
};