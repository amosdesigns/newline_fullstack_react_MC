import React from "react"
import { Route, Switch, useRouteMatch } from "react-router"
import { IssuesMain } from "./IssuesMain"
import { IssuesList } from "./IssuesList"
import { NewIssue } from "./NewIssue"

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
