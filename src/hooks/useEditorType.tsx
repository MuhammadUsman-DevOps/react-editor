import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

export default function () {
  const { editorType } = useContext(DesignEditorContext)
  return editorType
}
