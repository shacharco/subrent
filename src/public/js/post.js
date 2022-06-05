import { fetchJson } from "./utils.js";

var successVue = new Vue({
	el: '#MainDiv',
	data: {
		success: false
	},
	methods: {
		handleFormSubmit: async function (event) {
			event.preventDefault();
			console.log("handleee")
			const form = event.currentTarget;
			const url = "/rent";
			try {
				console.log(url)
				const formData = new FormData(form);
				const plainFormData = Object.fromEntries(formData.entries());
				console.log(plainFormData)
				const responseData = await fetchJson(url, plainFormData);
				if(responseData == true){
					successVue.success = true;
				}
				console.log({ responseData });
			} catch (error) {
				console.error(error);
			}
		}
	}
});
