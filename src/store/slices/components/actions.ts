import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { IComponent } from "~/interfaces/DesignEditor"
import api from "~/services/api"

export const setPublicComponents = createAction<IComponent[]>("components/setPublicComponents")

export const getPublicComponents = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "components/getPublicComponents",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const components = await api.getPublicComponents()
      dispatch(setPublicComponents(components))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
