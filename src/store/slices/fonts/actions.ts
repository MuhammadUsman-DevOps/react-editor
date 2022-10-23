import { IFontFamily } from "~/interfaces/editor"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import api from "~/services/api"
import { orderBy } from "lodash"

interface QueryFont {
  take: number
  skip: number
  query: string
}

export const setFonts = createAction<IFontFamily[]>("fonts/setFonts")

export const queryFonts = createAction<QueryFont>("fonts/queryFonts")

export const getFonts = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "fonts/getFonts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const fonts = await api.getFonts()
      dispatch(setFonts(orderBy(fonts, ["family"], ["asc"])))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
