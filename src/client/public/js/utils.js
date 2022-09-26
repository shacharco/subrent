export async function fetchJson(url, json) {
	const fetchOptions = {
		
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(json)
	};
	console.log(fetchOptions.body)

	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		console.log("response not ok")
		return undefined;
	}
	return response.json();
}

export async function getUser() {
	return await fetchJson("/user_info");
}