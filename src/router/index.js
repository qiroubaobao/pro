import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home/Home.vue"
import Login from "../views/Login/Login.vue"
import Account from "../views/Login/cps/Account"
import Register from "../views/Login/cps/Register"

const routes = [
  {
    path: "/",
    name: "Default",
    redirect: "/login/account",
    meta:{title:'登录-实验缘'}
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta:{title:'首页-实验缘'}
  },
  {
    path: "/login",
    name: "Login",
    redirect: "/login/account",
    component: Login,
    children: [
      {
        path: "account",
        name: "Account",
        component: Account,
        meta:{title:'登录-实验缘'}
      },
      {
        path: "register",
        name: "Register",
        component: Register,
        meta:{title:'登录-实验缘'}
      }
    ]
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main/Main.vue"),
    meta:{title:'库存管理-实验缘'}
  },
  {
    path: "/supplier",
    name: "Supplier",
    component: () => import("../views/Supplier/Main.vue"),
    meta:{title:'供应商管理-实验缘'}
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User/Main.vue"),
    meta:{title:'用户管理-实验缘'}
  },
  {
    path: "/location",
    name: "Location",
    component: () => import("../views/Location/Main.vue"),
    meta:{title:'库位管理-实验缘'}
  },
  {
    path: "/newBatch",
    name: "NewBatch",
    component: () => import("../views/Main/MContent/Minventory/cps/MnewBatch")
  },
  {
    path: "/mIndex",
    name: "MIndex",
    component: () => import("../views/Main/MContent/cps/MIndex")
  },
  {
    path: "/checkstorage",
    name: "checkStorage",
    component: () => import("../views/Main/MContent/cps/CheckStorage")
  }
]
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
