import React from "react"
import { Route, Switch, useRouteMatch } from "react-router"
import { IssuesMain } from "./IssuesMain"

const NewIssue = () => <>New Issue</>
const IssuesList = () => <>Issues List</>

export const Issues = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.path} component={IssuesMain} />
      <Route path={`${match.path}/new`} component={NewIssue} />
      <Route path={`${match.path}/list`} component={IssuesList} />
    </Switch>
  )
}
