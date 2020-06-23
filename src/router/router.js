import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Game from '@/components/Game'
import Quizm from '@/components/Quizm'
import GameList from '@/components/GameList'
import NoCoin from '@/components/NoCoin'
import {store} from '../store/store'
import firebase from 'firebase'
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: Login
    },
    {
        path: '/game',
        name: 'Game',
        component: Game,
        meta: {
            requiresAuth: true
        }
      },
      {
        path: '/quiz',
        name: 'Quiz',
          component: Quizm,
          meta: {
              requiresAuth: true
          }
      },
      {
        path: '/list',
        name: 'List',
        component: GameList,
          meta: {
              requiresAuth: true
          }
      },
      {
        path: '/nocoin',
        name: 'NoCoin',
        component: NoCoin,
          meta: {
              requiresAuth: true,
              exclude:true
          }
      },
  ],
  mode: 'history'
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    const currentUser = firebase.auth().currentUser

    if (requiresAuth && !currentUser) {
        next('/')

    } else if (requiresAuth && currentUser) {
        next()



    }else if (!requiresAuth && currentUser){
      next('/list')
     }else {
        next()

    }
});

export default router
