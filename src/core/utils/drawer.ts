// @ts-nocheck
import { fabric } from "fabric"

export function drawCircleIcon(ctx: CanvasRenderingContext2D, left, top, __styleOverride, fabricObject) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  ctx.beginPath()
  ctx.arc(0, 0, 6, 0, 2 * Math.PI)
  ctx.shadowColor = "#333333"
  ctx.shadowBlur = 3
  ctx.fillStyle = "#ffffff"
  ctx.fill()
  ctx.restore()
}

export function drawVerticalLineIcon(ctx: CanvasRenderingContext2D, left, top, _styleOverride, fabricObject) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  drawRectRounded(ctx, -2, -14, 4, 18, 2)
  ctx.lineWidth = 4
  ctx.strokeStyle = "#3782F7"
  ctx.stroke()

  ctx.fillStyle = "#ffffff"
  ctx.fill()
  ctx.restore()
}

function drawRectRounded(ctx: CanvasRenderingContext2D, x, y, w, h, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

export function drawHorizontalLineIcon(ctx, left, top, _styleOverride, fabricObject) {
  ctx.save()
  ctx.translate(left, top)
  ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
  drawRectRounded(ctx, -14, -2, 18, 4, 2)
  ctx.lineWidth = 4
  ctx.strokeStyle = "#3782F7"
  ctx.stroke()
  ctx.fillStyle = "#ffffff"
  ctx.fill()
  ctx.restore()
}

export function drawRotateIcon(ctx, left, top, _styleOverride, _fabricObject) {
  const radius = 6
  let lineWidth = radius / 3
  let arrowWidth = radius / 2
  const center = {
    x: left,
    y: top,
  }
  let arrow1 = {
    startAngle: 0 * Math.PI + 0.6,
    endAngle: 1.8 * Math.PI,
  }

  let arrow2 = {
    startAngle: (3 / 2) * Math.PI + 0.6,
    endAngle: (1 / 2) * Math.PI,
  }
  function draw(startAngle, endAngle) {
    ctx.beginPath()
    ctx.shadowBlur = 0

    ctx.arc(center.x, center.y, radius, startAngle, endAngle)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = "#3782F7"
    ctx.stroke()

    ctx.beginPath()
    let arrowTop = getPointOnCircle(center, radius, endAngle + 0.4)

    ctx.moveTo(arrowTop.x, arrowTop.y)

    let arrowLeft = getPointOnCircle(center, radius - arrowWidth, endAngle)
    ctx.lineTo(arrowLeft.x, arrowLeft.y)

    let arrowRight = getPointOnCircle(center, radius + arrowWidth, endAngle)
    ctx.lineTo(arrowRight.x, arrowRight.y)
    ctx.fillStyle = "#3782F7"

    ctx.closePath()
    ctx.fill()
  }

  function getPointOnCircle(center, radius, angle) {
    let pX = center.x + Math.cos(angle) * radius
    let pY = center.y + Math.sin(angle) * radius
    return { x: pX, y: pY }
  }

  ctx.save()
  ctx.translate(0, 0)

  ctx.beginPath()
  ctx.arc(center.x, center.y, radius + 5, 0, Math.PI * 2)
  ctx.fillStyle = "#ffffff"
  ctx.shadowBlur = 2
  ctx.shadowColor = "black"
  ctx.fill()
  ctx.closePath()
  draw(arrow1.startAngle, arrow1.endAngle)
  // draw(arrow2.startAngle, arrow2.endAngle);
  ctx.restore()
}
