import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    feed: [],
    current: {},
    displayHeader: '',
    loading: true,
    definitionShow: false,
    noDefinition: false,
    showList: false,
    definitionDisplay: [],
    generalText: '',
    currentWord: '',
    starterWords: [],
    currentThes: {},
    currentSynonyms: [],
    synonymToLookUp: [],
    previousWords: [],
    isActive: false,
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    feed: state => state.feed,
    current: state => state.current,
    displayHeader: state => state.displayHeader,
    loading: state => state.loading,
    definitionShow: state => state.definitionShow,
    noDefinition: state => state.noDefinition,
    showList: state => state.showList,
    definitionDisplay: state => state.definitionDisplay,
    generalText: state => state.generalText,
    currentWord: state => state.currentWord,
    starterWords: state => state.starterWords,
    currentThes: state => state.currentThes,
    currentSynonyms: state => state.currentSynonyms,
    synonymToLookUp: state => state.synonymToLookUp,
    previousWords: state => state.previousWords,
    isActive: state => state.isActive,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setFeed (state, feed) {
      state.feed = feed;
    },
    setCurrent (state, current) {
      state.current = current;
    },
    setDisplayHeader(state, displayHeader){
      state.displayHeader = displayHeader
    },
    setLoading (state, loading) {
      state.loading = loading;
    },
    setDefinitionShow (state, definitionShow){
      state.definitionShow = definitionShow;
    },
    setNoDefinition (state, noDefinition) {
      state.noDefinition = noDefinition;
    },
    setShowList (state, showList) {
      state.showList = showList;
    },
    setDefinitionDisplay (state, definitionDisplay) {
      state.definitionDisplay = definitionDisplay;
    },
    setGeneralText (state, generalText) {
      state.generalText = generalText;
    },
    setCurrentWord (state, currentWord) {
      state.currentWord = currentWord;
    },
    setStarterWords (state, starterWords) {
      state.starterWords = starterWords;
    },
    setCurrentThes (state, currentThes) {
      state.currentThes = currentThes;
    },
    setCurrentSynonyms (state, currentSynonyms) {
      state.currentSynonyms = currentSynonyms;
    },
    setSynonymToLookUp (state, synonymToLookUp) {
      state.synonymToLookUp = synonymToLookUp;
    },
    setPreviousWords (state, previousWords) {
      state.previousWords = previousWords;
    },
    setIsActive (state, classToToggle) {
      state.isActive = classToToggle;
    },
  },
  actions: {
    setExpanded: function(context) {
      context.commit('setIsActive', true);
    },
    setHomePage: function(context) {
      context.commit('setIsActive', false);
    },
    getSeedWord: function(context) {
      var startTheWords = ["affect", "set", "go", "take", "stand", "get", "turn", "put", "fall", "strike"];
      context.commit('setStarterWords', startTheWords);
      console.log('length of starter words');
      console.log(context.state.starterWords.length);
      context.commit('setLoading', true);
      var indexOfSeedWord = Math.floor(Math.random() * Math.floor(context.state.starterWords.length));
      console.log('random int function');
      console.log(indexOfSeedWord);
      console.log(Math.random());
      var value = context.state.starterWords[indexOfSeedWord];
      context.commit('setCurrentWord', value);
      console.log('Starter Word');
      console.log(context.state.currentWord);
    },
    getWords: function(context) {
      var previousWords = [];
      axios.get("/api/users/" + context.state.user.id + "/words",).then(response => {
      for (var i = 0; i < response.data["words"].length; i++) {
        previousWords.push(response.data["words"][i]["word"]);
      }
      context.commit('setPreviousWords', previousWords);
      return true;
          }).catch(err => {
        });
    },
    addWords: function(context) {
      axios.post("/api/users/" + context.state.user.id + "/words", {word: context.state.currentWord}
      ).then(response => {
      context.dispatch('getWords');
      return true;
          }).catch(err => {
      });
    },
    deleteWords: function(context) {
      axios.get("/api/users/" + context.state.user.id + "/words").then(response => {
      console.log(response.data);
      console.log("this is the length");
      console.log(response.data.words.length);

      for (var i = 0; i < response.data.words.length; i++){
        var wordToSend = response.data.words[i]["word"];
        console.log(wordToSend);
        axios.delete("/api/users/" + context.state.user.id + "/words/" + wordToSend).then(response => {
          return true;
          console.log('Success');
          }).catch(err => {
          });
        }
        var previousWords = [];
        context.commit('setPreviousWords', previousWords);
        return true;
      }).catch(err => {
      });
    },
    getWord: function(context) {
      context.commit('setLoading', true);
      var myurl= "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + context.state.currentWord + "?key=8c097ee5-8e3c-413e-b3c5-dc8501967414";
      fetch(myurl)
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
          console.log(data);
          context.commit('setCurrent', data);
          context.commit('setLoading', false);
          context.dispatch('parseDataDisplay');
          if (context.state.noDefinition === true) {
            context.dispatch('getSeedWord');
            context.dispatch('getWord');
            context.dispatch('getThesWord');
            context.commit('setNoDefinition', false);
          }
        })
        .catch(err => {
          console.log("error");
        });
      },
      parseDataDisplay: function (context) {
        var definitions = context.state.current.getElementsByTagName("dt");
        var definitionDisplay = [];
        var toShow = "";
        var num = 1;
        context.commit('setDefinitionShow', false);
        for (var i = 0; i < definitions.length; i++){
          toShow += num + ". ";
          for (var j = 0; j < definitions.item(i).childNodes.length; j++){
              var dummy = definitions.item(i).childNodes[j].textContent;
              if (definitions.item(i).childNodes[j].nodeName === "#text" && dummy[0] === ':'){
                toShow += dummy.slice(1);
              }
              else {
                toShow += dummy;
              }
          }
          num++;
          definitionDisplay.push(toShow)
          toShow = "";
        }
        context.commit('setDefinitionDisplay', definitionDisplay);
      },
      getThesWord: function(context) {
        var myurl= "https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + context.state.currentWord + "?key=091b9d9b-b494-4da5-85cf-a68ddb3c590f"; ;
        fetch(myurl)
          .then(response => response.text())
          .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
          .then(data => {
            console.log(data);
            context.commit('setCurrentThes', data);
            var currentSynonyms = [];
            var meanings = context.state.currentThes.getElementsByTagName("sens");
            for (var i = 0; i < meanings.length; i++){
              var synonyms = meanings[i].getElementsByTagName("syn");
              currentSynonyms.push(synonyms[0].textContent);
            }
            context.commit('setCurrentSynonyms', currentSynonyms)
          })
          .catch(err => {
            console.log("error");
          });
      },
      showMeList: function(context) {
       context.commit('setShowList', true);
      },
      hideMeList: function(context) {
        context.commit('setShowList', false);
      },
      addWordToList: function(context) {
        var previousWords = context.state.previousWords;
        previousWords.push(context.state.currentWord);
        context.commit('setPreviousWords', previousWords);
      },
      getRandomThesWord: function(context) {
        context.dispatch('hideMeList');
        var lengthArray = context.state.currentSynonyms.length;
        if (lengthArray === 0) {
          context.dispatch('getSeedWord');
          context.dispatch('getWord');
          context.dispatch('getThesWord');
          return;
        }
        console.log(lengthArray);
        var indexOfArray = Math.floor(Math.random() * Math.floor(lengthArray - 1));
        // parse result
        console.log(indexOfArray);
        var word = "";
        var synonymToLookUp = [];
        for (var i = 0; i < context.state.currentSynonyms[indexOfArray].length; i++) {
          while(context.state.currentSynonyms[indexOfArray][i] !== '' && context.state.currentSynonyms[indexOfArray][i] !== ',' && context.state.currentSynonyms[indexOfArray][i] !== ' ' && context.state.currentSynonyms[indexOfArray][i] !== '(' && context.state.currentSynonyms[indexOfArray][i] !== undefined && context.state.currentSynonyms[indexOfArray][i][0] !== '[' && context.state.currentSynonyms[indexOfArray][i][context.state.currentSynonyms[indexOfArray][i].length - 1] !== ']' ){
            if (i === context.state.currentSynonyms[indexOfArray].length){
              break;
            }
            word += context.state.currentSynonyms[indexOfArray][i];
            i++;
          }
          console.log(word);
          synonymToLookUp.push(word);
          word = "";
          if (context.state.currentSynonyms[indexOfArray][i] === ','){
            i++;
          }
          else if (context.state.currentSynonyms[indexOfArray][i] === '(') {
            while (context.state.currentSynonyms[indexOfArray][i] !== ')'){
              i++;
            }
          }
          else {}
        }
      var dummyArray = [];
      for (var i = 0; i < synonymToLookUp.length; i++) {
        if (synonymToLookUp[i] !== context.state.currentWord && synonymToLookUp[i] !== " " && synonymToLookUp[i] !== " ") {
          dummyArray.push(synonymToLookUp[i]);
          console.log(synonymToLookUp[i]);
        }
      }
      context.commit('setSynonymToLookUp', dummyArray);
      var lengthWordsArray = context.state.synonymToLookUp.length;
      if (lengthWordsArray < 2) {
        context.dispatch('getRandomThesWord');
      }
      var indexWordsArray = Math.floor(Math.random() * Math.floor(lengthWordsArray - 1));
      if (context.state.synonymToLookUp[indexWordsArray] === undefined || (context.state.synonymToLookUp[indexWordsArray].length - 2) < 1) {
        synonymToLookUp = [];
        context.commit('setSynonymToLookUp', synonymToLookUp);
        context.dispatch('getRandomThesWord');
      }
      context.commit('setCurrentWord', context.state.synonymToLookUp[indexWordsArray]);
      if (context.state.currentWord === undefined){
        synonymToLookUp = [];
        context.commit('setSynonymToLookUp', synonymToLookUp);
        context.dispatch('getRandomThesWord');
      }
      console.log(context.state.currentWord);
      context.dispatch('getAnotherWord');
    },
    getAnotherWord: function(context) {
      var currentSynonyms = [];
      var synonymToLookUp = [];
      var definitionDisplay = [];
      var loading = true;
      var currentThes = {};
      context.commit('setCurrentSynonyms', currentSynonyms);
      context.commit('setSynonymToLookUp', synonymToLookUp);
      context.commit('setDefinitionDisplay', definitionDisplay);
      context.commit('setLoading', loading);
      context.commit('setCurrentThes', currentThes);
      context.dispatch('getWord');
      context.dispatch('getThesWord');
    },
    showMeDefinition: function(context) {
      context.commit('setDefinitionShow', true);
    },
    // Registration, Login //
    register(context,user) {
      axios.post("/api/users",user).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setLogin',true);
	context.commit('setRegisterError',"");
	context.commit('setLoginError',"");
      }).catch(error => {
	context.commit('setLoginError',"");
	context.commit('setLogin',false);
	if (error.response) {
	  if (error.response.status === 403)
	    context.commit('setRegisterError',"That email address already has an account.");
	  else if (error.response.status === 409)
	    context.commit('setRegisterError',"That user name is already taken.");
	  return;
	}
	context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },
    login(context,user) {
      axios.post("/api/login",user).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setLogin',true);
	context.commit('setRegisterError',"");
	context.commit('setLoginError',"");
      }).catch(error => {
	context.commit('setRegisterError',"");
	if (error.response) {
	  if (error.response.status === 403 || error.response.status === 400)
	    context.commit('setLoginError',"Invalid login.");
	  context.commit('setRegisterError',"");
	  return;
	}
	context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setLogin',false);
    },
    // Getting words //
   getFeed(context) {
     axios.get("/api/users/" + context.state.user.id + "/words").then(response => {
 context.commit('setFeed',response.data.words);
     }).catch(err => {
 console.log("getFeed failed:",err);
     });
   },
   // adds a word
   addWord(context,word) {
      axios.post("/api/users/" + context.state.user.id + "/words",word).then(response => {
	return context.dispatch('getFeed');
      }).catch(err => {
	console.log("addWord failed:",err);
      });
    },
  }
});
