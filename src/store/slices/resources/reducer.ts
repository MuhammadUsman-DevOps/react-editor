import { IFontFamily, Resource } from "~/interfaces/editor"
import { createReducer } from "@reduxjs/toolkit"
import { setPixabayResources } from "./actions"

export interface ResourcesState {
  pixabay: Resource[]
}

const initialState: ResourcesState = {
  pixabay: [],
}

export const resourcesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPixabayResources, (state, { payload }) => {
    state.pixabay = payload
  })
})
