import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CalendarView from "@/views/CalendarView.vue";
import MainView from "@/views/MainView.vue";
import ProfileView from "@/views/ProfileView.vue";
import { useAuthStore } from "@/store/auth";
import { useAppStore } from "@/store/app";

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
    path: "/profile",
    name: "profile",
    meta: { requiresAuth: true },
    component: ProfileView,
  },
  {
    path: "/logout",
    name: "logout",
    meta: { requiresAuth: true },
    redirect: () => {
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
  let nextPoint = null as { name: string } | null;
  if (to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    nextPoint = { name: "auth" };
  } else if (to.meta.requiresUnauth && useAuthStore().isAuthenticated) {
    nextPoint = { name: "calendar" };
  }

  if (nextPoint === null) next();
  else next(nextPoint);

  useAppStore().isMenuActive = false;
});

export default router;
