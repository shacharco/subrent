<template lang="pug">

router-link(:to="{name: 'product', params: {id: rental.id}}").search-result.loaded.visible
    div.search-result-background(target="_blank" v-bind:style="{'background-color': 'rgb(166, 140, 140)', 'background-image': 'url('+img+')'}")
    div.search-result-info-header
        h1.search-result-info-text {{rental.name}}
        div.search-result-info-wrapper
            div.search-result-info 
                a.search-result-creator(href="https://unsplash.com/@levjohn?utm_source=CodePen&amp;utm_medium=referral" target="_blankIvan Levchenko") {{rental.user}}
</template>

<script>
export default {
    name: 'card',
    props: ['rental'],
    data() {
        return {

        }
    },
    methods: {
    },
    created() {
        console.log(this.$store.state.user)
        console.log(this.rental)
    },
    computed: {
        img() {
            if(this.rental.image){
              console.log(this.rental.image.replace("\\","/"))
              return this.rental.image.replace("\\","/");
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
    }
}
</script>

<style scoped>
    /* @import "../css/card.css"; */
    

.search-result {
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  opacity: 1;
  overflow: hidden;
  position: relative;
  transform: translateY(0);
  transition: opacity 250ms, transform 250ms;
  grid-row-end: span 9;
}

.search-result.loaded:hover .search-result-background {
  opacity: 1;
  transform: scale(1.1);
}
.search-result.loaded .search-result-background {
  filter: blur(0px);
  transform: scale(1);
}
.search-result.loaded .search-result-info-wrapper {
  display: flex;
}
.search-result .search-result-background {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px;
  cursor: pointer;
  display: block;
  filter: blur(3px);
  height: 100%;
  opacity: 0.8;
  transform: scale(1.25);
  transition: opacity 250ms, transform 250ms, backgroundImage 250ms, filter 250ms;
  width: 100%;

}
.search-result .search-result-info-wrapper {
  align-items: flex-end;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
  border-radius: 10px;
  display: none;
  height: 100%;
  left: 0px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 2;
}
.search-result .search-result-info-wrapper .search-result-info {
  display: flex;
  margin: 10px;
  width: calc(100% - 20px);
}
.search-result-info-header {
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0px;
  width: 100%;
  
  display: flex;

}
.search-result-info-text{
  color: white;
  font-size: 2em;
  overflow: hidden;
  pointer-events: all;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-indent: 5%;
  width: 100%

}
.search-result .search-result-info-wrapper .search-result-info .search-result-creator {
  border-radius: 3px;
  color: white;
  font-size: 0.9em;
  overflow: hidden;
  padding: 5px 10px;
  pointer-events: all;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search-result .search-result-info-wrapper .search-result-info .search-result-creator:hover {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
}

</style>
