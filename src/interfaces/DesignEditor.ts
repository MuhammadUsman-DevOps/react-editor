export interface Page {
  id: string
  name: string
  preview: string
}

export type DesignType = "GRAPHIC" | "PRESENTATION" | "VIDEO" | "NONE"

export interface ContextMenuTimelineRequest {
  id: string
  top: number
  left: number
  visible: boolean
}