export default function (selection: any): string[] | null {
  const types = new Set<string>()
  if (!selection) {
    return null
  }
  if (selection._objects) {
    for (const object of selection._objects) {
      types.add(object.type)
    }
  } else {
    types.add(selection.type)
  }

  const typesArray = Array.from(types)

  return typesArray
}
