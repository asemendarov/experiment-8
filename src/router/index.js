// Import Base
import Vue from "vue";
import VueRouter from "vue-router";
// Import Views
import HomePage from "@/views/HomePage";
import SuccessPage from "@/views/SuccessPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/success",
    name: "Success",
    component: SuccessPage,
  },
  {
    path: "*",
    redirect: { name: "Home" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
