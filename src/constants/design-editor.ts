import { nanoid } from "nanoid"
import { IDesign } from "@scenify/types"

export const defaultTemplate: IDesign = {
  id: nanoid(),
  frame: {
    width: 400,
    height: 400,
  },
  layers: [
    {
      id: "background",
      name: "Initial Frame",
      left: 0,
      top: 0,
      width: 400,
      height: 400,
      type: "Background",
      fill: "#ffffff",
      metadata: {},
    },
  ],
  metadata: {},
}
