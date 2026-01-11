const BASE_URL = "http://localhost:8080/api";

export const apiRequest = async (endpoint, method = "GET", body = null) => {
	const safeEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

	const user = JSON.parse(localStorage.getItem("user"));
	const headers = {};

	if (!(body instanceof FormData)) {
		headers["Content-Type"] = "application/json";
	}

	if (user && user.token) {
		headers["Authorization"] = `Bearer ${user.token}`;
	}

	const config = {
		method, headers, body: body instanceof FormData ? body : body ? JSON.stringify(body) : null
	};

	try {
		const response = await fetch(`${BASE_URL}${safeEndpoint}`, config);

		if (response.status === 401) {
			localStorage.removeItem("user");
			window.location.href = "/";
			return null;
		}

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