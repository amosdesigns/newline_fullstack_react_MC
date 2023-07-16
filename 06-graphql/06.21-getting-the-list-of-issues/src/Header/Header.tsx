import React, { useCallback } from "react"
import { useHistory, useLocation } from "react-router"
import { debounce } from "../utils/debounce"

export const Header = () => {
  const history = useHistory()
  const location = useLocation()

  const goToIssues = useCallback(
    debounce(() => history.push("/issues"), 100),
    []
  )

  const goToRepositories = useCallback(
    debounce(() => history.push("/repositories"), 100),
    []
  )

  const goToPRs = useCallback(
    debounce(() => history.push("/pull-requests"), 100),
    []
  )

  const goToRoot = useCallback(
    debounce(() => history.push("/"), 100),
    []
  )

  return (
    <blessed-listbar
      height={1}
      items={{
        Quit: {
          keys: "q"
        },
        Issues: {
          keys: "i",
          callback: goToIssues
        },
        Repositories: {
          keys: "r",
          callback: goToRepositories
        },
        "Pull Requests": {
          keys: "p",
          callback: goToPRs
        },
        ...(location.pathname !== "/" && {
          "Back to main screen": {
            keys: "b",
            callback: goToRoot
          }
        })
      }}
      style={{
        bg: "grey",
        height: 1
      }}
    />
  )
}
