import { Dimension, RotationControlPosition } from "./common"

type SceneType = "CUSTOMIZATION" | "GRAPHIC" | "PRESENTATION" | "VIDEO"

export interface EditorConfig {
  id: string
  clipToFrame: boolean
  scrollLimit: number
  propertiesToInclude?: string[]
  shortcuts?: boolean
  guidelines?: boolean
  shadow: any
  frameMargin: number
  background: string
  size: Dimension
  controlsPosition: ControlsPosition
  type: SceneType
}

export interface ControlsPosition {
  rotation: RotationControlPosition
}
