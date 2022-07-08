import { fetchJson, getUser } from "./utils.js";

var rentalsVue = new Vue({
	el: '#MainDiv',
	data: {
		rentals: {},
		query: "",
		user: undefined
	},
	methods: {
		updateRentals: async function (url, query){
			const responseData = await fetchJson(url, query);
			this.query = query;
			this.rentals = responseData;
			return responseData;
		},
		removeItem: async function (rental){
			const removed = await fetchJson("/removeItem", rental);
			this.updateRentals("/rentals", this.query);
		},
		handleSearch: async function (event){
			event.preventDefault();
			const searchTerm = document.getElementById("searchTerm");
			const url = "/rentals";
			try {
				const query = {search: searchTerm.value};
				this.updateRentals(url, query);
			} catch (error) {
				console.error(error);
			}
		},
	},
	created(){
		getUser().then(user_info => {
			this.user = user_info;
		});
		this.updateRentals("/rentals", {search: ""});
	}
});
