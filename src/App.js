import React from 'react';
import './css/main.css'
import { createBrowserHistory } from 'history';
import { Switch, Route, Router, Redirect } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { blue } from './mui';
import { DefaultLayout, } from './Layout/DefaultLayout';
import { AuthPage, NotFound } from './routes/Loaders';
// import NotFound from './view/NotFound/notfound';

export const history = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      light: '#daa520',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    textPrimary: {
      main: "#daa520"
    }
  }
})
const App = () => {

  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history} >
        <Switch>
           <Redirect
        exact
        from="/"
        to="/profile"
          />
          <Route exact path="/auth" name="Login" key="auth" component={AuthPage} />
          <Route path="/" name="Home" key="home" component={DefaultLayout} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
export default App;
