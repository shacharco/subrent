<template lang="pug">
main.et-main
    div#main
        div.centralized.sparsed.container.top-aligner
            p#post-result(v-if="success == true") Success!
            form.bar-input.form-box.box-shadow(v-on:submit.prevent="handleFormSubmit($event)" enctype="multipart/form-data")
                
                div.form-group(v-for="info in formInfo")
                    input.form-control.form-box(:name="info.name" :type="info.type" :placeholder="info.placeHolder" required)
                    span.form-icon-style.form-icon-position01
                        i.fa.fa-user(aria-hidden=true) 
                div.form-group(v-for="info in formInfoDropdowns")
                    select.form-control.form-box(:name="info.name" :placeholder="info.placeHolder" required)
                        option(v-for="option in info.options" :value="option") {{option}}
                    span.form-icon-style.form-icon-position01
                        i(aria-hidden=true) 

                div.form-group.photo
                    img.box-shadow.img-responsive.image-size(:src="previewImage")
                    div.photo-upload.box-shadow
                        i.fa.fa-upload(aria-hidden=true @click="clickChild")
                          input.fa.fa-upload(style="display: none; width: 0%;" name="image" type="file" accept="image/jpeg" @change="uploadImage" aria-hidden=true)
                //- div
                //-     input.option-input.checkbox(name="terms" type="checkbox" id="test" required)
                //-     label(for="test") Accept the 
                //-         a(href="#terms" style="text-decoration: none; color: inherit; ") terms
                button(type="submit") Post a Rent
</template>

<script>
import {fetchSelf} from "../js/utils.js"
export default {
    name: 'Post',
    data() {
        return {
            success: false,
            formInfo: [
                // {name: "email", type: "email", placeHolder: "Email"},
                {name: "phone", type: "tel", placeHolder: "Phone"},
                {name: "location", type: "text", placeHolder: "Location"},
                {name: "quantity", type: "number", placeHolder: "Quantity"},
                {name: "name", type: "text", placeHolder: "Name"},
                {name: "price", type: "number", placeHolder: "Price"}],
            formInfoDropdowns: [{name: "category", placeHolder: "Category", options:["Car", "Product", "Other"]}],
            previewImage: null
        }
	},
	methods: {
        uploadImage(e){
            const image = e.target.files[0];
            this.previewImage = URL.createObjectURL(image);
        },
        clickChild(e){
          if(e.target.children.length==1){
            e.target.children[0].click();
          }
        },

		handleFormSubmit: async function (event) {
			event.preventDefault();
			console.log("handleee")
			const form = event.currentTarget;
      console.log(form);
			const url = "/api/rent";
			try {
				console.log(url)
				const formData = new FormData(form);
        // formData.append("email", this.$store.state.user?.email);
				const responseData = await fetchSelf(url, {}, formData);
				if(responseData == true){
					this.success = true;
				}
				console.log({ responseData });
			} catch (error) {
				console.error(error);
			}
		}
	}
}
</script>

<style scoped>
@import '../css/template.css';
    /* @import "../css/post.css"; */


@keyframes move {
    0%   {
            line-height: 41px;
         }
    25%  {
            line-height: 50px;
         }
    50%  {  
            line-height: 41px;
         }
    75%  {
            line-height: 32px;
         }
    100% {
            line-height: 41px;
         }
}

.option-input {
  height: 40px;
  width: 40px;
  transition: all 0.15s ease-out 0s;
  background: #cbd1d8;
  border: none;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  margin-right: 0.5rem;
  position: relative;
}

.option-input:checked::after {
  -webkit-animation: click-wave 0.65s;
  -moz-animation: click-wave 0.65s;
  animation: click-wave 0.65s;
  background: #40e0d0;
  content: '';
  display: block;
  position: relative;
  z-index: 100;
}
@keyframes click-wave {
  0% {
    height: 40px;
    width: 40px;
    opacity: 0.35;
    position: relative;
  }
  100% {
    height: 200px;
    width: 200px;
    margin-left: -80px;
    margin-top: -80px;
    opacity: 0;
  }
}

    .photo {
  /* display: inline-block; */
  position: relative;
  display: flex;
    align-items: center;
    justify-content: center;

  margin-bottom: 60px;
}

