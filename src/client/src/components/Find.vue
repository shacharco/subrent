<template lang="pug">
main.et-main
    div#main
        div.wrap
            div.search
                input.searchTerm#searchTerm(type="text" placeholder="What are you looking for?")
                button.searchButton#searchButton(type="submit" v-on:click="handleSearch($event)")
                    i.fa search
        div#results
                li.result(v-for="rental in rentals")
                    card(:rental="rental")
</template>

<script>
import { fetchJson } from "../js/utils.js";
import card from "./Card.vue"
export default {
    name: 'Find',
    components: {
        card
    },
    data() {
        return {
            rentals: {},
            query: "",
        }
    },
    methods: {
        updateRentals: async function (url, query){
			console.log("updateingrentals");
			console.log(url);
			console.log(query);
			console.log(url+"?"+new URLSearchParams(query));
			const responseData = await fetchJson(url+"?"+new URLSearchParams(query), null, "GET");
			console.log("updated");
			console.log(responseData);
			this.query = query;
			this.rentals = responseData;
			return responseData;
		},
		removeItem: async function (rental){
			const removed = await fetchJson("/api/item", rental, "DELETE");
			this.updateRentals("/api/rentals", this.query);
		},
		handleSearch: async function (event){
			event.preventDefault();
			const searchTerm = document.getElementById("searchTerm");
			const url = "/api/rentals";
			try {
				const query = {search: JSON.stringify({"name": searchTerm.value})};
				this.updateRentals(url, query);
			} catch (error) {
				console.error(error);
			}
		}
	},
	created(){
		this.updateRentals("/api/rentals", {search: "{}"});
	}
}
</script>

<style scoped>
    @import '../css/search.css';
</style>