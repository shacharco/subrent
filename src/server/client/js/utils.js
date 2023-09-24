export async function fetchJson(url, json, method="POST") {
	let headers = {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
	let body = null;
	if(json){
		body = JSON.stringify(json);
	}
	return await fetchSelf(url, headers, body, method);
}
export async function fetchSelf(url, headers, body, method="POST") {
	const baseUrl = "http://localhost:8080";
	console.log(url);
	const fetchOptions = {
		
		method: method,
		headers: headers
	};
	if(body){
		fetchOptions.body = body;
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