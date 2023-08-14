const REGEX_VAR = new RegExp(/\{\{[a-zA-Z0-9-_]+?\}\}/g)

export function replaceKeyWithValue(text: string, params: Record<string, string>) {
  function replaces() {
    const matches = text.matchAll(REGEX_VAR)
    let i = 0
    let pieces = ""
    for (const match of matches) {
      const startIndex = match["index"]
      const matchWord = match["0"]
      if (i === 0) {
        const initialSection = text.slice(0, startIndex)
        pieces = pieces + initialSection
      }
      const updatedValue = params[matchWord.substring(2, matchWord.length - 2)]
        ? params[matchWord.substring(2, matchWord.length - 2)]
        : matchWord.substring(2, matchWord.length - 2)
      pieces = pieces + updatedValue
      const lastPiece = text.slice(startIndex! + matchWord.length, text.length)
      text = pieces + lastPiece
      replaces()
      return false
    }
    return text
  }
  replaces()
  return text
}
