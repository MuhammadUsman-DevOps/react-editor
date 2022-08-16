import { IDesign } from "@layerhub-io/types"
import React from "react"
import { ContextMenuTimelineRequest, DesignType } from "~/interfaces/DesignEditor"

interface IDesignEditorContext {
  scenes: IDesign[]
  setScenes: (value: ((prevState: IDesign[]) => IDesign[]) | IDesign[]) => void
  currentScene: IDesign | null
  setCurrentScene: React.Dispatch<React.SetStateAction<IDesign | null>>
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  editorType: DesignType
  setEditorType: React.Dispatch<React.SetStateAction<DesignType>>
  displayPlayback: boolean
  setDisplayPlayback: React.Dispatch<React.SetStateAction<boolean>>
  displayPreview: boolean
  setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>
  currentPreview: string
  setCurrentPreview: React.Dispatch<React.SetStateAction<string>>
  maxTime: number
  setMaxTime: React.Dispatch<React.SetStateAction<number>>
  contextMenuTimelineRequest: ContextMenuTimelineRequest
  setContextMenuTimelineRequest: React.Dispatch<React.SetStateAction<ContextMenuTimelineRequest>>
}

export const DesignEditorContext = React.createContext<IDesignEditorContext>({
  scenes: [],
  setScenes: () => {},
  currentScene: null,
  setCurrentScene: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  editorType: "NONE",
  setEditorType: () => {},
  displayPlayback: false,
  setDisplayPlayback: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
  currentPreview: "",
  setCurrentPreview: () => {},
  maxTime: 0,
  setMaxTime: () => {},
  contextMenuTimelineRequest: {
    id: "",
    left: 0,
    top: 0,
    visible: false,
  },
  setContextMenuTimelineRequest: () => {},
})

export const DesignEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [scenes, setScenes] = React.useState<IDesign[]>([])
  const [currentScene, setCurrentScene] = React.useState<IDesign | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [editorType, setEditorType] = React.useState<DesignType>("NONE")
  const [displayPlayback, setDisplayPlayback] = React.useState<boolean>(false)
  const [displayPreview, setDisplayPreview] = React.useState<boolean>(false)
  const [currentPreview, setCurrentPreview] = React.useState<string>("")
  const [maxTime, setMaxTime] = React.useState(5000)
  const [contextMenuTimelineRequest, setContextMenuTimelineRequest] = React.useState<ContextMenuTimelineRequest>({
    id: "",
    left: 0,
    top: 0,
    visible: false,
  })
  const context = {
    scenes,
    setScenes,
    currentScene,
    setCurrentScene,
    isSidebarOpen,
    setIsSidebarOpen,
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    displayPreview,
    setDisplayPreview,
    currentPreview,
    setCurrentPreview,
    maxTime,
    setMaxTime,
    contextMenuTimelineRequest,
    setContextMenuTimelineRequest,
  }
  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>
}
