import { fetchJson, getUser } from "./utils.js";

var userVue = new Vue({
	el: '#user-profile',
	data: {
		user: {
			rentals: []
		},
		toShowResults: false
	},
	created(){
		getUser().then(user_info => {
			if(user_info){
				this.getRentals().then(rentals => {
					console.log(rentals)
					this.user = user_info;
					this.user.rentals = rentals;
				});
			}
		});

	},
	methods:{
		removeItem: async function (rental){
			const removed = await fetchJson("/removeItem", rental);
			this.getRentals().then(rentals => {
				this.user.rentals = rentals;
				this.toShowResults = false;
				this.toShowResults = true;

			});
		},
		showResults: function (){
			this.toShowResults = !this.toShowResults;
		},
		getRentals: async function () {
			return await fetchJson("/user_rentals", {});
		}
	}
});
