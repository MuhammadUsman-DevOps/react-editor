import { IStaticText } from "@layerhub-io/types"
import { groupBy } from "lodash"

export const getTextProperties = (object: Required<IStaticText>, fonts: any[]) => {
  const color = object.fill
  const family = object.fontFamily
  const selectedFont = fonts.find((sampleFont) => sampleFont.postscript_name === family)
  const groupedFonts = groupBy(fonts, "family")
  const selectedFamily = groupedFonts[selectedFont!.family]
  const hasBold = selectedFamily.find((font) => font.postscript_name.includes("-Bold"))
  const hasItalic = selectedFamily.find((font) => font.postscript_name.includes("-Italic"))
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
