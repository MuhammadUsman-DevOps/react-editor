import { RootState } from "~/store/rootReducer";

export const selectFonts = (state: RootState) => state.fonts.fonts;
