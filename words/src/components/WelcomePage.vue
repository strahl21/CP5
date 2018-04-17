<template>
  <div class="column">
    <img class="imgClass" src="/static/images/WordCloudWebsite.PNG">
    <div class="theRest">
      <h1>Learn new words. Impress people.</h1>
      <h2>Win Friends. Influence People.</h2>
      <form v-on:submit.prevent="register">
        <p>1. Choose a user name.</p>
        <input class="narrow" v-model="username" placeholder="User Name">
        <p>2. Create an account.</p>
        <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
        <input class="wide" v-model="email" placeholder="Email Address"></br>
        <div>
          <input class="narrow" type="password" v-model="password" placeholder="Password">
        </div>
        <div>
          <button class="alternate" type="submit">Register</button>
        </div>
      </form>
      <p class="error">{{registerError}}</p>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
     }
   },
   created: function () {
     this.$store.dispatch('setHomePage');
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
	 username: this.username,
         email: this.email,
         password: this.password,
	 name: this.name,
       });
     }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 img {
     display: inline;
     width: 55%;
     height: 55%;
     float: left;
     margin-top: 15px;
 }

 h1 {
     margin-bottom: 0px;
     font-size: 1.2em;
 }
 h2 {
     margin-top: 0px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
     margin-right: 0px;
 }
 .narrow {
     width: 170px;
 }
 .wide {
     width: 270px;
 }

.theRest {
  float: right;
  display: inline;
  text-align: right;
  align-self: right;
  justify-self: right;
}


</style>
