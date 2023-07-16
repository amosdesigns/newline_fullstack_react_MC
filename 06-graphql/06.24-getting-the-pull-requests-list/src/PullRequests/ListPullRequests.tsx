import React, { useRef } from "react"
import { Panel } from "../shared/Panel"
import { useEffect } from "react"
import open from "open"
import { useQuery, gql } from "@apollo/client"
import { List } from "../shared/List"
import { Text } from "../shared/Text"
import { listPullRequests } from "./types/listPullRequests"

const LIST_PULL_REQUESTS = gql`
  query listPullRequests {
    viewer {
      pullRequests(first: 100) {
        nodes {
          title
          url
        }
      }
    }
  }
`

export const ListPullRequests = () => {
  const { loading, error, data } = useQuery<listPullRequests>(
    LIST_PULL_REQUESTS
  )

  const listRef = useRef<any>()

  const pullRequests = data?.viewer.pullRequests.nodes

  useEffect(() => {
    listRef.current?.focus()
  }, [data])

  if (loading) {
    return (
      <Panel height={10} top="25%" left="center">
        <Text left="center">Loading...</Text>
      </Panel>
    )
  }

  if (error) {
    return <>Error: {JSON.stringify(error)}</>
  }

  return (
    <Panel height={10} top="25%" left="center">
      <Text left="center">List Pull Requests</Text>

      <List
        ref={listRef}
        top={2}
        onAction={(el) =>
          open(
            pullRequests?.find(
              (pullRequest) => pullRequest?.title === el.content
            )?.url || ""
          )
        }
        items={
          pullRequests?.map(
            (pullRequest) => pullRequest?.title || ""
          ) || []
        }
      />
    </Panel>
  )
}
