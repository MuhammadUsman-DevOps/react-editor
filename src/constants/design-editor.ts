import { nanoid } from "nanoid"
import { IDesign } from "@scenify/types"

export const defaultTemplate: IDesign = {
  id: nanoid(),
  frame: {
    width: 560,
    height: 560,
  },
  layers: [
    {
      id: "background",
      name: "Initial Frame",
      left: 0,
      top: 0,
      width: 560,
      height: 560,
      type: "Background",
      fill: "#ffffff",
      metadata: {},
    },
  ],
  metadata: {},
}
