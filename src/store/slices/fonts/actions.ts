import { IFontFamily } from "~/interfaces/editor"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import api from "~/services/api"

export const setFonts = createAction<IFontFamily[]>("fonts/setFonts")

export const getFonts = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "fonts/getFonts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const fonts = await api.getFonts()
      dispatch(setFonts(fonts))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
