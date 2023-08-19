import type { Box } from '../types'

export const toBox = (rect: DOMRect): Box => {
  return {
    x: Math.floor(rect.x),
    y: Math.floor(rect.y),
    xx: Math.floor(rect.right),
    yy: Math.floor(rect.bottom)
  }
}
