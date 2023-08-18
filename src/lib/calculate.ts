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

export const getMutuallyIntersectingBoxes = (boxes: Box[]): Box[] => {
  let currentBox: Box;
  let intersectingBoxes: Box[] = []
  let boxesToIterate = [...boxes]
  while (boxesToIterate.length) {
    currentBox = boxesToIterate.shift()
    boxesToIterate.forEach(box => {
      intersectingBoxes.push(getIntersection(currentBox, box))
    });
  }
  return intersectingBoxes.filter(Boolean) as Box[];
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
  const intersectingBoxes = overlays.map(oBox => getIntersection(base, oBox)).filter(Boolean) as Box[]
  console.log({ intersectingBoxes })
  let area = calculateArea(base);
  console.log({ base, area })
  for (let i = base.x; i <= base.xx; i++) {
    for (let j = base.y; j <= base.yy; j++) {
      for (let b of intersectingBoxes) {
        // console.log({ i, j, b })
        if (i >= b.x && i <= b.xx && j >= b.y && j <= b.yy) area--;
      }
    }
  }
  console.log({ areaCalculated: area })
  return area;
}
// ----------------------
export const __calculateVisibleArea = (base: Box, overlays: Box[]): number => {
  const baseArea = calculateArea(base)
  const sum = (arr: number[]) => arr.reduce((acc, cur) => acc + cur, 0);

  const overlappingBoxes = overlays.map(oBox => {
    return getIntersection(base, oBox)
  }).filter(Boolean) as Box[]

  const totalOverlappingArea = sum(overlappingBoxes.map(calculateArea))
  const intersectingBoxes = getMutuallyIntersectingBoxes(overlappingBoxes);
  const intersectingBoxesArea = sum(intersectingBoxes.map(calculateArea))

  console.log({ intersectingBoxes })

  const intersectingMutualAreaBoxes = deduplicate(getMutuallyIntersectingBoxes(intersectingBoxes));
  const intersectingMutualAreaBoxesArea = sum(intersectingMutualAreaBoxes.map(calculateArea));
  return baseArea - totalOverlappingArea + (intersectingBoxesArea - intersectingMutualAreaBoxesArea);
}
