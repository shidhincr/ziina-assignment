import type { Box } from "../types";

export const isIntersecting = (box1: Box, box2: Box) => {
  const hasWidth = Math.min(box1.xx, box2.xx) > Math.max(box1.x, box2.x);
  const hasHeight = Math.min(box1.yy, box2.yy) > Math.max(box1.y, box2.y);
  return hasWidth && hasHeight
}

export const getIntersection = (box1: Box, box2: Box): null | Box => {
  if (!isIntersecting(box1, box2)) return null
  return {
    x: Math.max(box1.x, box2.x),
    y: Math.max(box1.y, box2.y),
    xx: Math.min(box1.xx, box2.xx),
    yy: Math.min(box1.yy, box2.yy),
  }
}

export const calculateArea = (box: Box) => {
  return (box.xx - box.x) * (box.yy - box.y);
}

export const calculateVisibleArea = (base: Box, overlays: Box[]): number => {
  const intersectingBoxes = overlays.map(oBox => getIntersection(base, oBox)).filter(Boolean) as Box[]
  let baseArea = calculateArea(base)
  let overlayArea = 0;
  let overlayMap = {}

  for (let b of intersectingBoxes) {
    let { x, y, xx, yy } = b
    for (let i = x; i < xx; i++) {
      for (let j = y; j < yy; j++) {
        if (!overlayMap[`${i},${j}`]) {
          overlayArea++;
        }
        overlayMap[`${i},${j}`] = true
      }
    }
  }
  return baseArea - overlayArea;
}
