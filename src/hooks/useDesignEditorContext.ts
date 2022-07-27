import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

function useDesignEditorContext() {
  const { editorType, setEditorType, displayPlayback, setDisplayPlayback, setDisplayPreview, displayPreview } =
    useContext(DesignEditorContext)
  return {
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    setDisplayPreview,
    displayPreview,
  }
}

export default useDesignEditorContext
