import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import test from '../components/content'
import loginComponent from "../components/loginComponent";
import login from "../components/login";
import index from "../components/index";


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
    },
    {
      path:'/login',
      name: 'login',
      component:login
    },
    {
      path:"/index",
      name:"index",
      component:index
    }
  ]
})
