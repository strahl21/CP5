<template>
  <div>
    <div class = "quiz">
      <h2> See the words you don't know!</h2>
      <input v-on:click="showMeList" id="quizSubmit" class="button" type="submit" value="See words"></input>
      <input v-on:click="deleteWords" id="quizSubmit" class="button" type="submit" value="Delete Words"></input>
      </br>
      </br>
      <div>
        <router-link :to="{ name: 'GetWords'}"><span>Find More Words</span></router-link>
      </div>
    </div>

    <div v-show="showList" id="quizResults" class = "quizOutput">
      <div v-for="word in previousWords">
          <p>{{ word }}</p>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'UserFeed',
   data () {
     return {
       text: '',
     }
   },
   created: function() {
   },
   filters: {
   },
   computed: {
     feed: function() {
       return this.$store.getters.feed;
     },
     showList: function () {
       return this.$store.getters.showList;
     },
     previousWords: function() {
       return this.$store.getters.previousWords;
     }
   },
   methods: {
     word: function() {
       this.$store.dispatch('addWord',{
         word: this.text,
       }).then(word => {
	 this.text = "";
       });
     },
     deleteWords: function () {
       this.$store.dispatch('deleteWords');
       this.$store.dispatch('hideMeList');
     },
     showMeList: function() {
       this.$store.dispatch('getWords');
       this.$store.dispatch('setExpanded');
       return this.$store.dispatch('showMeList');
     },
   }
 }
</script>

<style scoped>
.quiz {
  text-align: center;
}

.quizOutput {
  min-width: 300px;
  overflow: auto;
  max-height: 400px;
  justify-self: center;
  align-self: center;
  overflow: auto;
  font-size: 20px;
  font-weight: bold;
}

.button {
  background-color: blue;
  color: white;
  width: 30%;
  height: auto;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1.5em;
  padding: 14px 20px;
  border: none;
  font-size: 1.2rem;
}

.button:hover {
  background-color: #1874cd;
}

#quizResults {
  text-align: center;
}

</style>
