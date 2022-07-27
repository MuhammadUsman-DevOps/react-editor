import React from "react"
import { Page } from "~/interfaces/DesignEditor"
import { DesignType } from "~/interfaces/DesignEditor"

interface IDesignEditorContext {
  pages: Page[]
  setPages: (value: ((prevState: Page[]) => Page[]) | Page[]) => void
  currentPage: Page | null
  setCurrentPage: (value: ((prevState: null) => null) | null) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  editorType: DesignType
  setEditorType: React.Dispatch<React.SetStateAction<DesignType>>
  displayPlayback: boolean
  setDisplayPlayback: React.Dispatch<React.SetStateAction<boolean>>
  displayPreview: boolean
  setDisplayPreview: React.Dispatch<React.SetStateAction<boolean>>
}

export const DesignEditorContext = React.createContext<IDesignEditorContext>({
  pages: [],
  currentPage: null,
  setPages: () => {},
  setCurrentPage: () => {},
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
  editorType: "NONE",
  setEditorType: () => {},
  displayPlayback: false,
  setDisplayPlayback: () => {},
  displayPreview: false,
  setDisplayPreview: () => {},
})

export const DesignEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [pages, setPages] = React.useState<Page[]>([])
  const [currentPage, setCurrentPage] = React.useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [editorType, setEditorType] = React.useState<DesignType>("NONE")
  const [displayPlayback, setDisplayPlayback] = React.useState<boolean>(false)
  const [displayPreview, setDisplayPreview] = React.useState<boolean>(false)

  const context = {
    pages,
    setPages,
    currentPage,
    setCurrentPage,
    isSidebarOpen,
    setIsSidebarOpen,
    editorType,
    setEditorType,
    displayPlayback,
    setDisplayPlayback,
    displayPreview,
    setDisplayPreview,
  }
  return <DesignEditorContext.Provider value={context}>{children}</DesignEditorContext.Provider>
}
