import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import test from '../components/content'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'product',
      component: HelloWorld
    },
    {
      path:'/test',
      name: 'test',
      component: test
    }
  ]
})
