import { createRouter, createWebHashHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue';
import TodoView from '../views/TodoView.vue';
import SeconView from '../views/SeconView.vue';
import RegisterView from '../views/RegisterView.vue';
import SpView from '../views/SpView.vue';
import FifthView from '../views/FifthView.vue';
import WeekThree from '../views/WeekThree.vue';
import TodoList from '@/components/NewToDo/todoList.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AboutView,
    },
    {
      path: '/TodoView',
      name: 'TodoView',
      component: TodoView,
    },
    {
      path: '/SeconView',
      name: 'SeconView',
      component: SeconView,
    },
    {
      path: '/ReviewView',
      name: 'ReviewView',
      component: RegisterView,
    },
    {
      path: '/SpView',
      name: 'SpView',
      component: SpView,
    },
    {
      path: '/Register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/FifthView',
      name: 'FifthView',
      component: FifthView,
    },
    {
      path: '/WeekThree',
      name: 'WeekThree',
      component: WeekThree,
    },
    {
      path: '/ToDoListView',
      name: 'ToDoListView',
      component: TodoList,
    },
    {
      path: '/Login',
      name: 'Login',
      component: LoginView,
    },
    // 未定義路由跳轉
    { path: '/:pathMatch(.*)*', redirect: '/' },

  ],
})

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
//   userStore.initUser()

//   if (to.meta.requiresAuth && !userStore.isLoggedIn) {
//     alert('請先登入')
//     next('/')
//   } else {
//     next()
//   }
// })


router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    if (!to?.fullPath) {
      window.location.reload();
    } else {
      window.location = to.fullPath;
    }
  }
});

console.log('BASE_URL:', import.meta.env.BASE_URL)

export default router
