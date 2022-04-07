// ** Util Start **
// Type Check
const isDate = (value) => value instanceof Date ?? false;
const isObject = (value) => typeof value === "object" && !Array.isArray(value) && value !== null;
const isSet = (value) => value instanceof Set ?? false;
const isMap = (value) => value instanceof Map ?? false;
const isRegExp = (value) => value instanceof RegExp ?? false;
const isSymbol = (value) => typeof value === "symbol" ?? false;
const isTypedArray = (value) => {
  const typedArrays = [
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
  ];
  return typedArrays.some((typedArray) => typedArray === value.constructor);
};


// Copy Function
function copyDate(value) {
  return new Date(value.getTime());
}

function copyObject(value) {
  return Object.keys(value).reduce((obj, key) => {
    obj[key] = cloneDeep(value[key]);
    return obj;
  }, {});
}

function copyArray(value) {
  return value.reduce((arr, item, idx) => {
    arr[idx] = cloneDeep(item);
    return arr;
  }, []);
}

function copySet(value) {
  const result = new Set();
  // new Set의 add로 value 안에 있는 속성들까지 copy
  value.forEach((val) => {
    result.add(cloneDeep(val));
  });

  return result;
}

function copyMap(value) {
  const result = new Map();
  // new Map의 set으로 value 안에 있는 key:value 까지 copy
  value.forEach((val, key) => {
    result.set(key, cloneDeep(val));
  });
  return result;
}

function copyRegExp(value) {
  return new RegExp(value.source, value.flags);
}

function copySymbol(value) {
  const strSymbol = String(value);
  const braketIndex = strSymbol.indexOf("(");
  const strValue = strSymbol.substring(braketIndex).replace(/\(|\)/g, "");
  return parseInt(strValue) ? Symbol(+strValue) : Symbol(strValue);
}

function copyTypedArray(value) {
  // TypedArray의 constructor => Function
  // 같은 value 인자로 넘겨서 생성자로 생성 후, 리턴
  return new value.constructor(value);
}
// ** Util End **


function cloneDeep(value) {
  for (const { copy, validation } of copyValidations) {
    // 깊은 복사가 필요한 객체라면 copy 실행
    if (validation(value)) {
      return copy(value);
    }
  }
  // 깊은 복사가 필요없을 경우는 단순 리턴
  return value;
}

const copyValidations = [
  { validation: isDate, copy: copyDate },
  { validation: isSet, copy: copySet },
  { validation: isMap, copy: copyMap },
  { validation: Array.isArray, copy: copyArray },
  { validation: isSymbol, copy: copySymbol },
  { validation: isTypedArray, copy: copyTypedArray },
  { validation: isObject, copy: copyObject },
  { validation: isRegExp, copy: copyRegExp },
];

module.exports = cloneDeep