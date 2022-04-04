import { expect, test } from '@jest/globals'
import * as utils from '../src/utils/index.js'

test('console.log의 constructor.name은 Function 입니다', () => {
  const testVal = console.log
  expect(utils.isFunction(testVal)).toBe(true)
})

test('"hello"의 constructor.name은 Function 입니다', () => {
  const testVal = "hello"
  expect(utils.isFunction(testVal)).toBe(false)
})

test('{a:1}의 constructor.name은 Object 입니다', () => {
  const testVal = { a: 1 }
  expect(utils.isObject(testVal)).toBe(true)
})

test('[1,2,3]의 constructor.name은 Array 입니다', () => {
  const testVal = [1, 2, 3]
  expect(utils.isArray(testVal)).toBe(true)
})

test('new ArrayBuffer(3)의 constructor.name은 ArrayBuffer 입니다', () => {
  const testVal = new ArrayBuffer(3)
  expect(utils.isArrayBuffer(testVal)).toBe(true)
})

test('new Int8Array()의 constructor.name은 Int8Array 입니다', () => {
  const testVal = new Int8Array();
  expect(utils.isTypedArray(testVal)).toBe(true)
})
