<template lang="pug">
main.et-main
    div.container
        section.hero
            div.hero-info
                span.hero-subtitle Welcome to
                h1.hero-title Subrent
                small.hero-description The place to rent everything
                div.hero-social
                    a.social.vk-bg(href="#")
                      i.fa.fa-vk
                    a.social.facebook-bg(href="#")
                      i.fa.fa-facebook-f
                    a(href="#").social.instagram-bg
                      i.fa.fa-instagram
                div.hero-buttons
                    router-link.button.button-primary(to="/signup") Signup
                    a(href="/auth/google").button.button-o Login
    div.container
        section.projects
            div.project-cards
                div.p-card
                    div.card_img.landing_img8
                    div.pcard_info
                        span.category Near By
                        strong.card-title
                            span.project-name Scooter
                            span.project-date2017
                div.p-card
                    div.card_img.landing_img8
                    div.pcard_info
                        span.category New
                        strong.card-title
                            span.project-name Baby carriage
                            span.project-date2017
                div.p-card
                    div.card_img.landing_img9
                    div.pcard_info
                        span.category Best
                        strong.card-title
                            span.project-name Car
                            span.project-date2017
</template>

<script>
import { fetchJson } from "../js/utils.js";
export default {
        name: 'Home',
        data() {
                return {
                }
        },
        methods: {
        }
}
</script>

<style scoped>
@import '../css/template.css';

/* projects */
.projects{
  margin-left: 10%;
  margin-right: 10%;
  padding: 100px 0;
}
.project-cards{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.p-card{
  min-height: 370px;
  width: 370px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;
  margin: 2%;
}
.card_img{
  height: 300px;
}

.landing_img8{
  background: url(https://www.sketchappsources.com/resources/source-image/sitica-landing-page-realvjy.png) no-repeat center;
  background-size: cover;
}

.landing_img9{
  background: url(https://cdn.dribbble.com/users/1348777/screenshots/4056492/cover.png) no-repeat center;
  background-size: cover;
}

.pcard_info{
  padding: 19px 13px;
}
.category{
  display: block;
  font-size: 12px;
  color: #2b2a2c;
}
.card-title{
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 800;
  margin-top: 10px;
}


</style>