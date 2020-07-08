import React, {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {SignupForm} from './screens/SignupForm'
import {LoginForm} from './screens/LoginForm'
import {CandidatesList} from './screens/CandidatesList'
import {CandidateDetails} from './screens/CandidateDetails'
import {Context} from './store/Store'
import './App.css';

export const App = (props)=> {
  const [state, dispatch] = useContext(Context)

  const auth = {
    authenticate() {
      dispatch({type: "SET_AUTH"})
    },
    signout() {
      dispatch({type: "REMOVE_AUTH"})
    }
  };

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        state.auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div className="App">
      <header className="App-header">
          <Router>
            <Switch>
              <Route path="/signup">
                <SignupForm auth={auth}/>
              </Route>
              <Route path="/signin">
                <LoginForm auth={auth}/>
              </Route>
              <PrivateRoute exact path="/">
                <CandidatesList  auth={auth}/>
              </PrivateRoute>
              <PrivateRoute path="/details">
                <CandidateDetails />
              </PrivateRoute>
            </Switch>
          </Router>
      </header>
    </div>
  );
}

