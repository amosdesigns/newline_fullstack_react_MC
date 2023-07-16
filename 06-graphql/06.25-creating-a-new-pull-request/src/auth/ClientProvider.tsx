import React, { FC, PropsWithChildren } from "react"
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from "@apollo/client"
import { authFlowLink } from "./authFlowLink"

const cache = new InMemoryCache({
  typePolicies: {
    User: {
      merge: true
    }
  }
})

export const ClientProvider: FC<PropsWithChildren<{}>> = ({
  children
}) => {
  const client = new ApolloClient({
    cache,
    link: authFlowLink
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
