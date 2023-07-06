import { fabric } from "fabric"

export class StaticAudioObject extends fabric.Object {
  static type = "StaticAudio"
  initialize(options: StaticAudioOptions) {
    super.initialize({
      width: 0,
      height: 0,
      selectable: false,
      evented: false,
      visible: false,
      ...options,
    })
    return this
  }

  static fromObject(options: StaticAudioOptions, callback: Function) {
    return callback && callback(new fabric.StaticAudio(options))
  }
}

fabric.StaticAudio = fabric.util.createClass(StaticAudioObject, {
  type: StaticAudioObject.type,
})
fabric.StaticAudio.fromObject = StaticAudioObject.fromObject

export interface StaticAudioOptions extends fabric.IObjectOptions {
  id: string
  name: string
  src: string
}

declare module "fabric" {
  namespace fabric {
    class StaticAudio extends StaticAudioObject {
      constructor(options: StaticAudioOptions)
    }
  }
}
