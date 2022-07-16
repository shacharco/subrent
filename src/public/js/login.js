import { getUser, fetchJson } from "./utils.js";

var tabsVue = new Vue({
	el: '#tabs',
	data: {
		user: undefined
	},	
	mounted: async function () {
		this.$nextTick(async function () {
		  this.user = await getUser();
		})
	  },
	methods: {
		signin: async function (){
			let response = await fetchJson("/auth/local", {email:"admin"});
			this.user = response;
		}
	}

});
