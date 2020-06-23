import Vue from 'vue';
import Vuex from 'vuex'
import firebase from 'firebase'
const fb = require('../services/firebase.js')
Vue.use(Vuex)
// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
      store.commit('setCurrentUser', user)
      store.dispatch('fetchUserProfile')


  }
})
export const store = new Vuex.Store({
  state: {
      currentUser: null,
      userProfile: {},
      posts: [],
      hiddenPosts: [],
      coin: null,
      username: null,
      currentNumber: undefined,
      isPlay: undefined
  },
  getters:{
    getCoin:(state,getters)=>{

        return state.coin
    }

  },
  actions: {
      clearData({ commit }) {
          commit('setCurrentUser', null)
          commit('setUserProfile', {})
          commit('setPosts', null)
          commit('setHiddenPosts', null)
      },

      fetchUserProfile({ commit, state }) {

          //console.log("fetching")
          var userId = firebase.auth().currentUser.uid;

         firebase.database().ref('/users/' + userId).once("value").then(function(snapshot) {
          //console.log(snapshot.val())
          commit('setCoin', snapshot.val().coin)
          commit('setUsername',snapshot.val().name)
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

        });
          // firebase.database().doc('/users/' + userId).get().then(res => {
          //   console.log("fetch user",res)
          //     commit('setCoin', res.data().coin)
          //     commit('setUsername',res.data().name)
          // }).catch(err => {
          //     console.log(err)
          // })
      },

      updateCoin({commit,state},data){


           commit('setCoin',data)
           //console.log("updating user coin")
           //console.log(data)
           //console.log(state.currentUser.uid)

           firebase.database().ref('users/' + state.currentUser.uid).update({
            coin: data
          }, function(error) {
            if (error) {
              console.error("Error writing document: ", error);

            } else {
              //console.log("Document successfully written!");
            }
          });

      },
      updateProfile({ commit, state }, data) {
          let name = data.name

          fb.usersCollection.doc(state.currentUser.uid).update({ name }).then(user => {
              // update all posts by user to reflect new name
              fb.postsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                  docs.forEach(doc => {
                      fb.postsCollection.doc(doc.id).update({
                          userName: name
                      })
                  })
              })
              // update all comments by user to reflect new name
              fb.commentsCollection.where('userId', '==', state.currentUser.uid).get().then(docs => {
                  docs.forEach(doc => {
                      fb.commentsCollection.doc(doc.id).update({
                          userName: name
                      })
                  })
              })
          }).catch(err => {
              console.log(err)
          })
      }
  },
  mutations: {
    setCurrentNumber(state, val){
      state.currentNumber = val;
    },
    setUsername(state, val) {
        state.username = val
    },
      setCoin(state, val) {
        state.coin = val
    },
      updateCoin(state, val) {
          state.coin = state.coin+val
      },
      setCurrentUser(state, val) {
          state.currentUser = val
      },
      setUserProfile(state, val) {
          state.userProfile = val
      },
      setPosts(state, val) {
          if (val) {
              state.posts = val
          } else {
              state.posts = []
          }
      },
      setHiddenPosts(state, val) {
          if (val) {
              // make sure not to add duplicates
              if (!state.hiddenPosts.some(x => x.id === val.id)) {
                  state.hiddenPosts.unshift(val)
              }
          } else {
              state.hiddenPosts = []
          }
      },

  }
})
