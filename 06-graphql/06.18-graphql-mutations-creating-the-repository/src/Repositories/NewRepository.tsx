import React, { useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { Field } from "../shared/Field"
import { Text } from "../shared/Text"
import { Button } from "../shared/Button"
import { Form, FormValues } from "../shared/Form"
import { Panel } from "../shared/Panel"
import { NewEntitySuccess } from "../shared/NewEntitySuccess"
import { NewEntityError } from "../shared/NewEntityError"
import {
  createNewRepository_createRepository_repository,
  createNewRepository,
  createNewRepositoryVariables
} from "./types/createNewRepository"
import { RepositoryVisibility } from "../types/graphql-global-types"

const CREATE_REPOSITORY = gql`
  mutation createNewRepository(
    $name: String!
    $description: String!
    $visibility: RepositoryVisibility!
  ) {
    createRepository(
      input: {
        name: $name
        description: $description
        visibility: $visibility
      }
    ) {
      repository {
        name
        url
        id
      }
    }
  }
`

export const NewRepository = () => {
  const [error, setError] = useState<Error | null>()
  const [repository, setRepository] =
    useState<createNewRepository_createRepository_repository | null>()
  const [createrepository] = useMutation<
    createNewRepository,
    createNewRepositoryVariables
  >(CREATE_REPOSITORY)

  const onSubmit = async (values: FormValues) => {
    const [name, description] = values.textbox

    try {
      const result = await createrepository({
        variables: {
          name,
          description,
          visibility: RepositoryVisibility.PUBLIC
        }
      })

      setRepository(result.data?.createRepository?.repository)
    } catch (error) {
      setError(error)
    }
  }

  if (error) {
    return (
      <NewEntityError error={error} onClose={() => setError(null)} />
    )
  }

  if (repository) {
    return (
      <NewEntitySuccess
        title="New repository created"
        url={repository.url}
        onClose={() => setRepository(null)}
      />
    )
  }

  return (
    <Panel top="25%" left="center" height={12}>
      <Text left="center">New repository</Text>
      <Form onSubmit={onSubmit}>
        {(triggerSubmit) => {
          return (
            <>
              <Field
                top={0}
                label="Name: "
                onSubmit={triggerSubmit}
              />
              <Field
                top={1}
                label="Description: "
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
