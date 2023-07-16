import { AppState } from "./state/appStateReducer"

export const save = (payload: AppState) => {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error("Error while saving the state.")
    }
  })
}
