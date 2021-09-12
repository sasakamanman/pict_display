import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/display",
    name: "Display",
    component: () => 
      import("../views/Display.vue")
  },
  {
    path: "/askFileSize",
    name: "AskFileSize",
    component: () => 
      import("../views/AskSize.vue")
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
