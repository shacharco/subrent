<template lang="pug">
main.et-main
    div#main

        div.container
            div.product-info.no-scrollbar.vert
                div.product.vert
                    div.vert
                        label Product name:
                        h1.subtitle {{rental.name}}
                    div.vert
                        label Product description
                        span.desc {{rental.category}}
                        span.desc {{rental.quantity}}
                        span.price ${{rental.price}}
                    div.vert
                        label Product renterer description
                        span.desc {{rental.email}}
                        span.desc {{rental.phone}}
                        span.desc {{rental.location}}
                    button.main-button Add
                        //- div.product_comments
                div.comments_head
                    div.comments_title
                        h2 Comments
                        span.rating-label(v-for="x in 5" :class="x <= rating ? 'is-active': ''" ) &#9733
                        div.comments
                            p(v-for="c in comments" class=c) {{ c.text }} by {{ c.username }}



                div.comment_input(v-if="$store.state.user")
                    h2 Rate
                    .rating
                        input(v-for="x in 5" type="radio" name="rating" :value="x" :aria-label="x + ' star' + x>1?'s':''" @change="sendRating(x)" required)
                    input.comment_text(v-model="comment.text" type="text" placeholder="Enter a comment")
                    button.main-button.comment_button(v-on:click="sendComment()") send
                    p(v-if="comment.result") commented!


            
            div.product-image
                img(v-if="rental" :src="img", :alt="rental.category")
                div.renterer(v-if="$store.state.user?.email == rental.user")
                    button.fa.fa-remove.remove-button(@click="removeItem()")
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
        this.rental = await fetchJson("/api/rental?"+new URLSearchParams({id: this.$route.params.id}), null, "GET");
        this.user = await fetchJson("/api/userInfo?"+new URLSearchParams({email: this.rental.user}), null, "GET");
        this.updateComments();
        this.updateRatings();
    },
    computed: {
        img() {
            if(this.rental.image){
              console.log(this.rental.image.replace("\\","/"))
              return "../" + this.rental.image.replace("\\","/");
            }
            if(this.rental.category == 'cars'){
                return 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75&wm=1';
            } 
            else if(this.rental.category == 'food'){
                return 'https://media.istockphoto.com/photos/arabic-and-middle-eastern-dinner-table-hummus-tabbouleh-salad-salad-picture-id1175505781';

            } 
            else{
                return 'https://m.media-amazon.com/images/I/71KgF35K-bS.jpg';

            } 
        }
    },
    methods: {
        sendComment: async function(){
            let comment = {
                product: this.rental,
                comment: this.comment.text
            }
            console.log(comment)
            console.log(this.userRating)
            let res = await fetchJson("/api/comment", comment);
            console.log(res)
            this.updateComments();
            this.comment.result = res != undefined;
        },
        updateComments: async function(){
            console.log("updating comments")
            this.comments = await fetchJson("/api/comments?"+new URLSearchParams({productId: this.rental.id}), null, "GET");
        },
        updateRatings: async function(){
            console.log("updating ratings")
            this.rating = (await fetchJson("/api/ratings?"+new URLSearchParams({productId: this.rental.id}), null, "GET")).rating;
            console.log(this.rating);
        },
        sendRating: async function(val){
            console.log(val)
            let rating = {
                product: this.rental,
                value: val
            }
            let res = await fetchJson("/api/rating", rating);
            console.log(res)
            this.updateRatings();
        },
        removeItem: async function(){
            let result = await fetchJson("/api/rental?"+new URLSearchParams({productId: this.rental.id}), null, "DELETE");
            if(result){
                this.$router.push("/");
            }
        }
    },
}
</script>

<style scoped>
    @import "../css/product.css";
/* #main{
      overflow: hidden;

} */
.renterer {
  text-align: center;
  color: white;
  border: none;
  border-radius: 10%;
  cursor: pointer;
  float: right;
  }
  .remove-button {
        cursor: pointer;
    width: 100%;
    height: 100%;
      color: #e93731;
  font-size: 200%;

  }
.product-info{
    width: 50%;
    overflow-y: scroll;
    box-sizing: border-box;
    scroll-behavior: smooth;
    text-align: center!important;
    height: 90vh;
}
.product-image {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;
    height: 90vh;
    overflow: hidden;
}

.desc {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 100%;
}
.price {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 100%;
    padding: 1%;
}

</style>