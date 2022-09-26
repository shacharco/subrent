<template lang="pug">
main.et-main
    div#main
        div.product_head
            div#image_wrap
                img.product__img(v-if="rental && rental.category == 'cars'" src='https://media.istockphoto.com/photos/generic-modern-suv-car-in-concrete-garage-picture-id1307086567', alt='Car')
                img.product__img(v-else-if="rental && rental.category == 'food'" src='https://media.istockphoto.com/photos/arabic-and-middle-eastern-dinner-table-hummus-tabbouleh-salad-salad-picture-id1175505781', alt='Food')
                img.product__img(v-else src='https://media.istockphoto.com/photos/mans-hands-giving-cheque-to-other-person-picture-id1130220065', alt='Other')
            div.product__content
                button.product__remove__btn(v-if="$store.state.user && rental &&  rental.email == $store.state.user.email" v-on:click="removeItem(rental)") X
                h1.product__header(v-if="rental") {{rental.name}}
                p.product__text(v-if="rental") 
                    | Rent this {{rental.name}} for {{rental.price}} at {{rental.location}} from {{rental.email}}
            //- div.product__btn(v-on:click="gotoCard(rental)") Explore
            //-     span &rarr;
        div.product_user
            H2 About {{ user.username }}
            p email: {{ user.email }}
        div.product_comments
            div.comments_head
                div.comments_title
                    H2 Comments
                    span.rating-label(v-for="x in 5" :class="x <= rating ? 'is-active': ''" ) &#9733
                    div.comments
                        p(v-for="c in comments" class=c) {{ c.text }} by {{ c.username }}



            div.comment_input(v-if="$store.state.user")
                H2 Rate
                .rating
                    input(v-for="x in 5" type="radio" name="rating" :value="x" :aria-label="x + ' star' + x>1?'s':''" v-model:checked="userRating" required)
                input.comment_text(v-model="comment.text" type="text" placeholder="Enter a comment")
                button.comment_button(v-on:click="sendComment()") send
                p(v-if="comment.result") commented!


</template>

<script>
import {fetchJson} from "../js/utils.js"
export default {
    name: 'product',
    data() {
        return {
            rental: {},
            user: {},
            comment: {
                text: "",
                result: false
            },
            comments: [],
            rating: 4,
            userRating: 0
        }
    },
    mounted: async function(){
        console.log("mounted")
        this.rental = await fetchJson("/rental?"+new URLSearchParams({id: this.$route.params.id}), null, "GET");
        this.user = await fetchJson("/userInfo?"+new URLSearchParams({email: this.rental.email}), null, "GET");
        this.updateComments();
        this.updateRatings();
        console.log("rental user")
        console.log(this.user)
    },
    methods: {
        sendComment: async function(){
            let comment = {
                product: this.rental,
                comment: this.comment.text
            }
            console.log(comment)
            console.log(this.userRating)
            let res = await fetchJson("/comment", comment);
            console.log(res)
            this.updateComments();
            this.comment.result = res != undefined;
        },
        updateComments: async function(){
            console.log("updating comments")
            this.comments = await fetchJson("/comments?"+new URLSearchParams({productId: this.rental._id}), null, "GET");
        },
        updateRatings: async function(){
            console.log("updating ratings")
            this.rating = (await fetchJson("/ratings?"+new URLSearchParams({productId: this.rental._id}), null, "GET")).rating;
            console.log(this.rating);
        }
    },
    watch: {
        userRating: async function(val){
            console.log(val)
            let rating = {
                product: this.rental,
                value: val
            }
            let res = await fetchJson("/rating", rating);
            console.log(res)
            this.updateRatings();


        }
    }
}
</script>

<style scoped>
    @import "../css/product.css";
</style>