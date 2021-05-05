import { createRouter,createWebHistory } from 'vue-router'

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage.vue';
import ShowNotes from './components/ShowNotes.vue';
import AddNotes from './components/AddNotes.vue';
import UpdateUser from './components/UpdateUser.vue';
import store from './store/index';

const routes = [
    { path : '', redirect:'/login'},
    { path : '/login',component : LoginPage, meta : {'requiredAuth':false}},
    { path : '/signup',component : SignupPage, meta : {'requiredAuth':false}},
    { path : '/shownotes',component : ShowNotes, meta : {'requiredAuth':true}},
    { path : '/addnotes',component : AddNotes, meta : {'requiredAuth':true}},
    { path : '/updateuser',component : UpdateUser, meta : {'requiredAuth':true}}

]



const router =  createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta.requiredAuth && !store.getters.isAuthenticated){
        next('/login');
    } else if(!to.meta.requiredAuth && store.getters.isAuthenticated){
        next('/shownotes');
    }
    else{
        next()
    }
})

export default router;