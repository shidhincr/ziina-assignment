import { test, expect } from 'vitest'
import { calculateVisibleArea, isIntersecting, getIntersection } from '../lib/calculate'

const baseBox = {
  x: 0, y: 0, xx: 100, yy: 100
} // red box
const overlayBox1 = { x: 200, y: 200, xx: 250, yy: 250 } //not overlapping
const overlayBox2 = { x: 50, y: 40, xx: 150, yy: 150 } // overlapping
const overlayBox3 = { x: 50, y: 50, xx: 80, yy: 80 } // fully inner


const baseBox1 = {
  x: 451, xx: 951, y: 226.2265625, yy: 726.2265625
}
const overlayBox4 = { x: 575, xx: 675, y: 376, yy: 476 }
const intersectingBoxes = [
  {
    "x": 607,
    "y": 351,
    "xx": 807,
    "yy": 551
  },
  {
    "x": 657,
    "y": 401,
    "xx": 757,
    "yy": 501
  }
]

test('is intersecting', () => {
  expect(isIntersecting(baseBox, overlayBox1)).toBe(false)
  expect(isIntersecting(baseBox, overlayBox2)).toBe(true)
});

test('get intersecting boxes', () => {
  expect(getIntersection(baseBox, overlayBox1)).toBe(null)
  expect(getIntersection(baseBox, overlayBox2)).toEqual({
    x: 50, y: 40, xx: 100, yy: 100
  });
  expect(getIntersection(baseBox, overlayBox3)).toEqual({
    x: 50, y: 50, xx: 80, yy: 80
  });
});

test('calculate visible area for small rectangle', () => {
  // const base = { x: 0, y: 0, xx: 10, yy: 10 }
  // const overlay = { x: 5, y: 5, xx: 15, yy: 15 }
  const base = { x: 0, y: 0, xx: 5, yy: 5 }
  const overlay = { x: 3, y: 3, xx: 6, yy: 6 }
  let area = calculateVisibleArea(base, [overlay])
  expect(area).toBe(21)
})

test('calculate the visible area', () => {
  let area = calculateVisibleArea(baseBox, [overlayBox1])
  expect(area).toBe(10000)
  area = calculateVisibleArea(baseBox, [overlayBox1, overlayBox2])
  expect(area).toBe(7000)
  area = calculateVisibleArea(baseBox1, [overlayBox4])
  expect(area).toBe(240000)
  area = calculateVisibleArea(baseBox1, intersectingBoxes)
  expect(area).toBe(210000)
})

