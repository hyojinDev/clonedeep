const typedArrayList = [
  'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array'
];

function constructorName(obj) {
  return obj?.constructor?.name
}

function isFunction(obj) {
  return (constructorName(obj) === 'Function')
}

function isObject(obj) {
  return (constructorName(obj) === 'Object')
}

function isArray(obj) {
  return (constructorName(obj) === 'Array')
}

function isArrayBuffer(obj) {
  return (constructorName(obj) === 'ArrayBuffer')
}

function isTypedArray(obj) {
  console.log('1312312', typedArrayList.includes(constructorName(obj)))
  return typedArrayList.includes(constructorName(obj))
}

function isProxy(obj) {
  return obj?.target !== undefined
}

function isNullORUndefined(value) {
  return value === null || value === undefined
}

function isPrimitive(value) {
  // 원시타입 구분
  return isNullORUndefined(value) || ['number', 'bigint', 'string', 'boolean', 'symbol'].includes(typeof value)
}


export { constructorName, isFunction, isObject, isArray, isArrayBuffer, isTypedArray, isProxy, isNullORUndefined, isPrimitive }