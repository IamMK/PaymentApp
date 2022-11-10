import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CalendarView from "@/views/CalendarView.vue";
import MainView from "@/views/MainView.vue";
import { useAuthStore } from "@/store/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    // meta: { requiresUnauth: true },
    component: MainView,
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: { requiresAuth: true },
    component: CalendarView,
  },
  {
    path: "/auth",
    name: "auth",
    meta: { requiresUnauth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AuthView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    meta: { requiresAuth: true },
    redirect: () => {
      console.log("Dupa");

      useAuthStore().logout();
      return { name: "auth" };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    next({ name: "auth" });
  } else if (to.meta.requiresUnauth && useAuthStore().isAuthenticated) {
    next({ name: "calendar" });
  } else {
    next();
  }
});

export default router;
