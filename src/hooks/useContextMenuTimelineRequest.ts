import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

function useContextMenuTimelineRequest() {
  const {
    contextMenuTimelineRequest
  } = useContext(DesignEditorContext)
  return contextMenuTimelineRequest
}

export default useContextMenuTimelineRequest
