const BASE_URL = "http://localhost:8080/api";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
	// FIX: Ensure endpoint starts with a slash to prevent 'apiundefined' or malformed URLs
	const safeEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

	const user = JSON.parse(localStorage.getItem("user"));
	const headers = {};

	// 1. Logic for Content-Type
	if (!(body instanceof FormData)) {
		headers["Content-Type"] = "application/json";
	}

	if (user && user.token) {
		headers["Authorization"] = `Bearer ${user.token}`;
	}

	const config = {
		method,
		headers,
		// 2. Logic for Body: Don't stringify if it's a file/FormData
		body: body instanceof FormData ? body : body ? JSON.stringify(body) : null,
	};

	try {
		// FIX: Use safeEndpoint here
		const response = await fetch(`${BASE_URL}${safeEndpoint}`, config);

		if (response.status === 401) {
			localStorage.removeItem("user");
			window.location.href = "/";
			return null;
		}

		// 3. Handle 204 No Content or empty responses
		if (response.status === 204) return [];

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Something went wrong");
		}

		return data;
	} catch (error) {
		console.error("API Request Error:", error);
		throw error;
	}
};