import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Signup from './components/signup'
import './index.css'
import './custom.css'

export default function App() {
        return (
                <Router>
                        <Switch>
                                <Route path="/signup">
                                        <Signup />
                                </Route>
                        </Switch>
                </Router>
        )
}