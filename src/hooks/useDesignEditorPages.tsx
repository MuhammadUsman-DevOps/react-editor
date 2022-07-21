import React from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

export default function () {
  const { pages } = React.useContext(DesignEditorContext)
  return pages
}
