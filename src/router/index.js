import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import firebase from "firebase";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import("../views/Register.vue"),
  },
  {
    path: "/member",
    name: "Member",
    component: () =>
      import("../views/Member.vue"),
    meta: {
      authRequired: true,
    }
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      alert('You must be logged in to see this page');
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
});


export default router;
