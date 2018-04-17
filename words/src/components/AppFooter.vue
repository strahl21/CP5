<template>
  <div class="footer" v-bind:class="{expanded: isActive}">
      <p>Git hub url: https://github.com/strahl21/CP5</p>
      <a href="https://github.com/strahl21/CP5/">Link To GitHub</a>
  </div>
</template>

<script>
 export default {
   name: 'AppHeader',
   data () {
     return {
     }
   },
   computed: {
     isActive: function () {
       return this.$store.getters.isActive;
     }
   },
   methods: {
     }
 }

</script>

<style scoped>

.footer {
  text-align: center;
  align-self: center;
  /*padding: 0;*/
  /*vertical-align: middle;*/
  /*line-height: normal;*/
  margin: 0;
  position: fixed;
  bottom: 0px;
  width: 85%;
}

.expanded {
  position: static;
  bottom: 0px;
  width: 100%;
  margin: 0;
  
}


</style>
