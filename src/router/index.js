import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from '@/views/MainView.vue';
import SidebarView from '@/views/SidebarView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainView,
    children: [
      {
        path: '/settings',
        component: SidebarView,
        props: { active: true },
      },
      {
        path: '*',
        component: SidebarView,
      },
    ],
  },
];

export default new VueRouter({ mode: 'history', routes });
