import * as React from "react"
import { EditorState } from "~/core"

const Context = React.createContext<EditorState>({
  zoomRatio: 1,
  activeObject: null,
  contextMenuRequest: null,
  frame: null,
  objects: [],
  editor: null,
  setActiveObject: () => {},
  setContextMenuRequest: () => {},
  setFrame: () => {},
  setObjects: () => {},
  setZoomRatio: () => {},
  setEditor: () => {},
})

const Provider: any = ({ children }) => {
  const [zoomRatio, setZoomRatio] = React.useState(1)
  const [activeObject, setActiveObject] = React.useState(null)
  const [frame, setFrame] = React.useState(null)
  const [editor, setEditor] = React.useState(null)
  const [contextMenuRequest, setContextMenuRequest] = React.useState(null)
  const [objects, setObjects] = React.useState([])

  return (
    <Context.Provider
      value={{
        zoomRatio,
        setZoomRatio,
        activeObject,
        setActiveObject,
        frame,
        setFrame,
        contextMenuRequest,
        setContextMenuRequest,
        objects,
        setObjects,
        editor,
        setEditor,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, Provider }
