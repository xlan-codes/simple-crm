import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Login'));
const PrivateRoute = React.lazy(() => import('./components/privateroutes'));
// const Register = React.lazy(() => import('./views/Pages/Register'));
// const Page404 = React.lazy(() => import('./views/Pages/Page404'));
// const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     response: false,
  //     endpoint: "http://localhost:3000"
  //   };
  // }

  // componentDidMount() {
  //   const { endpoint } = this.state;
  //   const socket = socketIOClient(endpoint);
  //   socket.on("FromAPI", data => this.setState({ response: data }));
  // }

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              {/* <PrivateRoute exact path="/" component={DefaultLayout} /> */}
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
               {/* <PrivateRoute exact path="/" component= { <DefaultLayout />} /> */}
               {/* <PrivateRoute exact path="/" render={props => <DefaultLayout {...props}/>} /> */}
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> 
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
