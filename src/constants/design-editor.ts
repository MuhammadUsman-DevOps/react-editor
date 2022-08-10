import { nanoid } from "nanoid"
import { IDesign } from "@layerhub-io/types"

export const defaultTemplate: IDesign = {
  id: nanoid(),
  frame: {
    width: 1200,
    height: 1200,
  },
  layers: [
    {
      id: "background",
      name: "Initial Frame",
      left: 0,
      top: 0,
      width: 1200,
      height: 1200,
      type: "Background",
      fill: "#ffffff",
      metadata: {},
    },
  ],
  metadata: {},
}
