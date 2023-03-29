import Login from "~/pages/Login";
import Main from "~/pages/Main";

export const publicRoutes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/main",
    component: Main,
  },
];
