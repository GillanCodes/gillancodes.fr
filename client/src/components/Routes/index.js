import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from '../Home'
import Navbar from '../Navbar'
import Profil from '../Profil'

export default function index() {
    return (
        <BrowserRouter>
        <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Profil" exact component={Profil} />
            </Switch>
        </BrowserRouter>
    )
}
