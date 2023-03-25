import * as VueRouter from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/Login.vue') },
  {
    path: '/home',
    component: () => import('../views/Home/Index.vue'),
    
    children: [
      {
        path: 'staff',
        component: () => import('../views/Home/Staff.vue'),
      },
      {
        path: 'dept',
        component: () => import('../views/Home/Department.vue'),
      },
      {
        path: 'salary',
        component: () => import('../views/Home/Salary.vue')
      },
      {
        path: 'job',
        component: () => import('../views/Home/Job.vue')
      },
      {
        path: 'attend',
        component: () => import('../views/Home/Attend.vue')
      },
      {
        path: 'employ',
        component: () => import('../views/Home/Employ.vue')
      },
      {
        path: 'notice',
        component: () => import('../views/Home/Notice.vue')
      },
      {
        path: 'analysis',
        component: () => import('../views/Home/Analysis.vue')
      },
      {
        path: 'staffAttend',
        component: () => import('../views/Home/StaffAttend.vue')
      },
      {
        path: 'staffNotice',
        component: () => import('../views/Home/StaffNotice.vue')
      },
      {
        path: 'staffSalary',
        component: () => import('../views/Home/StaffSalary.vue')
      },
      {
        path: 'personal',
        component: () => import('../views/Home/Personal.vue')
      },
      {
        path: 'records',
        component: () => import('../views/Home/Records.vue')
      },
      {
        path: 'staffRecords',
        component: () => import('../views/Home/StaffRecords.vue')
      },
    ],
  },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  // if(to.meta.requireAuth) {
  //   var s_id = localStorage.getItem("s_id");
  //   if(s_id != '') {
  //     next();
  //   } else {
  //     next({
  //       path: '/'
  //     })
  //   }
  // }
  if (to.path !== '/login' && !localStorage.getItem("s_id")) next({ path: '/login' })
  else next()
})

export default router
