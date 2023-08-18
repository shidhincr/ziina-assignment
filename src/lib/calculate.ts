import type { Box } from "../types";

export const isIntersecting = (box1: Box, box2: Box) => {
  const hasWidthArea = Math.min(box1.xx, box2.xx) > Math.max(box1.x, box2.x);
  const hasHeightArea = Math.min(box1.yy, box2.yy) > Math.max(box1.y, box2.y);
  return hasWidthArea && hasHeightArea
}

export const getIntersectingBoxes = (box1: Box, box2: Box): null | Box => {
  if (!isIntersecting(box1, box2)) return null
  return {
    x: Math.max(box1.x, box2.x),
    y: Math.max(box1.y, box2.y),
    xx: Math.min(box1.xx, box2.xx),
    yy: Math.min(box1.yy, box2.yy),
  }
}

export const getMutualAreaBoxes = (boxes: Box[]): Box[] => {
  let currentBox: Box;
  let mutualAreaBoxes: Box[] = []
  let boxesToIterate = [...boxes]
  while (boxesToIterate.length) {
    currentBox = boxesToIterate.shift()
    boxesToIterate.forEach(box => {
      mutualAreaBoxes.push(getIntersectingBoxes(currentBox, box))
    });
  }
  return mutualAreaBoxes.filter(Boolean) as Box[];
}

export const getIntersectingArea = (box1: Box, box2: Box) => {
  if (!isIntersecting(box1, box2)) return 0
  const width = Math.min(box1.xx, box2.xx) - Math.max(box1.x, box2.x);
  const height = Math.min(box1.yy, box2.yy) - Math.max(box1.y, box2.y);
  return width * height;
}

export const calculateArea = (box: Box) => {
  return (box.xx - box.x) * (box.yy - box.y);
}

export const deduplicate = (boxes: Box[]): Box[] => {
  return boxes.filter((box, i) => {
    return boxes.findIndex(b => b.x === box.x && b.y === box.y && b.xx === box.xx && b.yy === box.yy) === i
  })
}

export const calculateVisibleArea = (base: Box, overlays: Box[]): number => {
  const baseArea = calculateArea(base)
  const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);

  const overlappingBoxes = overlays.map(oBox => {
    return getIntersectingBoxes(base, oBox)
  }).filter(Boolean) as Box[]

  const mutualAreaBoxes = getMutualAreaBoxes(overlappingBoxes);
  const mutualArea = sum(mutualAreaBoxes.map(calculateArea))
  const intersectingArea = sum(overlappingBoxes.map(calculateArea))
  const intersectingMutualAreaBoxes = deduplicate(getMutualAreaBoxes(mutualAreaBoxes));
  const intersectingMutualAreaBoxesArea = sum(intersectingMutualAreaBoxes.map(calculateArea));
  return baseArea - intersectingArea + (mutualArea - intersectingMutualAreaBoxesArea);
}
