export default function (selection: any): string[] | null {
  let types = []
  if (!selection) {
    return null
  }
  if (selection.locked) {
    return ["Locked"]
  }

  if (selection.type === "group" || selection.type === "activeSelection") {
    return ["Multiple"]
  }

  if (selection._objects) {
    if (selection.type !== "StaticVector") {
      for (const object of selection._objects) {
        types.push(object.type)
      }
    } else {
      types.push(selection.type)
    }
  } else {
    types.push(selection.type)
  }

  return types
}
