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


// window.onload = function() {
//     const postForm = document.getElementById("post-form");
//     console.log(postForm);

//     postForm.addEventListener("submit", handleFormSubmit);

// };


async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {

		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: formDataJsonString,
	};
	const response = await fetch(url, fetchOptions);
	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}
	return response.json();
}

