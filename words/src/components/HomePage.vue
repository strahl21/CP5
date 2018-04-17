<template>
  <div>
    <div v-if="loggedIn">
      <get-words/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import UserFeed from './UserFeed';
 import GetWords from './GetWords'
 export default {
   name: 'HomePage',
   components: {WelcomePage,UserFeed,GetWords},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>
