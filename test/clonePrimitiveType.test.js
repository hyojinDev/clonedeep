import { cloneDeep } from "../src/index.js";

/*
  JS에서의 복사는 값 자체를 바로 연결하는 것이 아닌 메모리 주소를 복사하여 이 메모리 주소값을 연결함으로써 이루어진다.

  모든 데이터 영역의 메모리는 모두 불변값이고, 모든 데이터 타입은 참조형이기는 하지만 원시타입이거나 depth가 1depth인 객체인 경우에는 원본과 사본이 공유하는 주소가 하나라서 
  객체의 값을 변경하게 되면 주소값 또한 새로운 메모리의 값을 가리키게 되기 때문에 이전 공유관계가 끊어지는 것이다. 이렇게 주소복사 과정이 한번만 이루어지는 것이고,

  객체의 데이터 영역의 주소 자체를 변경하고자 한다면 새로운 주소에 값을 만든 후, 다시 연결함으로써 다시 값을 할당할 수 있고, 내부 프로퍼티를 변경하는 경우에는 객체의 데이터 영역은 변경되지 않고
  객체의 변수 영역이 변경되는 것이다.
  즉, 새로운 객체가 만들어지는 것이 아니라 기존의 객체 내부의 값만 변경된 것이다. 그러므로 여전히 처음 객체의 데이터영역의 주소는 변경되지 않고 있기 때문에 깊은 복사가 이루어지지 않는다.
*/

test('숫자를 깊은복사한 후 원본을 바꾸어도 사본은 변하지 않습니다', () => {
  let origin = 1
  const cloned = cloneDeep(origin)
  origin = 2
  expect(origin).toBe(2)
  expect(cloned).toBe(1)
})

test('BigInt를 깊은복사한 후 원본을 바꾸어도 사본은 변하지 않습니다', () => {
  let origin = BigInt(1)
  const cloned = cloneDeep(origin)
  origin = BigInt(2)
  expect(origin).toBe(BigInt(2))
  expect(cloned).toBe(BigInt(1))
})

test('문자열을 깊은복사한 후 원본을 바꾸어도 사본은 변하지 않습니다', () => {
  let origin = 'Hello'
  const cloned = cloneDeep(origin)
  origin = 'World'
  expect(origin).toBe('World')
  expect(cloned).toBe('Hello')
})

test('불린값을 깊은복사한 후 원본을 바꾸어도 사본은 변하지 않습니다', () => {
  let origin = false
  const cloned = cloneDeep(origin)
  origin = true
  expect(origin).toBe(true)
  expect(cloned).toBe(false)
})

test('Symbol값을 깊은복사한 후 원본을 바꾸어도 사본은 변하지 않습니다', () => {
  let origin = Symbol(1)
  const cloned = cloneDeep(origin)
  origin = Symbol(2)
  expect(origin.toString()).toBe('Symbol(2)')
  expect(cloned.toString()).toBe('Symbol(1)')
})