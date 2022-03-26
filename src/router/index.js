import { createRouter, createWebHashHistory } from "vue-router";
import BaseUI from "../views/BaseUI.vue";

const routes = [
  {
    path: "/",
    name: "base-ui",
    component: BaseUI,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
