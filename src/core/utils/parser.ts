//@ts-nocheck

export function angleToPoint(angle: number, sx: number, sy: number) {
  while (angle < 0) angle += 360
  angle %= 360
  let a = sy,
    b = a + sx,
    c = b + sy, // 3 first corners
    p = (sx + sy) * 2, // perimeter
    rp = p * 0.00277, // ratio between perimeter & 360
    pp = Math.round((angle * rp + (sy >> 1)) % p) // angle position on perimeter

  if (pp <= a) return { x: 0, y: sy - pp }
  if (pp <= b) return { y: 0, x: pp - a }
  if (pp <= c) return { x: sx, y: pp - b }
  return { y: sy, x: sx - (pp - c) }
}

export function base64ImageToFile(str) {
  // extract content type and base64 payload from original string
  const pos = str.indexOf(";base64,")
  const type = str.substring(5, pos)
  const b64 = str.substr(pos + 8)

  // decode base64
  const imageContent = atob(b64)

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  const buffer = new ArrayBuffer(imageContent.length)
  const view = new Uint8Array(buffer)

  // fill the view, using the decoded base64
  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n)
  }

  // const filename = `background.${type.split('/')[1]}`
  // convert ArrayBuffer to Blob
  let blob = new Blob([buffer], { type: type })
  const objectURL = URL.createObjectURL(blob)
  // const file = new File([blob], filename)
  return objectURL
}
