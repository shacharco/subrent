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
			const responseData = await fetchJson(url+"?"+new URLSearchParams(query), null, "GET");
			this.query = query;
			this.rentals = responseData;
			return responseData;
		},
		removeItem: async function (rental){
			const removed = await fetchJson("/item", rental, "DELETE");
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
		}
	},
	created(){
		this.updateRentals("/rentals", {search: ""});
	}
}
</script>

<style scoped>
    @import '../css/search.css';
</style>