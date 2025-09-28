import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);





function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}










  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
    beforeEnter: loggedInRedirectDashboard,
  },



  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isLoggedIn,
  },


 
  {
    path: '/menuList',
    name: 'menuList',
    component: () => import('../views/dataMaster/otentikasi/menuList.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/klpUsers',
    name: 'klpUsers',
    component: () => import('../views/dataMaster/otentikasi/klpUsers.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/registrasi',
    name: 'registrasi',
    component: () => import('../views/dataMaster/otentikasi/registrasi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/regisLapak',
    name: 'regisLapak',
    component: () => import('../views/dataMaster/regisLapak.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/jenisLapak',
    name: 'jenisLapak',
    component: () => import('../views/dataMaster/jenisLapak.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/jenisDagangan',
    name: 'jenisDagangan',
    component: () => import('../views/dataMaster/jenisDagangan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: isLoggedIn,
  },


]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
