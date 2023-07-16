import React, { useState } from "react"
import { useApolloClient, useMutation, gql } from "@apollo/client"
import { Field } from "../shared/Field"
import { Form, FormValues } from "../shared/Form"
import { NewEntitySuccess } from "../shared/NewEntitySuccess"
import { NewEntityError } from "../shared/NewEntityError"
import { Panel } from "../shared/Panel"
import { Text } from "../shared/Text"
import { Button } from "../shared/Button"
import {
  getRepository,
  getRepositoryVariables
} from "../queries/types/getRepository"
import { GET_REPOSITORY } from "../queries/getRepository"
import {
  createNewPullRequest,
  createNewPullRequestVariables,
  createNewPullRequest_createPullRequest_pullRequest
} from "./types/createNewPullRequest"

const CREATE_PULL_REQUEST = gql`
  mutation createNewPullRequest(
    $baseRefName: String!
    $headRefName: String!
    $body: String
    $title: String!
    $repositoryId: ID!
  ) {
    createPullRequest(
      input: {
        title: $title
        body: $body
        repositoryId: $repositoryId
        baseRefName: $baseRefName
        headRefName: $headRefName
      }
    ) {
      pullRequest {
        title
        url
      }
    }
  }
`

export const NewPullRequest = () => {
  const [error, setError] = useState<Error | null>()
  const [pullRequest, setPullRequest] =
    useState<createNewPullRequest_createPullRequest_pullRequest | null>()
  const [createPullRequest] = useMutation<
    createNewPullRequest,
    createNewPullRequestVariables
  >(CREATE_PULL_REQUEST)

  const client = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    try {
      const [repo, title, body, baseRefName, headRefName] =
        values.textbox
      const [owner, name] = repo.split("/")

      if (!owner || !name) {
        setError(
          new Error(
            "Repository name should have <owner>/<name> format."
          )
        )
        return
      }

      const { data } = await client.query<
        getRepository,
        getRepositoryVariables
      >({
        query: GET_REPOSITORY,
        variables: {
          owner,
          name
        }
      })

      const result = await createPullRequest({
        variables: {
          title,
          body,
          repositoryId: data.repository.id,
          baseRefName,
          headRefName
        }
      })

      setPullRequest(result.data?.createPullRequest?.pullRequest)
    } catch (e) {
      setError(e)
    }
  }

  if (error) {
    return (
      <NewEntityError error={error} onClose={() => setError(null)} />
    )
  }

  if (pullRequest) {
    return (
      <NewEntitySuccess
        title="New pull request created"
        url={pullRequest.url}
        onClose={() => setPullRequest(null)}
      />
    )
  }

  return (
    <Panel top="25%" left="center" height={14}>
      <Text left="center">New Pull Request</Text>
      <Form onSubmit={onSubmit}>
        {(triggerSubmit) => {
          return (
            <>
              <Field
                top={0}
                label="Repo: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={1}
                label="Title: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={2}
                label="Body: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={3}
                label="Base: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={4}
                label="Head: "
                onSubmit={triggerSubmit}
              />
            </>
          )
        }}
      </Form>

      <Text left="center" bottom={3}>
        Tab: Next Field
      </Text>
      <Button left="center" bottom={1} onPress={onSubmit}>
        Enter: Submit
      </Button>
    </Panel>
  )
}
