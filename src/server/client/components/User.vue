<template lang="pug">
main.et-main
    div#main
        div.content-profile-page
            div.profile-user-page.card#user-profile
                div.img-user-profile
                    img.profile-bgHome(src="https://www.incharge.org/wp-content/uploads/2019/08/lower-rent.jpg")
                    img.avatar(v-bind:src="$store.state.user.picture" :alt="$store.state.user.name + ' image'")
                div.centered-text
                    h1.subtitle {{$store.state.user.name}}
                    label Your user
                div.centered-text Renterer
                    StrongMinimized(:rentals="user.rentals" v-on:click="showResults()")
                    div(v-if="toShowResults")
                        div.results-wrapper
                            div.results
                                card(:rental="rental" v-for="rental in user.rentals")
</template>

<script>
import { fetchJson } from "../js/utils.js";
import card from "./Card.vue"
import StrongMinimized from "./StrongMinimized.vue"
export default {
    name: 'User',
    components: {
        card,
        StrongMinimized
    },
    data() {
        return {
                user: {
                    rentals: []
                },
                toShowResults: false
            };
    },
	created(){
        if(this.$store.state.user){
            this.getRentals().then(rentals => {
                console.log(rentals)
                this.user.rentals = rentals;
            });
        }

	},
	methods:{
		removeItem: async function (rental){
			const removed = await fetchJson("/api/item", rental, "DELETE");
			this.getRentals().then(rentals => {
				this.user.rentals = rentals;
				this.toShowResults = false;
				this.toShowResults = true;

			});
		},
		showResults: function (){
            this.toShowResults = !this.toShowResults;
            console.log("show results " + this.toShowResults);
		},
		getRentals: async function () {
			return await fetchJson("/api/userRentals", null, "GET");
		}
	}

}
</script>

<style scoped>
    @import "../css/users.css";

</style>