<template>
 <div>
  <div id="getWordOfTheDay" class = "getWord">
    <input v-on:click="getRandomThesWord" id="getWordSubmit" class="button" type="submit" value="I know it - move on"></input>
    <input v-on:click="addWords" id="getWordSubmit" class="button" type="submit" value="Save word to list"></input>
    <input v-on:click="showMeDefinition" id="getWordSubmit" class="button" type="submit" value="See Definition"></input>
  </br>
  </br>
    <div>
      <router-link :to="{ name: 'UserFeed'}"><span>See my words</span></router-link>
    </div>
  </br>
  </br>
  </div>

  <div id="getWordResults" class = "getWordOutput">
    <div class="fixMe">
      <h2>Find words that you don't know!</h2>
      <div id="wordDisplay" class = "getWord">
        <div v-if="loading">
           <p>Loading...</p>
        </div>
        <div v-else></div>
        <div v-show="noDefinition">
          <p> No definitions found </p>
          <p> Check to make sure word is spelled correctly or that it is in English </p>
        </div>
        <h2> Word: {{ currentWord }} </h2>
        <h2>Definition: </h2>
        <div v-show="definitionShow" v-for="definition in definitionDisplay">
            <p>{{ definition }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
 export default {
   name: 'GetWords',
   data () {
     return {
       text: '',
     }
   },
   created: function() {
     //this.$store.dispatch('getFeed');
     this.$store.dispatch('getSeedWord');
     this.$store.dispatch('getWord');
     this.$store.dispatch('getThesWord');
   },
   filters: {
   },
   computed: {
     feed: function() {
       return this.$store.getters.feed;
     },
     showMeList: function() {
       return this.$store.getters.showMeList;
     },
     showList: function () {
       return this.$store.getters.showList;
     },
     previousWords: function() {
       return this.$store.getters.previousWords;
     },
     loading: function() {
       return this.$store.getters.loading;
     },
     noDefinition: function() {
       return this.$store.getters.noDefinition;
     },
     currentWord: function () {
       return this.$store.getters.currentWord;
     },
     definition: function() {
       return this.$store.getters.definition;
     },
     definitionDisplay: function() {
       return this.$store.getters.definitionDisplay;
     },
     definitionShow: function() {
       return this.$store.getters.definitionShow;
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
     },
     getRandomThesWord: function() {
       this.$store.dispatch('getRandomThesWord');
     },
     addWords: function () {
       this.$store.dispatch('addWords');
     },
     showMeDefinition: function () {
       this.$store.dispatch('showMeDefinition');
       this.$store.dispatch('setExpanded');
     }
   }
 }
</script>

<style scoped>
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
.getWord{
  grid-area: getWord;
  text-align: center;
  /*min-width: 200px;*/
  width: 100%
}

.getWordOutput {
  text-align: center;
  width: 100%;
  max-height: 400px;
  justify-self: center;
  align-self: center;
  overflow: auto;
}

#wordDisplay {
  text-align: center;
}

.footer {
  position: absolute;
}

</style>
