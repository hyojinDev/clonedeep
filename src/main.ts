interface Obj {
  [key: string]: any;
}

type TypedArray =
  Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;

type Value = Date &
  Set<any> &
  Map<string, any> &
  Array<any> &
  symbol &
  GenericTypedArray<TypedArray> &
  Obj &
  RegExp;

// Typed Array의 __proto__ : constructor와 buffer가 존재함
interface GenericTypedArrayConstructor<T> {
  new(): T;
  new(buffer: GenericTypedArray<TypedArray>): T;
}

interface GenericTypedArray<T> {
  constructor: GenericTypedArrayConstructor<T>;
}

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

// Type Check
const isDate = (value: any): value is Date => value instanceof Date ?? false;
const isObject = (value: any) => typeof value === "object" && !Array.isArray(value) && value !== null;
const isSet = (value: any): value is Set<any> => value instanceof Set ?? false;
const isMap = (value: any): value is Map<any, any> => value instanceof Map ?? false;
const isRegExp = (value: any): value is RegExp => value instanceof RegExp ?? false;
const isSymbol = (value: any): value is symbol => typeof value === "symbol" ?? false;
const isTypedArray = (value: any): value is TypedArray => typedArrays.some((typedArray) => typedArray === value.constructor);

// Copy Function
function copyDate(value: Date): Date {
  return new Date(value.getTime());
}

function copyObject(value: Obj): Obj {
  return Object.keys(value).reduce<Record<string, any>>((obj, key) => {
    obj[key] = cloneDeep(value[key]);
    return obj;
  }, {});
}

function copyArray(value: Array<any>) {
  return value.reduce((arr, item, idx) => {
    arr[idx] = cloneDeep(item);
    return arr;
  }, []);
}

function copySet<T>(value: Set<T>) {
  const result = new Set();
  // new Set의 add로 value 안에 있는 속성들까지 copy
  value.forEach((val) => {
    result.add(cloneDeep(val));
  });

  return result;
}

function copyMap(value: Map<string, any>) {
  const result = new Map();
  // new Map의 set으로 value 안에 있는 key:value 까지 copy
  value.forEach((val, key) => {
    result.set(key, cloneDeep(val));
  });
  return result;
}

function copyRegExp(value: RegExp) {
  return new RegExp(value.source, value.flags);
}

function copySymbol(value: symbol) {
  const strSymbol = String(value);
  const braketIndex = strSymbol.indexOf("(");
  const strValue = strSymbol.substring(braketIndex).replace(/\(|\)/g, "");
  return parseInt(strValue) ? Symbol(+strValue) : Symbol(strValue);
}

function copyTypedArray(value: GenericTypedArray<TypedArray>) {
  // TypedArray의 constructor => Function
  // 같은 value 인자로 넘겨서 생성자로 생성 후, 리턴
  return new value.constructor(value);
}


function cloneDeep<T>(value: T): T;
function cloneDeep(value: Value) {
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

export default cloneDeep;