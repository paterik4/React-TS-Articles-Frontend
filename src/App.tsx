import React from 'react';
import './App.css';
import { HomePage } from './components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { RegisterPage } from './components/Register/RegisterPage';
import { ToastContainer } from 'react-toastify';
import { Profile } from './components/Profile/Profile';
import { ArticlesPage } from './components/Articles/ArticlesPage';
import { CreateArticlePage } from './components/Articles/components/CreateArticle/CreateArticlePage';
import NoMatch from './components/NoMatch';
import { ArticleDetailsPage } from './components/Articles/components/ArticleDetails/ArticleDetailsPage';
import { AdminPage } from './components/AdminPage/AdminPage';
import { EditArticlePage } from './components/Articles/components/EditArticle/EditArticlePage';
import { EditProfilePage } from './components/Profile/components/EditProfile/EditProfilePage';
import { LoginPage } from './components/Login/LoginPage';

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
                            <Route exact path="/articles/:slug" component={ArticleDetailsPage} />
                            <Route exact path="/articles/:slug/editArticle" component={EditArticlePage} />
                            <Route exact path="/profile/:username" component={Profile} />
                            <Route exact path="/profile/:username/editprofile" component={EditProfilePage} />
                            <Route exact path="/createArticle" component={CreateArticlePage} />
                            <Route exact path="/admin" component={AdminPage} />
                            <Route path="*" component={NoMatch} />
                    </Switch>
                </div>
                <ToastContainer />
            </div>
        </Router>
    )
}

export default App;
