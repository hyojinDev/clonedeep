import * as utils from './utils/index.js'

// ** 객체인지 : [ 객체안에 배열, 객체, 함수, 문자숫자 등등 고려]
// ** 배열인지 : [ 배열안에 배열, 객체, 함수, 문자숫자 등등 고려]
// ** Date객체인지
// ** 함수 / 문자 / 숫자열 / String() / Boolean / RegExp / map / set / Date / typed array / .....etc..

function _private(obj) {
  // 원시타입이거나 프록시타입이거나 더이상 child값이 없다면 obj를 반환 (더 clone할 필요가 없기 때문)
  if (utils.isPrimitive(obj) || utils.isProxy(obj) || !utils.childCheck(obj)) {
    return obj
  }

  // clone할 객체 생성 (obj가 배열인지 아닌지에 따라 배열 또는 객체 생성)
  const newObj = utils.isArray(obj) ? [] : {}

  // obj가 배열이라면
  if (utils.isArray(obj)) {
    // obj의 length가 0이 아니라면 (빈 값이 아니어야 함) 새 객체에 obj를 반복하며 push 
    // 이 때, 배열안에 들어있는 값의 타입들은 숫자, 문자, 등등 다양한 타입일 수 있으므로 아래의 for문으로 넘어갈 수도있다.
    // for..in 문을 통해 어떠한 객체를 반복하더라도 새로운 객체로 복사되어 새로운 객체에 할당된 상태로 반환될 것이다.
    Boolean(obj.length) && obj.forEach(element => {
      newObj.push(cloneDeep(element))
    })

    return newObj
  }

  // 반복 가능한 obj가 들어온다면 newObj[key]에 해당 값 할당하기
  for (const key in obj) {
    newObj[key] = _private(obj[key])
  }
  return newObj
}


function cloneDeep(value) {
  return _private(value)
}

export { cloneDeep }