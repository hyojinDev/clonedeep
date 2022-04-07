import { expect, test } from '@jest/globals'
import * as C from '../src/main';
import cloneDeep from '../src/main';

const dateVal = new Date(2020, 10);
let objVal = {
  a: 1,
  b: 2,
  depthOne: {
    depthTwo: {
      c: 3,
      d: 4,
    },
    e: 5
  }
};
let arrVal = [
  1,
  2,
  3,
  [
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
  ]
]
const setVal = new Set();
const mapVal = new Map();
const regVal = new RegExp('ab+c');
const symbolVal = Symbol('symbol');
const typedArrVal = new Int8Array(8);

test('Type Check Function Test', () => {
  expect(C.isDate(dateVal)).toBe(true);
  expect(C.isObject(objVal)).toBe(true);
  expect(C.isSet(setVal)).toBe(true);
  expect(C.isMap(mapVal)).toBe(true);
  expect(C.isRegExp(regVal)).toBe(true);
  expect(C.isSymbol(symbolVal)).toBe(true);
  expect(C.isTypedArray(typedArrVal)).toBe(true);
});

test('하위 depth가 일반 Object 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {

  const newObjVal = cloneDeep(objVal);

  objVal.depthOne.depthTwo.c = 30;
  objVal.depthOne.depthTwo.d = 40;


  expect(objVal.depthOne.depthTwo.c).toBe(30)
  expect(objVal.depthOne.depthTwo.d).toBe(40)
  expect(newObjVal.depthOne.depthTwo.c).toBe(3)
  expect(newObjVal.depthOne.depthTwo.d).toBe(4)
});

test('하위 depth 필드가 Array 일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {

  const newArrVal = cloneDeep(arrVal)
  arrVal[3][0].name = 'pear'
  arrVal[3][1].num = 2
  arrVal[3][2] = null

  expect(arrVal[3][0].name).toBe('pear')
  expect(arrVal[3][1].num).toBe(2)
  expect(arrVal[3][2]).toBe(null)

  expect(newArrVal[3][0].name).toBe('apple')
  expect(newArrVal[3][1].num).toBe(3)
  expect(newArrVal[3][2]).not.toBe(null)
})

test('하위 depth 필드가 prototype 속성을 갖는 함수일 때, 객체를 깊은복사한 후 원본의 하위 depth 필드 값을 바꿔도 사본에 영향을 주지 않습니다', () => {
  const oldObj = {
    method1: function () {
      return 'Hello'
    },
    method2: Function
  }

  const newObj = cloneDeep(oldObj)

  oldObj.method1 = function () {
    return 'World'
  }
  oldObj.method2 = null


  expect(oldObj.method1()).toBe('World')
  expect(oldObj.method2).toBe(null)
  expect(newObj.method1()).toBe('Hello')
  expect(newObj.method2).toBe(Function)
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
  expect(clonedSet['method'].constructor.name === 'Set').toBe(true)
  expect(clonedMap['method'].constructor.name === 'Map').toBe(true)
})