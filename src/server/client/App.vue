<template lang="pug">
div#app
    //- div.menu-list
    //-     a.custom-underline(href="#") Home
    //-     a.custom-underline(href="#") Find
    //-     a.custom-underline(href="#") Post
    //-     button.menu-button User

    nav.et-hero-tabs#tabs
        div.et-hero-tabs-container
            router-link.et-hero-tab(to="/") Home
            router-link.et-hero-tab(to="/find") Find
            router-link.et-hero-tab(to="/post") Post
            router-link.et-hero-tab(v-if="$store.state.user" to="/user") User
        div.signin(v-if="!$store.state.user") 
            a(href="/auth/local") Log In
        //- div.signout(v-if="user", v-on:click="signOut();") Log Out
        a.signout(v-if="$store.state.user" href="/auth/logout") Log Out

    router-view

    //- footer.footer
    //-     div.container
    //-         div.footer-info
    //-             div.footer-text
    //-                 span.copyright ©2022 powered by subrent.
    //-                 div.footer-social
    //-                     a(href="#").footer-social-link.vk-f-bg
    //-                         i.fab.fa-vk
    //-                     a(href="#").footer-social-link.facebook-f-bg
    //-                         i.fab.fa-facebook-f
    //-                     a(href="#").footer-social-link.instagram-f-bg
    //-                         i.fab.fa-instagram
    //-             div.footer-menu
    //-                 nav
    //-                     a(href="#") company
    //-                     a(href="#") my account
    //-                     a(href="#") customer service
    //-                 div.f-write
    //-                     a(href="#").footer-button write

</template>


<script>
export default {
    name: 'App',
    data() {
        return {};
    },
    mounted: async function () {
        this.$store.dispatch("addUser", null);

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
    @import './css/template.css';
    @import './css/tabs.css';
</style>