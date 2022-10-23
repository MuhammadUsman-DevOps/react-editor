import { RootState } from "~/store/rootReducer"

export const selectAllFonts = (state: RootState) => state.fonts.fonts
export const selectFonts = (state: RootState) => state.fonts.result
