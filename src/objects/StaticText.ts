import { fabric } from "fabric"

export class StaticTextObject extends fabric.Textbox {
  static type = "StaticText"
  public fontURL
  initialize(options: StaticTextOptions) {
    const { text, ...textOptions } = options
    //@ts-ignore
    super.initialize(text, { ...textOptions })

    return this
  }
  toObject(propertiesToInclude = []) {
    // const originalText = this.getText()
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      fontURL: this.fontURL,
      // keys: this.keys,
      // originalText: originalText,
      // metadata: this.metadata,
    })
  }
  toJSON(propertiesToInclude = []) {
    // const originalText = this.getText()
    return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
      fontURL: this.fontURL,
      // keys: this.keys,
      // originalText: originalText,
      // metadata: this.metadata,
    })
  }
  static fromObject(options: StaticTextOptions, callback: Function) {
    return callback && callback(new fabric.StaticText(options))
  }
}

fabric.StaticText = fabric.util.createClass(StaticTextObject, {
  type: StaticTextObject.type,
})
fabric.StaticText.fromObject = StaticTextObject.fromObject

export type StaticTextOptions = fabric.ITextboxOptions & { text: string; fontURL: string }

declare module "fabric" {
  namespace fabric {
    class StaticText extends StaticTextObject {
      constructor(options: StaticTextOptions)
    }
  }
}
