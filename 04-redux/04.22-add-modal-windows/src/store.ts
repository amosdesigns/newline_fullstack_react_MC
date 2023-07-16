import { configureStore } from "@reduxjs/toolkit"
import { currentStroke } from "./modules/currentStroke/slice"
import { modalVisible } from "./modules/modals/slice"
import historyIndex from "./modules/historyIndex/slice"
import strokes from "./modules/strokes/slice"
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    historyIndex,
    strokes,
    currentStroke,
    modalVisible
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger)
})