.image-size {
  width: 400px;
  height: 150px;
  border-radius: 1em;
}

.photo-upload {
     display: inline-block;
    position: absolute;
    bottom: -8px;
    right: -8px;
    cursor: pointer;
    width: 10%;
    height: 27%;
    border: 3px solid #39ac70;
    background-color: #fff;
    padding: 0px;
    text-align: center;
    z-index: 100;
    border-radius: 50%;
}

/* .photo-upload input{
    cursor: pointer;
    width: 80%;
    height: 100%;

} */
.photo-upload i {
  color: #e93731;
  font-size: 22px;
  line-height: 41px;
}

.photo-upload i:hover {
  animation: move 0.3s;
}

.form-group {
  position: relative;
  width: 100%;
    margin-top: 1%;

}
.form-box {
  display: block;
  margin: 0 auto;
  background-color: #fff;
}
.form-control {
    box-sizing:border-box;
    width: 100%;
  font-family: 'Roboto', sans-serif;
  text-indent: 10%;
  font-size: 20px;
  font-weight: 400;
  padding: 5% 5%;
  border: 4px solid #e5e5e5;
  border-radius: 3em;
  position: relative;
  box-shadow: none;
  transition: all .3s ease-in-out;
  text-overflow: ellipsis;
}

.form-control:focus {
  border-color: #39ac70;
} 

.form-icon-style {
    font-size: 26px;
    text-align: center;
    padding: 2% 7%;
    color: #757575; 
    transition: all .3s ease-in-out;
}

.form-icon-position01 {
    position: absolute;
    top: 0;
    left: 0;
}

.form-icon-position02 {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;
    
}

.form-control:focus + .form-icon-style{
  color: #39ac70;
}

a.form-icon-style:hover,
a.form-icon-style:focus {
  color: #39ac70;
}

.form-control:focus {
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(57, 172, 112, .5);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(57, 172, 112, .5);
}








    .vert{
  display: flex;
  align-items: center;
box-sizing: border-box;
flex-direction: column;
}
.horz{
  display: flex;
  align-items: center;
  justify-content: left;
box-sizing: border-box;
flex-direction: row;
}
.container {
  display: flex;
  justify-content: space-between;

}
#main{
      overflow: hidden;

}
.product-info{
    width: 50%;
        overflow-y: scroll;
    box-sizing: border-box;
    scroll-behavior: smooth;
    text-align: center!important;
    height: 90vh;
}
.product-info::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.product-info {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
img {
            max-width: 100%;
        max-height: 100%;

}
.product-image {
    width: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;
    height: 90vh;
    overflow: hidden;
}
label {
     font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 125%;
   opacity: 0.5;
   padding-top : 5%;
   padding-bottom : 5%;
}
.subtitle {
    font-weight: 500;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 300%;
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
button {
  margin: 5px 0;
  border-radius: 1em;
  border: 1px solid #eee;
  color: #666;
  font-weight: 100;
  letter-spacing: 1px;
  cursor: pointer;
  background: #44E19F;
  color: #fff;
  border: none;
      box-sizing:border-box;
width: 100%;

    box-sizing:border-box;
    width: 100%;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 400;
  padding: 5% 5%;
  border-radius: 3em;

}
button:hover {
  transition: opacity .3s ease-in;
  opacity: .7;
}
input {
    font-size: 16px;
    block-size: 0;
    grid-area: input;
    display: block;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background-color: transparent;
    padding: 3%;
    margin: 1%; 
    font-size: 14px;
    font-weight: 500;
    line-height: 1.414;
    position: relative;
    box-shadow: inset 0 0 0 0 transparent;
    -webkit-transition: box-shadow .25s ease;
    transition: box-shadow .25s ease;
    color: black;

}
form {
    width: 30%;
    display: flex;
    flex-direction: column;
}
</style>