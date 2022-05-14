var rentalsVue = new Vue({
	el: '#results',
	data: {
		rentals: {},
		query: "",
		user: undefined
	},
	methods: {
		updateRentals: async function (url, query){
			const responseData = await postSearchQueryAsJson({ url, query });
			this.query = query;
			this.rentals = responseData;
			return responseData;
		},
		removeItem: async function (rental){
			const removed = await postRentalAsJson("/removeItem", rental);
			this.updateRentals("/rentals", this.query);
		}
	},
	created(){
		getUser().then(user_info => {
			this.user = user_info;
		});
	}
});

window.onload = function() {
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", handleSearch);
	rentalsVue.updateRentals("/rentals", {search: ""});
};
async function handleSearch(event) {

    event.preventDefault();
	const searchTerm = document.getElementById("searchTerm");
	const url = "/rentals";

	try {

		const query = {search: searchTerm.value};
		rentalsVue.updateRentals(url, query);

	} catch (error) {
		console.error(error);
	}
}
async function postSearchQueryAsJson({ url, query }) {
	const fetchOptions = {

		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(query),
	};
	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();
}

async function postRentalAsJson(url, rental) {
	const fetchOptions = {

		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(rental),
	};
	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return true;
}
async function fetchJson(url) {
	const fetchOptions = {

		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: ""
	};
	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		return undefined;
	}
	return response.json();
}

async function getUser() {
	let userData = await fetchJson("/user_info");
	console.log("user data");
	console.log(userData);
	return userData;
}