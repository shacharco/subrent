<template lang="pug">
main.et-main
  div.app
    div.top-aligner
      div.search-bar-wrapper
        div.search-bar(style="background-color: rgba(0,0,0, 0.2)")
          button.white.settings-button(type="button")
            i filter
          input#search-bar-input.bar-input.white(autocomplete="off" placeholder="Search" type="text" v-on:keyup.enter="handleSearch($event)")
          button.white.settings-button(type="button")
            i sort
    div.results-wrapper
      div.results
        card(:rental="rental" v-for="rental in rentals")
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
			const searchTerm = document.getElementById("search-bar-input");
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
@import '../css/template.css';


#search-bar-input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}
.search-bar-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 1%;
  width: 70%;
}
.search-bar {
  align-items: center;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  display: flex;
  gap: 2%;
  justify-content: center;
  padding: 2%;
  pointer-events: all;
  position: relative;
  width: 100%;
}




</style>