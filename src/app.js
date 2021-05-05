import React, {useEffect, useState} from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Signup from './components/signup'
import Login from './components/login'
import Home from './components/home'
import './index.css'
import './custom.css'
import Settings from "./components/settings";
import Chat from "./components/chat";

export const Context = React.createContext()

export default function App() {
        const [user, setUser] = React.useState()
        const [friends, setFriends] = useState()
        
        return (
                <Context.Provider value={{
                        user, setUser,
                        friends, setFriends
                }}>
                        <Router>
                                <Switch>
                                        <Route path="/signup"> <Signup /> </Route>
                                        <Route path="/login"> <Login /> </Route>
                                        <Route path="/settings"> <Settings /> </Route>
                                        <Route path="/chat"> <Chat /> </Route>
                                        <Route path="/"> <Home /> </Route>
                                </Switch>
                        </Router>
                </Context.Provider>
        )
}