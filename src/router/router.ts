import { createRouter, createWebHistory } from "vue-router";
import CreateUser from "../views/CreateUser.vue";
import SearchPage from "../views/SearchPage.vue";
import UserRecipes from "../views/UserRecipes.vue";
import Login from "../views/Login.vue"
import CreateRecipe from "@/views/CreateRecipe.vue";
import { isLoggedIn, store } from "@/assets/auth-service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '', component: SearchPage},
    {path: '/search', component: SearchPage},
    {path: '/login', component: Login},
    {path: '/signup', component: CreateUser},
    {path: '/createrecipe', component: CreateRecipe},
    {path: '/myrecipes', component: UserRecipes},
  ],
});
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup', '/search'];
  const authRequired = !publicPages.includes(to.path);
  if (!authRequired) {
    next();
  }
  else if (isLoggedIn(store.token)) {
    next();
  } 
  else {
    next('/login');
  }

});

export default router;
