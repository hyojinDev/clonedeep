import { expect } from "@jest/globals";
import { cloneDeep } from "../src/index.js";
import * as utils from '../src/utils/index.js'

test('하위 depth가 일반 Object 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const origin = {
    female: {
      seoul: {
        name: 'hyojin',
        age: 20,
      }
    }
  }
  const cloned = cloneDeep(origin);

  origin.female.seoul.name = 'seula';
  origin.female.seoul.age = 25;


  expect(origin.female.seoul.name).toBe('seula')
  expect(origin.female.seoul.age).toBe(25)
  expect(cloned.female.seoul.name).toBe('hyojin')
  expect(cloned.female.seoul.age).toBe(20)
})

test('하위 depth 필드가 Array 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const origin = [[
    {
      name: 'apple',
      color: 'red',
      num: 5,
    },
    {
      name: 'banana',
      color: 'yellow',
      num: 3,
    },
    {
      name: 'orange',
      color: 'orange',
      num: 1,
    }
  ]]
  const cloned = cloneDeep(origin)

  origin[0][0].name = null
  origin[0][1].num = 2
  origin[0][2] = null


  expect(origin[0][0].name).toBe(null)
  expect(origin[0][1].num).toBe(2)
  expect(origin[0][2]).toBe(null)

  expect(cloned[0][0].name).toBe('apple')
  expect(cloned[0][1].num).toBe(3)
  expect(cloned[0][2]).not.toBe(null)
})

test('ArrayBuffer 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const buffer = new ArrayBuffer(8);
  let origin = buffer
  const cloned = cloneDeep(origin)
  origin = null

  expect(origin).toBe(null)
  expect(cloned.toString()).toBe('[object ArrayBuffer]')
})

test('하위 depth 필드가 ArrayBuffer 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const buffer1 = new ArrayBuffer(8);
  const buffer2 = new ArrayBuffer(8);

  const origin = [1, 2, [buffer1, buffer2]]
  const cloned = cloneDeep(origin)
  origin[2][0] = null

  expect(origin[2][0]).toBe(null)
  expect(cloned[2][0].toString()).toBe('[object ArrayBuffer]')
})

test('하위 depth 필드가 TypedArray 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const int16 = new Int16Array(2);
  const origin = [1, 2, [int16]]
  const cloned = cloneDeep(origin)
  origin[2] = ''

  expect(origin[2]).toBe('')
  expect(typeof cloned[2]).toBe('object')
})

test('하위 depth 필드가 prototype 속성을 갖는 함수일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const origin = {
    method1: function () {
      return 'Hello'
    },
    method2: Function
  }
  const cloned = cloneDeep(origin)

  origin.method1 = function () {
    return 'World'
  }
  origin.method2 = null


  expect(origin.method1()).toBe('World')
  expect(origin.method2).toBe(null)
  expect(cloned.method1()).toBe('Hello')
  expect(cloned.method2).toBe(Function)
})

test('하위 depth 필드가 Proxy 객체 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const intro = { name: 'hyojin' }
  let proxy = new Proxy(intro, {
    get: function (target) {
      return target?.name ?? 'Name is Not Found'
    }
  })

  const origin = {
    getter: proxy
  }
  const cloned = cloneDeep(origin)
  origin['getter'] = null
  expect(origin['getter']).toBe(null)
  expect(cloned['getter']?.name).toBe('hyojin')
})

test('하위 depth 필드가 Set 또는 Map 객체 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const originSet = { method: new Set([1, 2, 3]) }
  const originMap = { method: new Map() }

  const clonedSet = cloneDeep(originSet)
  const clonedMap = cloneDeep(originMap)

  originSet['method'] = null
  originMap['method'] = null

  expect(originSet['method']).toBe(null)
  expect(originMap['method']).toBe(null)
  expect(utils.constructorName(clonedSet['method'])).toBe('Set')
  expect(utils.constructorName(clonedMap['method'])).toBe('Map')
})

test('하위 depth 필드가 RegExp 객체 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const origin = { method: new RegExp() }
  const cloned = cloneDeep(origin)
  origin['method'] = null
  expect(origin['method']).toBe(null)
  expect(utils.constructorName(cloned['method'])).toBe('RegExp')
})

test('하위 depth 필드가 Math 객체 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const origin = { method: Math }
  const cloned = cloneDeep(origin)
  origin['method'] = null
  expect(origin['method']).toBe(null)
  expect(cloned['method']).toBe(Math)
})

test('하위 depth 필드가 JSON 객체 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const origin = [1, { a: { method: JSON } }]
  const cloned = cloneDeep(origin)
  origin[1]['a'] = null
  expect(origin[1]['a']).toBe(null)
  expect(cloned[1]['a']['method']).toBe(JSON)
})
