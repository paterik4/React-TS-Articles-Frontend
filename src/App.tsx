import React from 'react';
import './App.css';
import { HomePage } from './components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { RegisterPage } from './components/Register/RegisterPage';
import { ToastContainer } from 'react-toastify';
import { LoginPage } from './components/Login/LoginPage';
import { Profile } from './components/Profile/Profile';
import { ArticlesPage } from './components/Articles/ArticlesPage';

interface AppProps {
}

const App: React.FC<AppProps> = () => {
  return (
      <Router>
          <div className="App">
              <Navbar />
              <div className="content">
                  <Switch>
                      <Route exact path="/" component={HomePage} />
                      <Route exact path="/register" component={RegisterPage} />
                      <Route exact path="/login" component={LoginPage} />
                      <Route exact path="/articles" component={ArticlesPage} />
                      <Route exact path="/profile" component={Profile} />
                    {/*<Route path="*" component={NoMatch} /> */}
                  </Switch>
              </div>
              <ToastContainer />
          </div>
      </Router>
  )
}

export default App;
