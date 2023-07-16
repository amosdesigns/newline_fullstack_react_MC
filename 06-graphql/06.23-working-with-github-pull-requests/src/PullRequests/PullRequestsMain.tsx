import React, { useEffect, useCallback } from "react"
import { useHistory, useRouteMatch } from "react-router"
import { useRef } from "react"
import { Panel } from "../shared/Panel"
import { debounce } from "../utils/debounce"
import { Button } from "../shared/Button"
import { Text } from "../shared/Text"

export const PullRequestsMain = () => {
  const history = useHistory()
  const match = useRouteMatch()
  const ref = useRef<any>()

  const goToNew = useCallback(
    debounce(() => history.push(`${match.url}/new`), 100),
    []
  )

  const goToList = useCallback(
    debounce(() => history.push(`${match.url}/list`), 100),
    []
  )

  useEffect(() => {
    ref.current.key("c", goToNew)
    ref.current.key("l", goToList)
    return () => {
      ref.current.unkey("c", goToNew)
      ref.current.unkey("l", goToList)
    }
  }, [])

  return (
    <Panel ref={ref} height={11} top="25%" left="center">
      <Text left="center">Pull Requests</Text>
      <Text top={2} left="center">
        Click on the button or press the corresponding key.
      </Text>

      <Button left="center" bottom={3} onPress={goToList}>
        l:List Pull Requests
      </Button>

      <Button left="center" bottom={1} onPress={goToNew}>
        c:Create new Pull Request
      </Button>
    </Panel>
  )
}
