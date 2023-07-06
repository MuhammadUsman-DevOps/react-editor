import { Editor } from ".."
import { EditorState } from "../common/interfaces"
import { ControllerOptions, FabricCanvas } from "../common/interfaces"
import { EditorConfig } from "~/types"
class Base {
  protected canvas: FabricCanvas
  protected config: EditorConfig
  protected editor: Editor
  protected state: EditorState
  constructor({ canvas, config, editor, state }: ControllerOptions) {
    this.canvas = canvas
    this.config = config
    this.editor = editor
    this.state = state
  }
}

export default Base
