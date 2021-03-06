import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Article from '../Article'
import ArticleThread from '../ArticleThread'
import Dashboard from '../Dashboard'
import ArticleDashboard from '../Dashboard/ArticleDashboard'
import ArticleDelete from '../Dashboard/ArticleDelete'
import UserEditor from '../Dashboard/UserEditor'
import Home from '../Home'
import Offers from '../Offers'
import Navbar from '../Navbar'
import Profil from '../Profil'
import UserSettings from '../Profil/UserSettings'
import EditoEditing from '../Dashboard/EditoEditing'


export default function index() {

    return (
        <BrowserRouter>
        <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/offers" exact component={Offers} />

                <Route path="/profil" exact component={Profil} />
                <Route path="/profil/settings" exact component={UserSettings} />
                <Route path="/profil/:username" exact component={Profil} />
                <Route path="/articles/" exact component={ArticleThread} />
                <Route path="/article/:id" exact component={Article} />

                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/dashboard/user/:username" exact component={UserEditor} />
                <Route path="/dashboard/article/:id" exact component={ArticleDashboard} />
                <Route path="/dashboard/article/:id/delete" exact component={ArticleDelete} />

                <Route path="/dashboard/edito/:id" exact component={EditoEditing} />
                <Route path="/dashboard/edito/" exact component={EditoEditing} />
            </Switch>
        </BrowserRouter>
    )
}
