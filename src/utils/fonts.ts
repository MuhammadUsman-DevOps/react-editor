import { FontItem } from "~/interfaces/common"

export const loadFonts = (fonts: FontItem[]) => {
  const promisesList = fonts.map((font) => {
    return new FontFace(font.name, `url(${font.url})`).load().catch((err) => err)
  })
  return new Promise((resolve, reject) => {
    Promise.all(promisesList)
      .then((res) => {
        res.forEach((uniqueFont) => {
          if (uniqueFont && uniqueFont.family) {
            document.fonts.add(uniqueFont)
            resolve(true)
          }
        })
      })
      .catch((err) => reject(err))
  })
}
