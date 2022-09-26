<template lang="pug">
main.et-main
    div#main
        p#post-result(v-if="success == true") Success!
        form.sell-form#post-form(v-on:submit.prevent="handleFormSubmit($event)")
            input.form-control(name="email" type="email" placeholder="Email" required)
            input.form-control(name="phone" type="tel" placeholder="Phone" required)
            input.form-control(name="location" type="text" placeholder="Location" required)
            input.form-control(name="quantity" type="number" min="1" max="100" step="1" placeholder="Quantity" required)
            select.form-control(name="category" placeholder="Category" required)
                option(value="cars") Cars
                option(value="food") Food
                option(value="other") Other
            input.form-control(name="name" type="text" placeholder="Name" required) 
            input.form-control(name="price" type="number" min="1" max="100000" step="0.1" placeholder="Price" required)

            p
                input(name="terms" type="checkbox" id="test" required)
                label(for="test") Accept the 
                    a(href="#terms" style="text-decoration: none; color: inherit; ") terms
            button.btn-submit(type="submit") Post a Rent
</template>

<script>
import {fetchJson} from "../js/utils.js"
export default {
    name: 'Post',
    data() {
        return {
            success: false
        }
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
					this.success = true;
				}
				console.log({ responseData });
			} catch (error) {
				console.error(error);
			}
		}
	}
}
</script>

<style scoped>
    @import "../css/post.css";
</style>