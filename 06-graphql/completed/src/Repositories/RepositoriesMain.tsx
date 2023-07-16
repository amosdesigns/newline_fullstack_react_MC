import React from "react"
import { useHistory, useRouteMatch } from "react-router"
import { useRef } from "react"
import { Panel } from "../shared/Panel"
import { Button } from "../shared/Button"
import { Text } from "../shared/Text"

export const RepositoriesMain = () => {
  const history = useHistory()
  const match = useRouteMatch()
  const ref = useRef<any>()

  React.useEffect(() => {
    ref.current.key("c", () => history.push(`${match.url}/new`))
    ref.current.key("l", () => history.push(`${match.url}/list`))
  }, [])

  return (
    <Panel ref={ref} height={11} top="25%" left="center">
      <Text left="center">Repositories</Text>
      <Text top={2} left="center">
        Click on the button or press the corresponding key.
      </Text>

      <Button left="center" bottom={3}>
        l:List Repositories
      </Button>

      <Button left="center" bottom={1}>
        c:Create New Repository
      </Button>
    </Panel>
  )
}
