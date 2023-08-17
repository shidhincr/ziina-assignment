export const isIntersecting = (box1: Box, box2: Box) => {
  const hasWidthArea = Math.min(box1.xx, box2.xx) > Math.max(box1.x, box2.x);
  const hasHeightArea = Math.min(box1.yy, box2.yy) > Math.max(box1.y, box2.y);
  return hasWidthArea && hasHeightArea
}

export const getIntersectingArea = (box1: Box, box2: Box) => {
  if (!isIntersecting(box1, box2)) return 0
  const width = Math.min(box1.xx, box2.xx) - Math.max(box1.x, box2.x);
  const height = Math.min(box1.yy, box2.yy) - Math.max(box1.y, box2.y);
  return width * height;
}

export const calculateArea = (base: Box, overlays: Box[]): number => {
  const baseArea = (base.xx - base.x) * (base.yy - base.y);
  const intersectingAreas = overlays.map(oBox => {
    return getIntersectingArea(base, oBox)
  })
  return baseArea - intersectingAreas.reduce((acc, cur) => acc + cur, 0)
}
