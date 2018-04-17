import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import UserFeed from '@/components/UserFeed'
import GetWords from '@/components/GetWords'

Vue.use(Router)

export default new Router({
  routes: [
    {
     path: '/',
     name: 'HomePage',
     component: HomePage
   },
   {
    path: '/UserFeed',
    name: 'UserFeed',
    component: UserFeed
  },
  {
   path: '/GetWords',
   name: 'GetWords',
   component: GetWords
  },
  ]
})
