import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Article from '../Article'
import ArticleThread from '../ArticleThread'
import Dashboard from '../Dashboard'
import UserEditor from '../Dashboard/UserEditor'
import Home from '../Home'
import Navbar from '../Navbar'
import Profil from '../Profil'

export default function index() {

    return (
        <BrowserRouter>
        <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Route path="/profil/:username" exact component={Profil} />
                <Route path="/articles/" exact component={ArticleThread} />
                <Route path="/article/:id" exact component={Article} />

                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/dashboard/user/:username" exact component={UserEditor} />
            </Switch>
        </BrowserRouter>
    )
}
