import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import GamePage from "./pages/game-page"
export default function useRoutes () {
    return (
        <Switch>
            <Route path="/">
                <GamePage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}