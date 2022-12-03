<template lang="pug">
div#app
    nav.et-hero-tabs#tabs
        div.et-hero-tabs-container
            router-link.et-hero-tab(to="/") Home
            router-link.et-hero-tab(to="/find") Find
            router-link.et-hero-tab(to="/post") Post
            router-link.et-hero-tab(v-if="$store.state.user" to="/user") User
        div.signin(v-if="!$store.state.user", v-on:click="signin();") Log In
        //- div.signout(v-if="user", v-on:click="signOut();") Log Out
        a.signout(v-if="$store.state.user" href="/auth/logout") Log Out

    router-view

</template>


<script>
export default {
    name: 'App',
    data() {
        return {};
    },
    mounted: async function () {
		this.$nextTick(async function () {
            // this.$store.dispatch("addUser", {email:"admin"});
		})
	  },
	methods: {
		signin: async function (){
            this.$store.dispatch("addUser", {email:"admin@gmail.com"});
		}
	}

}
</script>

<style>
    @import './css/tabs.css';
</style>