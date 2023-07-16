import React, { useState } from "react"
import { useApolloClient, useMutation, gql } from "@apollo/client"
import { Field } from "../shared/Field"
import { Form, FormValues } from "../shared/Form"
import { NewEntitySuccess } from "../shared/NewEntitySuccess"
import { NewEntityError } from "../shared/NewEntityError"
import { Panel } from "../shared/Panel"
import { Button } from "../shared/Button"
import { Text } from "../shared/Text"
import {
  createNewIssue,
  createNewIssueVariables,
  createNewIssue_createIssue_issue
} from "./types/createNewIssue"
import { GET_REPOSITORY } from "../queries/getRepository"
import {
  getRepository,
  getRepositoryVariables
} from "../queries/types/getRepository"

const CREATE_ISSUE = gql`
  mutation createNewIssue(
    $title: String!
    $body: String
    $repository: ID!
  ) {
    createIssue(
      input: { title: $title, body: $body, repositoryId: $repository }
    ) {
      issue {
        title
        url
      }
    }
  }
`

export const NewIssue = () => {
  const [error, setError] = useState<Error | null>()
  const [issue, setIssue] =
    useState<createNewIssue_createIssue_issue | null>()
  const [createIssue] = useMutation<
    createNewIssue,
    createNewIssueVariables
  >(CREATE_ISSUE)

  const client = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const [repo, title, body] = values.textbox
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

    if (!data || !data.repository) {
      return
    }

    try {
      const result = await createIssue({
        variables: {
          title,
          body,
          repository: data.repository.id
        }
      })

      setIssue(result.data?.createIssue?.issue)
    } catch (e) {
      setError(e)
    }
  }

  if (error) {
    return (
      <NewEntityError error={error} onClose={() => setError(null)} />
    )
  }

  if (issue) {
    return (
      <NewEntitySuccess
        title="New issue created"
        url={issue.url}
        onClose={() => setIssue(null)}
      />
    )
  }

  return (
    <Panel top="25%" left="center" height={12}>
      <Text left="center">New Issue</Text>
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
