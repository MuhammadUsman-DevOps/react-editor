export const getSelectionMetadata = (selection: any) => {
  if (selection._objects) {
    return {
      isGroup: selection.type === "group",
      isMultiple: true,
    }
  } else {
    return {
      isGroup: false,
      isMultiple: false,
    }
  }
}
export const getTextOptions = (selection: any) => {
  const selectionMetadata = getSelectionMetadata(selection)
  if (selection._objects) {
    const object = selection._objects[0]
    const { underline, textAlign, fontSize, fill, charSpacing, lineHeight, fontFamily } = object
    return {
      underline,
      textAlign,
      fontSize,
      fill,
      charSpacing,
      lineHeight,
      fontFamily,
      ...selectionMetadata,
    }
  } else {
    const { underline, textAlign, fontSize, fill, charSpacing, lineHeight, fontFamily } = selection
    return {
      underline,
      textAlign,
      fontSize,
      fill,
      charSpacing,
      lineHeight,
      fontFamily,
      ...selectionMetadata,
    }
  }
}
