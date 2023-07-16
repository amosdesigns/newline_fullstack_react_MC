import { RootState } from "../../utils/types"
import { Action, undo, redo } from "./actions"
import { endStroke } from "../sharedActions"

export const reducer = (
  state: RootState["historyIndex"] = 0,
  action: Action
) => {
  switch (action.type) {
    case endStroke.toString(): {
      return 0
    }
    case undo.toString(): {
      return Math.min(state + 1, action.payload)
    }
    case redo.toString(): {
      return Math.max(state - 1, 0)
    }
    default:
      return state
  }
}

export const historyIndexSelector = (state: RootState) =>
  state.historyIndex
