import { IFontFamily } from "~/interfaces/editor"
import { createReducer } from "@reduxjs/toolkit"
import { queryFonts, setFonts } from "./actions"

export interface FontsState {
  fonts: IFontFamily[]
  result: IFontFamily[]
}

const initialState: FontsState = {
  fonts: [],
  result: [],
}

function fuzzySearch(items: IFontFamily[], query: string) {
  let search = query.split(" ")
  let ret = items.reduce((found, i) => {
    let matches = 0
    search.forEach((s) => {
      let props = 0
      for (let prop in i) {
        // @ts-ignore
        if (i[prop].indexOf(s) > -1) {
          props++
        }
      }
      if (props >= 1) {
        matches++
      }
    })
    if (matches == search.length) {
      // console.log(i, found, 'was found');
      // @ts-ignore
      found.push(i)
    }
    return found
  }, [])
  return ret
}

export const fontsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setFonts, (state, { payload }) => {
    state.fonts = payload
  })

  builder.addCase(queryFonts, (state, { payload }) => {
    const { take, skip, query } = payload
    if (query) {
      state.result = fuzzySearch(state.fonts, query)
    } else {
      state.result = state.fonts.slice(0, skip * 100)
    }
    // const data = fuzzySearch(state.fonts, "open")
    // console.log(data)
  })
})
