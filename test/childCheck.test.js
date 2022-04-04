import { expect } from '@jest/globals'
import * as utils from '../src/utils/index.js'

test('childCheck 함수는 파라미터로 받은 객체가 하위객체를 가지고 있는지 확인할 수 있습니다', () => {
  const obj1 = {}
  const obj2 = { a: '1' }
  const arr1 = []
  const arr2 = [1, 2, 3]
  const str = ''
  const dateObj = new Date()
  const setObj = new Set()
  const mapObj = new Map()
  const regExp = new RegExp()

  expect(utils.childCheck(obj1)).toBe(false)
  expect(utils.childCheck(arr1)).toBe(false)
  expect(utils.childCheck(obj2)).toBe(true)
  expect(utils.childCheck(arr2)).toBe(true)
  expect(utils.childCheck(str)).toBe(false)
  expect(utils.childCheck(dateObj)).toBe(false)
  expect(utils.childCheck(setObj)).toBe(false)
  expect(utils.childCheck(mapObj)).toBe(false)
  expect(utils.childCheck(regExp)).toBe(false)

})