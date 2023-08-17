import { test, expect } from 'vitest'
import { calculateArea, isIntersecting, getIntersectingArea } from '../lib/calculate'

const baseBox = {
  x: 0, y: 0, xx: 100, yy: 100
}
const overlayBox1 = { x: 200, y: 200, xx: 250, yy: 250 }
const overlayBox2 = { x: 50, y: 40, xx: 150, yy: 150 }

test('is intersecting', () => {
  expect(isIntersecting(baseBox, overlayBox1)).toBe(false)
  expect(isIntersecting(baseBox, overlayBox2)).toBe(true)
});

test('calculate intersecting area', () => {
  const area1 = getIntersectingArea(baseBox, overlayBox1)
  const area2 = getIntersectingArea(baseBox, overlayBox2)
  expect(area1).toBe(0)
  expect(area2).toBe(3000)
})

test('calculate area', () => {
  let area = calculateArea(baseBox, [overlayBox1])
  expect(area).toBe(10000)
  area = calculateArea(baseBox, [overlayBox1, overlayBox2])
  expect(area).toBe(7000)
})
