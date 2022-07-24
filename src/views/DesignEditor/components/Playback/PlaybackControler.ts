import * as PIXI from "pixi.js"

PIXI.settings.SORTABLE_CHILDREN = true

export interface Element {
  id: string
  type: string
  url: string
  startAt: number
  endAt?: number
  position: {
    x: number
    y: number
    zIndex: number
  }
  objectId?: string
}
export const data: Element[] = [
  {
    id: "1",
    type: "StaticVideo",
    url: "https://player.vimeo.com/external/342571552.sd.mp4?s=e0df43853c25598dfd0ec4d3f413bce1e002deef&profile_id=139&oauth2_token_id=57447761",
    startAt: 2500,
    position: {
      x: 100,
      y: 50,
      zIndex: 1,
    },
  },
  {
    id: "2",
    type: "StaticVideo",
    url: "https://player.vimeo.com/external/269971860.sd.mp4?s=a3036bd1a9f15c1b31daedad98c06a3b24cdd747&profile_id=165&oauth2_token_id=57447761",
    position: {
      x: 0,
      y: 0,
      zIndex: 0,
    },
    startAt: 0,
  },
  {
    id: "3",
    type: "StaticVideo",
    url: "https://player.vimeo.com/external/291648067.sd.mp4?s=7f9ee1f8ec1e5376027e4a6d1d05d5738b2fbb29&profile_id=165&oauth2_token_id=57447761",
    position: {
      x: 480,
      y: 16,
      zIndex: 2,
    },
    startAt: 3000,
  },
]

interface Options {
  /**
   * Fabric Object list
   */
  data?: Element[]
}

interface ElementWithSprite extends Element {
  /**
   * Pixi animation sprite
   */
  sprite: PIXI.Sprite

  /**
   * HTML Video Element
   */
  video: HTMLVideoElement
}

class PlaybackController {
  /**
   * Pixi container canvas id
   */
  private id: string
  /**
   * Pixi wrapper DOM Reference
   */
  private el: HTMLElement

  /**
   * Pixi app instance
   */
  private app: PIXI.Application

  /**
   * Resources map used to store the data needed to display the content
   */
  private resources: Map<string, ElementWithSprite>

  /**
   * Resources map for audio elements
   */
  private audioResources: Map<string, any>
  private clipResources: Map<string, any>

  /**
   * Required options used to hold the elements data
   */
  private options: Required<Options>
  private status: string = "STOPPED"

  /**
   * Whether the pixi app has been initialized
   */
  public initialized: Boolean

  constructor(id: string, options?: Options) {
    this.id = id
    this.resources = new Map()
    this.audioResources = new Map()
    this.clipResources = new Map()
    this.initialized = false
    this.options = { ...this.options, data: options!.data ? options!.data : [] }
    this.initialize()
  }

  /**
   * Initializes Pixi App
   * @returns
   * @private
   */
  private initialize = async () => {
    this.initializeContainer()
    this.initializeApplication()
    await this.initializeResources()
    this.initialized = true
  }

  /**
   * Get the container where the App wil be appended
   * @returns
   * @private
   */
  private initializeContainer = () => {
    const id = this.id
    const el = document.getElementById(id) as HTMLDivElement
    this.el = el
  }

  /**
   * renders the content in the webgl layer
   * @param progress Time Progress
   * @returns
   * @public
   */
  public render = (progress: number) => {
    for (let [key, value] of this.audioResources) {
      if (progress > value.startAt && progress < value.endAt) {
        value.audio.play()
        if (value.audio.paused) {
          value.audio.play()
        }
      } else {
        value.audio.pause()
      }
    }
    for (let [key, value] of this.resources) {
      if (progress > value.startAt && progress < value.endAt!) {
        this.applySpriteOptions(value.sprite, { visible: true })
      } else {
        this.applySpriteOptions(value.sprite, { visible: false })
      }
    }
  }

  /**
   * Show the resource content in the webgl layer
   * @public
   * @returns
   */
  public play = () => {
    for (let [key, value] of this.resources) {
      this.applySpriteOptions(value.sprite, value.position)
      if (value.type === "StaticVideo") {
        value.video.muted = false
        value.video.currentTime = 0
      }

      value.sprite.visible = true
      this.app.stage.addChild(value.sprite)
    }
  }
  /**
   * Changes the sprite options
   * Used to show or hide elements
   * @param sprite Pixi Sprite
   * @param {Object} options Object that contains the option values
   */
  private applySpriteOptions = (sprite: PIXI.Sprite, options: Record<string, any>) => {
    console.log(sprite, options)
    for (const property in options) {
      console.log(options[property])
      // @ts-ignore
      sprite[property] = options[property]
    }

    sprite.width = options.width * options.scaleX
    sprite.height = options.height * options.scaleY
  }

  /**
   * Creates the Pixi app instance and appends it to the HTML Div container
   * @returns
   * @private
   */
  private initializeApplication = () => {
    let app = new PIXI.Application({
      width: 1200,
      height: 1200,
      resizeTo: this.el,
      backgroundColor: 0xffffff,
      backgroundAlpha: 1,
    })
    this.el.appendChild(app.view)
    this.app = app
  }

  /**
   * Loads the files and stores the data
   * @returns
   * @private
   */
  private initializeResources = async () => {
    const data = this.options.data
    // console.log({ data })
    const loader = new PIXI.Loader()
    for (const item of data) {
      if (item.type === "StaticVideo" || item.type === "StaticGIF" || item.type === "StaticAudio") {
        // console.log({ item })
        loader.add(item.id, item.url)
      } else {
        // Handle if it is an image
        if (item.url.match(/blob/)) {
          loader.add(item.id, item.url, {
            loadType: PIXI.LoaderResource.LOAD_TYPE.IMAGE,
            xhrType: PIXI.LoaderResource.XHR_RESPONSE_TYPE.BLOB,
          })
        } else {
          loader.add(item.id, item.url)
        }
      }
    }
    return new Promise((resolve) => {
      loader.load((loader, resources) => {
        for (const [key, resource] of Object.entries(resources)) {
          const element = this.options.data.find((i) => i.id === key) as Element

          const object = resource.data
          if (element.type === "StaticVideo") {
            object.muted = true
          }

          let texture: PIXI.Texture<PIXI.Resource> = PIXI.Texture.from(object)

          let sprite = new PIXI.Sprite(texture)
          this.resources.set(key, {
            ...element,
            sprite: sprite,
            video: object,
          })

          // if (element.type === "StaticGIF") {
          //   this.gifsResourceData.push({ key, objectId: element.objectId })
          // }
        }
        resolve(true)
      })
    })
  }
}
export default PlaybackController
