import { useContext } from "react"
import { DesignEditorContext } from "~/contexts/DesignEditor"

export default function () {
  const { setIsSidebarOpen } = useContext(DesignEditorContext)
  return setIsSidebarOpen
}
