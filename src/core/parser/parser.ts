import { fabric } from "fabric"
import generatePath from "./shape"

async function parseSVG(url: string) {
  return new Promise((resolve, reject) => {
    fabric.loadSVGFromURL(url, (objects, summary) => {
      const frame = {
        width: summary.width,
        height: summary.height,
      }

      let layers: any[] = []

      for (const object of objects) {
        if (object.type === "path") {
          const path = generatePath(object)
          layers = layers.concat(path)
        }
      }

      const design = {
        frame,
        layers,
        name: "Hello world",
      }
      resolve(design)
    })
  })
}

export default parseSVG
