import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CalendarView from "@/views/CalendarView.vue";
import { useAuthStore } from "@/store/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    next({ name: "auth" });
  } else if (to.meta.requiresUnauth && useAuthStore().isAuthenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
