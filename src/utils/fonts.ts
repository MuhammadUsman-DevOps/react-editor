import { FontItem } from "~/interfaces/common"
import { IScene, ILayer, IStaticText } from "@layerhub-io/types"

const getFontsFromObjects = (objects: Partial<ILayer>[]) => {
  let fonts: any[] = []
  for (const object of objects) {
    if (object.type === "StaticText" || object.type === "DynamicText") {
      fonts.push({
        name: (object as Required<IStaticText>).fontFamily,
        url: (object as Required<IStaticText>).fontURL,
      })
    }
    if (object.type === "Group") {
      // @ts-ignore
      let groupFonts = getFontsFromObjects(object.objects)

      fonts = fonts.concat(groupFonts)
    }
  }
  return fonts
}

export const loadTemplateFonts = async (design: IScene) => {
  const fonts = getFontsFromObjects(design.layers)
  if (fonts.length > 0) {
    await loadFonts(fonts)
  }
}

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
