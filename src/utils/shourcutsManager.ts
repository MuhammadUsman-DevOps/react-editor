class ShortcutManager {
  //delete
  isDelete(event: KeyboardEvent) {
    return event.key === "Delete" || event.key === "Backspace"
  }

  // save or update template
  isCtrlS(event: KeyboardEvent) {
    return event.ctrlKey && event.code === "KeyS"
  }

  // select all
  isCtrlA(event: KeyboardEvent) {
    return event.ctrlKey && event.code === "KeyA"
  }

  // copy
  isCtrlC(event: KeyboardEvent) {
    return event.ctrlKey && event.code === "KeyC"
  }

  // paste
  isCtrlV(event: KeyboardEvent) {
    return event.ctrlKey && event.code === "KeyV"
  }
  // redo
  isCtrlY(event: KeyboardEvent) {
    return event.ctrlKey && event.code === "KeyY"
  }

  // cut
  isCtrlX(event: KeyboardEvent) {
    return event.ctrlKey && event.code === "KeyX"
  }

  // nudge
  isArrowUp(event: KeyboardEvent) {
    return event.code === "ArrowUp"
  }

  // nudge
  isArrowDown(event: KeyboardEvent) {
    return event.code === "ArrowDown"
  }

  // nudge
  isArrowLeft(event: KeyboardEvent) {
    return event.code === "ArrowLeft"
  }

  // nudge
  isArrowRight(event: KeyboardEvent) {
    return event.code === "ArrowRight"
  }

  // modifier
  isShift(event: KeyboardEvent) {
    return event.shiftKey
  }

  // lineHeight--
  isAltDown(event: KeyboardEvent) {
    return event.altKey && event.code === "ArrowDown"
  }

  // lineHeight++
  isAltUp(event: KeyboardEvent) {
    return event.altKey && event.code === "ArrowUp"
  }

  // charSpacing++
  isAltRight(event: KeyboardEvent) {
    return event.altKey && event.code === "ArrowRight"
  }
  // charSpacing--
  isAltLeft(event: KeyboardEvent) {
    return event.altKey && event.code === "ArrowLeft"
  }

  // redo
  isCtrlShiftZ(event: KeyboardEvent) {
    return event.ctrlKey && event.shiftKey && event.code === "KeyZ"
  }

  // undo
  isCtrlZ(event: KeyboardEvent) {
    return event.ctrlKey && !event.shiftKey && event.code === "KeyZ"
  }

  // zoom reset
  isCtrlOne(event: KeyboardEvent) {
    return event.ctrlKey && event.key === "1"
  }

  // zoom in
  isCtrlMinus(event: KeyboardEvent) {
    return event.ctrlKey && event.key === "-"
  }

  // zoom out
  isCtrlEqual(event: KeyboardEvent) {
    return event.ctrlKey && event.key === "="
  }

  // zoom to fit
  isCtrlZero(event: KeyboardEvent) {
    return event.ctrlKey && event.key === "0"
  }
}

export default new ShortcutManager()
