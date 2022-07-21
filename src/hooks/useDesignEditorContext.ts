import { DesignEditorContext } from "~/contexts/DesignEditor"
import { useContext } from "react"

function useDesignEditorContext() {
  const { editorType, setEditorType } = useContext(DesignEditorContext)
  return {
    editorType,
    setEditorType,
  }
}

export default useDesignEditorContext
