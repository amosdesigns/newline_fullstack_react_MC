import React from "react"
import { WelcomeWindow } from "./WelcomeWindow"
import { Issues } from "./Issues"
import { Repositories } from "./Repositories"
import { PullRequests } from "./PullRequests"
import { Header } from "./Header"
import { Switch, Route } from "react-router"

export const App = () => {
  return (
    <blessed-box
      style={{
        bg: "#0000ff"
      }}
    >
      <Header />
      <Switch>
        <Route exact path="/" component={WelcomeWindow} />
        <Route path="/issues" component={Issues} />
        <Route path="/repositories" component={Repositories} />
        <Route path="/pull-requests" component={PullRequests} />
      </Switch>
    </blessed-box>
  )
}
