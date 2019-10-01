import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/welcome",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/image-groups/",
      component: () => import("@/views/image-groups/ImageGroups.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "new",
          name: "new-group",
          component: () => import("@/views/image-groups/NewGroup.vue")
        },
        {
          path: "view",
          name: "list-groups",
          component: () => import("@/views/image-groups/ListGroups.vue")
        },
        {
          path: "view/:groupId",
          name: "view-group",
          props: true,
          component: () => import("@/views/image-groups/ViewGroup.vue")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }

    next({ name: "home", params: { authError: true } });
  } else {
    next();
  }
});

export default router;
