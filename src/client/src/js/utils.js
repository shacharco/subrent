export async function fetchJson(url, json, method="POST") {
	const baseUrl = "http://localhost:8080";
	const fetchOptions = {
		
		method: method,
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}
	};
	if(json){
		fetchOptions.body = JSON.stringify(json);
	}
	console.log(fetchOptions)

	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		console.log("response not ok")
		return undefined;
	}
	return response.json();
}

export async function getUser() {
	return await fetchJson("/api/currentUser", null, "GET");
}