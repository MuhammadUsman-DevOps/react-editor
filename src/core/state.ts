import { EditorState } from "./common/interfaces"

export default class State implements EditorState {
  public frame = null
  public activeObject = null
  public objects = []
  public zoomRatio = 1
  public contextMenuRequest = null
  public editor = null
  public setFrame(o: any) {
    this.frame = o
  }
  public setActiveObject(o: any) {
    this.activeObject = o
  }
  public setObjects(o: any) {
    this.objects = o
  }
  public setZoomRatio(o: any) {
    this.zoomRatio = o
  }
  public setContextMenuRequest(o: any) {
    this.contextMenuRequest = o
  }
  public setEditor(o: any) {
    this.editor = o
  }
}
