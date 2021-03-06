import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 路由表
const routes = [
  // {
  //   path:'/',
  //   redirect: '/login'
  // },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },

  {
    path: "/",
    // name:'layout',
    component: () => import("@/views/layout"),
    children: [
      {
        path: '', // 默认子路由，只能有1个
        redirect: 'home'
       },
       {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
       },
       {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
       },
       {
       path: '/video',
       name: 'video',
       component: () => import('@/views/video')
       },
       {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my')
       }
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/acticle/:articleId',
    name: 'acticle',
    component: () => import('@/views/acticle'),
    props: true
  },
];

const router = new VueRouter({
  routes,
});

export default router;
