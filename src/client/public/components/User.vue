<template lang="pug">
main.et-main
    div#main
        div.content-profile-page
            div.profile-user-page.card#user-profile
                div.img-user-profile
                    img.profile-bgHome(src="https://www.incharge.org/wp-content/uploads/2019/08/lower-rent.jpg")
                    img.avatar(v-bind:src="$store.state.user.picture" :alt="$store.state.user.displayName + ' image'")
                //- button Follow
                div.user-profile-data
                    h1 {{$store.state.user.displayName}}
                    p Your user
                div.description-profile Renterer
                ul.data-user
                    li
                        a(v-on:click="showResults()")
                            strong(v-if="user.rentals") {{user.rentals.length}}
                            span Your Rentals
                div(v-if="toShowResults")
                    li.result(v-for="rental in user.rentals")
                        card(:rental="rental")
</template>

<script>
import { fetchJson } from "../js/utils.js";
import card from "./Card.vue"
export default {
    name: 'User',
    components: {
        card
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
			const removed = await fetchJson("/item", rental, "DELETE");
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
			return await fetchJson("/userRentals", null, "GET");
		}
	}

}
</script>

<style scoped>
    @import "../css/users.css"
</style>