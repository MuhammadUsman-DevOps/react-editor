import { IStaticText } from "@layerhub-io/types"
import { groupBy } from "lodash"
import { IFontFamily } from "~/interfaces/editor"

export const getTextProperties = (object: Required<IStaticText>, fonts: IFontFamily[]) => {
  const color = object.fill
  const family = object.fontFamily
  const selectedFont = fonts.find((sampleFont) => sampleFont.postScriptName === family)
  const groupedFonts = groupBy(fonts, "family")
  const selectedFamily = groupedFonts[selectedFont!.family]
  const hasBold = selectedFamily.find((font) => font.postScriptName.includes("-Bold"))
  const hasItalic = selectedFamily.find((font) => font.postScriptName.includes("-Italic"))
  const styleOptions = {
    hasBold: !!hasBold,
    hasItalic: !!hasItalic,
    options: selectedFamily,
  }
  return {
    color,
    family: selectedFamily[0].family,
    bold: family.includes("Bold"),
    italic: family.includes("Italic"),
    underline: object.underline,
    styleOptions,
  }
}
