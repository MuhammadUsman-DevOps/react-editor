import { Resource } from "~/interfaces/editor"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import api from "~/services/api"

export const setPixabayResources = createAction<Resource[]>("resources/setPixabayResources")

export const getPixabayResources = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "resources/getPixabayResources",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const pixabayResources = await api.getPixabayResources() 
      dispatch(setPixabayResources(pixabayResources))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)

export const getPexelsResources = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "resources/getPexelsResources",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const fonts = await api.getFonts()
      dispatch(setPixabayResources(fonts))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
