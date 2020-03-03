/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Pages from "@material-ui/icons/Pages";
import Group from "@material-ui/icons/Group";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccer";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import SessionList from "views/Session/SessionList";
import SessionForm from "views/Session/SessionForm";
import TeamList from "views/Team/TeamList";
import TeamForm from "views/Team/TeamForm";
import ActivityForm from "views/Activity/ActivityForm";
import ActivityList from "views/Activity/ActivityList";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    isSidebar: true
  },
  {
    path: "/team/list",
    name: "Equipe",
    icon: Group,
    component: TeamList,
    isSidebar: true
  },
  {
    path: "/team/create",
    name: "Equipe",
    icon: Group,
    component: TeamForm
  },
  {
    path: "/team/edit/:id",
    name: "Equipe",
    icon: Group,
    component: TeamForm
  },
  {
    path: "/session/list",
    name: "Sessão",
    icon: Pages,
    component: SessionList,
    isSidebar: true
  },
  {
    path: "/session/create",
    name: "Sessão",
    icon: Pages,
    component: SessionForm
  },
  {
    path: "/session/edit/:id",
    name: "Sessão",
    icon: Pages,
    component: SessionForm
  },
  {
    path: "/activity/list",
    name: "Atividade",
    icon: SportsSoccerIcon,
    component: ActivityList,
    isSidebar: true
  },
  {
    path: "/activity/create",
    name: "Atividade",
    icon: SportsSoccerIcon,
    component: ActivityForm
  },
  {
    path: "/activity/edit/:id",
    name: "Atividade",
    icon: SportsSoccerIcon,
    component: ActivityForm
  }
];

export default dashboardRoutes;
