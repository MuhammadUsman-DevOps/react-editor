import Canvas from "./canvas"
import State from "./state"
import Frame from "./controllers/Frame"
import Zoom from "./controllers/Zoom"
import History from "./controllers/History"
import Objects from "./controllers/Objects"
import Events from "./controllers/Events"
import EventManager from "./event-manager"
import Scene from "./controllers/Scene"
import Renderer from "./controllers/Renderer"
import Personalization from "./controllers/Personalization"
import { EditorState } from "./common/interfaces"
import { defaultEditorConfig } from "./common/constants"
import Guidelines from "./controllers/Guidelines"
import { EditorConfig } from "~/types"

export class Editor extends EventManager {
  public canvas: Canvas
  public frame: Frame
  public zoom: Zoom
  public history: History
  public objects: Objects
  public scene: Scene
  public renderer: Renderer
  public state: EditorState
  public config: EditorConfig
  public canvasId: string
  protected events: Events
  protected personalization: Personalization
  protected guidelines: Guidelines
  constructor({ id, state, config }: { id: string; state?: EditorState; config: Partial<EditorConfig> }) {
    super()
    this.state = state ? state : new State()
    this.config = {
      ...defaultEditorConfig,
      ...config,
      id,
    }
    this.canvasId = id
    this.initializeCanvas()
    this.initializeControllers()
    this.state.setEditor(this)
  }

  public initializeCanvas = () => {
    const canvas = new Canvas({
      id: this.canvasId,
      config: this.config,
      editor: this,
    })
    this.canvas = canvas
  }

  public initializeControllers = () => {
    const options = {
      canvas: this.canvas.canvas,
      editor: this,
      config: this.config,
      state: this.state,
    }
    this.frame = new Frame(options)
    this.zoom = new Zoom(options)
    this.history = new History(options)
    this.objects = new Objects(options)
    this.events = new Events(options)
    this.personalization = new Personalization(options)
    this.scene = new Scene(options)
    this.guidelines = new Guidelines(options)
    this.renderer = new Renderer()
  }

  public debug() {
    console.log({
      objects: this.canvas.canvas.getObjects(),
      json: this.canvas.canvas.toJSON(),
    })
  }

  public destroy() {
    this.canvas.destroy()
  }
  // CONTEXT MENU
  public cancelContextMenuRequest = () => {
    this.state.setContextMenuRequest(null)
  }
}
