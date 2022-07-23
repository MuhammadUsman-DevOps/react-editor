import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

function useDesignEditorContext() {
  const { editorType, setEditorType, displayPlayback, setDisplayPlayback } = useContext(DesignEditorContext)
  return {
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
  }
}

export default useDesignEditorContext
