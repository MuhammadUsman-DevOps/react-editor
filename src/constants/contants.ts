import { TextOptions } from "~/interfaces/editor"

export const propertiesToInclude = ["id", "selectable"]

export const defaultTextOptions: TextOptions = {
  underline: false,
  textAlign: "left",
  charSpacing: 0,
  fill: "#000000",
  fontFamily: "Open Sans",
  fontSize: 12,
  lineHeight: 12,
  isGroup: false,
  isMultiple: false,
  styles: [],
  font: {},
  activeStyle: {},
}
