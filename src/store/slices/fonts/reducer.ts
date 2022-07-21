import { IFontFamily } from "~/interfaces/editor";
import { createReducer } from "@reduxjs/toolkit";
import { setFonts } from "./actions";

export interface FontsState {
    fonts: IFontFamily[];
}

const initialState: FontsState = {
    fonts: [],
};

export const fontsReducer = createReducer(initialState, (builder) => {
    builder.addCase(setFonts, (state, { payload }) => {
        state.fonts = payload;
    });
});
