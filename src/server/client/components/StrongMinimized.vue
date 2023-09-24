<template lang="pug">
ul.strong-miminized.wide
    li
        a()
            strong(v-if="rentals") {{rentals.length}}
            span Your Rentals
</template>

<script>
export default {
    name: 'StrongMinimized',
    props: ['rentals'],
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.strong-miminized {
	font-family: "Quicksand", sans-serif;
  margin-bottom: 0;
  cursor: pointer;
  padding: 0;
  list-style: none;
  display: table;
  width: 100.15%; 
}
.strong-miminized li {
  margin: 0;
  padding: 0;
  width: 33.33334%;
  display: table-cell;
  text-align: center;
  border-left: 0.1em solid transparent; 
}
.strong-miminized li:first-child {
  border-left: 0; 
}
 .strong-miminized li:first-child a {
  border-bottom-left-radius: 0.3rem; 
  }
 .strong-miminized li:last-child a {
  border-bottom-right-radius: 0.3rem; 
}


 .strong-miminized li a,  .strong-miminized li strong {
  display: block; 
}
 .strong-miminized li a {
  background-color: #f7f7f7;
  border-top: 1px solid rgba(242,242,242,0.5);
  border-bottom: .2em solid #f7f7f7;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4),0 1px 1px rgba(255,255,255,0.4);
  padding: .93em 0;
  color: #46494c; 
}
 .strong-miminized li a strong,  .strong-miminized li a span {
  font-weight: 600;
  line-height: 1; 
}
 .strong-miminized li a strong {
  font-size: 2em; 
}
 .strong-miminized li a span {
  color: #717a7e; 
}
 .strong-miminized li a:hover {
  background: rgba(0, 0, 0, 0.05);
  border-bottom: .2em solid #3498db;
  color: #3498db; 
}
.strong-miminized li a:hover span {
  color: #3498db; 
}
  
  
</style>