import { test, expect } from 'vitest'
import { calculateArea, calculateVisibleArea, isIntersecting, getIntersectingArea, getIntersection, getMutuallyIntersectingBoxes } from '../lib/calculate'

const baseBox = {
  x: 0, y: 0, xx: 100, yy: 100
} // red box
const overlayBox1 = { x: 200, y: 200, xx: 250, yy: 250 } //not overlapping
const overlayBox2 = { x: 50, y: 40, xx: 150, yy: 150 } // overlapping
const overlayBox3 = { x: 50, y: 50, xx: 80, yy: 80 } // fully inner


/* const dummyIntersectingBoxes = [
  {
    x: 0, y: 0, xx: 100, yy: 100
  },
  {
    x: 50, y: 50, xx: 150, yy: 150
  },
]
const dummyIntersectingBoxes1 = [
  {
    x: 0, y: 0, xx: 100, yy: 100
  },
  {
    x: 10, y: 60, xx: 60, yy: 90
  },
  {
    x: 80, y: 10, xx: 100, yy: 80
  },
  {
    x: 50, y: 50, xx: 150, yy: 150
  },
] */

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

test('calculate the visible area', () => {
  // let area = calculateVisibleArea(baseBox, [overlayBox1])
  // expect(area).toBe(10000)
  let area = calculateVisibleArea(baseBox, [overlayBox1, overlayBox2])
  expect(area).toBe(7000)
})

// test('get mutual area boxes', () => {
//   expect(getMutuallyIntersectingBoxes(dummyIntersectingBoxes)).toEqual([{
//     x: 50, y: 50, xx: 100, yy: 100
//   }])
// });
//
// test('calculate intersecting area', () => {
//   const area1 = getIntersectingArea(baseBox, overlayBox1)
//   const area2 = getIntersectingArea(baseBox, overlayBox2)
//   expect(area1).toBe(0)
//   expect(area2).toBe(3000)
// })
//
// test('calculate visible area', () => {
//   expect(calculateArea(baseBox)).toBe(10000)
//   expect(calculateArea(overlayBox2)).toBe(11000)
// });
//
// test('calculate visible area', () => {
//   let area = calculateVisibleArea(baseBox, [overlayBox1])
//   expect(area).toBe(10000)
//   area = calculateVisibleArea(baseBox, [overlayBox1, overlayBox2])
//   expect(area).toBe(7000)
// })
