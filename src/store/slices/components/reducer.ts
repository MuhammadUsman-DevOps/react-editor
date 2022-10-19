import { createReducer, current } from "@reduxjs/toolkit"
import { IComponent } from "~/interfaces/DesignEditor"
import { setPublicComponents } from "./actions"

export interface ComponentsState {
   public: IComponent[]
}

const initialState: ComponentsState = {
   public: [],
}

export const componentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setPublicComponents, (state, { payload }) => {
    state.public = payload
  })
})
