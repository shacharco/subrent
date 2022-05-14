export async function fetchJson(url, json) {
	const fetchOptions = {

		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(json)
	};
	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		return undefined;
	}
	return response.json();
}
