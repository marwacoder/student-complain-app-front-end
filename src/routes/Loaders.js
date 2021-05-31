
import React from 'react';
import Loading from '../helpers/components/Spinner/Spinner';
import Loadable from 'react-loadable';

export const DefaultLayout = Loadable({
  loader: () => import('../Layout/DefaultLayout/DefaultLayout'),
  loading: () => <Loading />
})
export const AuthPage = Loadable({
  loader: () => import('../view/Authentication/WelcomeContainer'),
  loading: () => <Loading />
});

export const NotFound = Loadable({
  loader: () => import('../view/NotFound/notfound'),
  loading:()=> <Loading/>,
});
