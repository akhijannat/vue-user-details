import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/Register.vue";
import Dashboard from "../components/Dashboard.vue";
import Login from "../components/Login.vue";
import { useAuth } from "../stores/auth";
import UserDetail from "@/components/UserDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { title: "Login", guest: true },
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { title: "Dashboard", requiresAuth: true },
    },

    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { title: "Register", guest: true },
    },

    {
      path: "/user/detail",
      name: "userDetails",
      component: UserDetail,
      meta: { title: "user Details", requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;

  const auth = useAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.getAuthStatus) {
      next({ name: "login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (auth.getAuthStatus) {
      next({ name: "dashboard" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
