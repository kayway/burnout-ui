import { createRouter, createWebHashHistory } from "vue-router";
import StuntUI from "../views/StuntUI.vue";

const routes = [
  {
    path: "/",
    name: "stunt-ui",
    component: StuntUI,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
