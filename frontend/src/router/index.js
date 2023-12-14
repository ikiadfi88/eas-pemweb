import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: checkLoggedIn,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/chat/:id",
      name: "chat",
      component: () => import("../views/ChatRoom.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
      beforeEnter: (to, from, next) => {
        // Check if the user is already logged in
        if (localStorage.getItem("loggedIn")) {
          // User is already logged in, redirect to the dashboard
          next("/home");
        } else {
          // User is not logged in, proceed to the login page
          next();
        }
      },
    },
    {
      path: "/logout",
      name: "logout",
      beforeEnter: (to, from, next) => {
        // Clear the logged-in status from localStorage
        localStorage.removeItem("loggedIn");
        next("/");
      },
    },
  ],
});

function checkLoggedIn(to, from, next) {
  // Check if the user is logged in
  if (localStorage.getItem("loggedIn")) {
    // User is logged in, proceed to the next route
    next();
  } else {
    // User is not logged in, redirect to the login page
    next("/");
  }
}
export default router;
