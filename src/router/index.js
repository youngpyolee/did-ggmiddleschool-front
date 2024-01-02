import { createRouter, createWebHistory ,createWebHashHistory} from "vue-router";

import Main             from "@/views/Main";
import JobCourse        from "@/views/JobCourse";
import SchoolInfo       from "@/views/SchoolInfo";
import SuburbsAct       from "@/views/SuburbsAct";
import SchoolNews       from "@/views/SchoolNews";
import AiInterview      from "@/views/AiInterview";
import TestDiagnosis    from "@/views/TestDiagnosis";
import SchoolInfoMain   from "@/views/SchoolInfoMain";
import SchoolAreaInfo   from "@/views/SchoolAreaInfo";

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/schoolInfo',
    name: 'SchoolInfo',
    component: SchoolInfo
  },
  {
    path: '/schoolInfoMain',
    name: 'SchoolInfoMain',
    component: SchoolInfoMain
  },
  {
    path: '/jobCourse',
    name: 'JobCourse',
    component: JobCourse
  },
  {
    path: '/testDiagnosis',
    name: 'TestDiagnosis',
    component: TestDiagnosis
  },
  {
    path: '/suburbsAct',
    name: 'SuburbsAct',
    component: SuburbsAct
  },
  {
    path: '/aiInterview',
    name: 'AiInterview',
    component: AiInterview
  },
  {
    path: '/schoolNews',
    name: 'SchoolNews',
    component: SchoolNews
  },
  {
    path: '/schoolAreaInfo',
    name: 'SchoolAreaInfo',
    component: SchoolAreaInfo
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition){
    return {
      x : 0,
      y : 0
    }
  }
});

export default router;