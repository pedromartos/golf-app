import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Dashboard
    },
    {
      path: "/image-groups/",
      component: () => import("@/views/image-groups/ImageGroups.vue"),
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
