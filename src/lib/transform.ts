import type { Box } from '../types'

export const toBox = (rect: DOMRect): Box => {
  return { x: rect.x, y: rect.y, xx: rect.right, yy: rect.bottom }
}
