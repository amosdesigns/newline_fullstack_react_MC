import React from "react"
import { useQuery, gql } from "@apollo/client"

const GET_USER_INFO = gql`
  query getUserInfo {
    viewer {
      name
      bio
    }
  }
`

type UserInfo = {
  viewer: {
    name: string
    bio: string
  }
}

export const WelcomeWindow = () => {
  const { loading, data } = useQuery<UserInfo>(GET_USER_INFO)

  return <>{loading ? "Loading..." : JSON.stringify(data)}</>
}
