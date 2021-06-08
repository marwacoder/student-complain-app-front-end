import React from 'react';
import Loadable from 'react-loadable';
// import { DefaultLayout } from './DefaultLayout';

import Spinner from '../helpers/components/Spinner/Spinner';


const styleProps ={
    color: '#00854D',
    height:50,
    width:50,
    className:'spinner-background-opt',
}

const Dashboard = Loadable ({
    loader: () => import('../view/Dashboard/DashboardContainer'),
    loading:()=> <Spinner {...styleProps} />,
});


const Student = Loadable ({
    loader: () => import('../view/student/table'),
    loading:()=> <Spinner {...styleProps} />,
});

const Staff = Loadable ({
    loader: () => import('../view/staff/table'),
    loading:()=> <Spinner {...styleProps} />,
});

const History = Loadable ({
    loader: () => import('../view/staff/history'),
    loading:()=> <Spinner {...styleProps} />,
});


const Account = Loadable ({
    loader: () => import('../view/staff/account'),
    loading:()=> <Spinner {...styleProps} />,
});

const Examiner = Loadable ({
    loader: () => import('../view/staff/examiner.js'),
    loading:()=> <Spinner {...styleProps} />,
});


const Lecturer = Loadable ({
    loader: () => import('../view/staff/lecturer'),
    loading:()=> <Spinner {...styleProps} />,
});

const StudenT = Loadable ({
    loader: () => import('../view/staff/StudentHome'),
    loading:()=> <Spinner {...styleProps} />,
});


const Profile = Loadable ({
    loader: () => import('../view/staff/profile.js'),
    loading:()=> <Spinner {...styleProps} />,
});


const Course = Loadable ({
    loader: () => import('../view/staff/course.js'),
    loading:()=> <Spinner {...styleProps} />,
});



export const AuthPage = Loadable({
  loader: () => import('../view/Authentication/WelcomeContainer'),
  loading:()=> <Spinner {...styleProps} />,
});

export const NotFound = Loadable({
  loader: () => import('../view/NotFound/notfound'),
  loading:()=> <Spinner {...styleProps} />,
});


const routes = [
    {path: '/auth', component: AuthPage, title: 'welcome', key: 'welcome'},
    {path:'/',exact: true, name:"Home", component:Dashboard },
    { path: '/dashboard', name: "Dashboard", component: Dashboard },
    { path: '/student', name: "Student", component: Student },
    { path: '/staff', name: "Student", component: Staff },
    { path: '/history', name: "History", component: History },
    { path: '/account', name: "Account", component: Account },
    { path: '/examiner', name: "Examiner", component: Examiner },
    { path: '/lecturer', name: "Lecturer", component: Lecturer },
    { path: '/studentT', name: "Student", component: StudenT },
    { path: '/profile',exact: true, name: "Profile", component: Profile },
    { path: '/course', name: "Course", component: Course},
    
];

export default routes