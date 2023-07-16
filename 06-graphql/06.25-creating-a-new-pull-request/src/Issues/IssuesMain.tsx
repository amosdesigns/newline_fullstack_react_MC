import React from "react"
import { useHistory, useRouteMatch } from "react-router"
import { useRef } from "react"
import { Panel } from "../shared/Panel"
import { Button } from "../shared/Button"
import { Text } from "../shared/Text"

export const IssuesMain = () => {
  const history = useHistory()
  const match = useRouteMatch()
  const ref = useRef<any>()

  React.useEffect(() => {
    const goToNew = () => history.push(`${match.url}/new`)
    const goToList = () => history.push(`${match.url}/list`)

    ref.current.key("c", goToNew)
    ref.current.key("l", goToList)
    return () => {
      ref.current.unkey("c", goToNew)
      ref.current.unkey("l", goToList)
    }
  }, [])

  return (
    <Panel ref={ref} height={11} top="25%" left="center">
      <Text left="center">Issues</Text>
      <Text top={2} left="center">
        Click on the button or press the corresponding key.
      </Text>

      <Button left="center" bottom={3}>
        l:List Issues
      </Button>

      <Button left="center" bottom={1}>
        c:Create New Issue
      </Button>
    </Panel>
  )
}
