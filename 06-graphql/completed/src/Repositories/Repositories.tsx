import React from "react"
import { Route, Switch, useRouteMatch } from "react-router"
import { RepositoriesMain } from "./RepositoriesMain"
import { RepositoriesList } from "./RepositoriesList"
import { NewRepository } from "./NewRepository"

export const Repositories = () => {
  const match = useRouteMatch()

  return (
    <Switch>
      <Route exact path={match.path} component={RepositoriesMain} />
      <Route path={`${match.path}/new`} component={NewRepository} />
      <Route
        path={`${match.path}/list`}
        component={RepositoriesList}
      />
    </Switch>
  )
}
