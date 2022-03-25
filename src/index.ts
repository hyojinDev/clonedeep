import { StrObjType } from './interface';

// ** 객체인지 : [ 객체안에 배열, 객체, 함수, 문자숫자 등등 고려]
// ** 배열인지 : [ 배열안에 배열, 객체, 함수, 문자숫자 등등 고려]
// ** Date객체인지 : new Date 후, 새롭게 생성하여 return // instanceof 로 Date의 인스턴스인지 확인하기
// ** 재귀함수가 실행되는 조건? : object 안에 object
// ** 반복문이 실행되야하는 조건? : 객체, 배열처럼 나열된 object일 경우.
// ** 함수 / 문자 / 숫자열 / String() / Boolean / RegExp / map / set : 할당만 하면 됨. => 어차피 매번 새로운 메모리에 올라가니까 바로 리턴해도 클론딥처럼 동작한다.
// ** typed array 


function deepClone(obj: any): any {
  if (!Boolean(obj)) return 'TypeError';

  let result: StrObjType | any = obj.constructor === Object ? {} : [];
  let key: any;

  for (key in obj) {

    if ([String, Number, Function, Boolean, RegExp, Map].includes(obj[key].constructor)) {
      result[key] = obj[key];
    } else if (obj[key].constructor === Date) {
      result[key] = new Date(obj[key]);
    }
    else if (obj[key].constructor === Object) {
      result[key] = deepClone(obj[key]);
    } else if (obj[key].constructor === Array) {
      result[key] = deepClone(obj[key]);
    } else {
      result[key] = obj[key]
    }
  }

  return result;
};

const obj: any = {
  num: 1,
  object: {
    c: 2,
    arr: [1, 2, 3]
  },
  array: [1, '2', [555, 'hyojin']],
  arrowFunc: () => {
    console.log("hi, heoolp")
  },
  str: 'hyojin',
  date: new Date(2022, 1),
  constructorStr: String('new String'),
  boolean: true,
  constructorMap: new Map(),
  constructorRegExp: new RegExp(/^[0-9]+$/),
  regExp: /^[0-9]+$/,
  constructorFunc: function () {
    return `hello, ${this.str}`
  }
}

const arr = [1, 2, 'str', { a: '1', 'b': () => console.log("hi") }, ['안', '녕'], { objOuter: '객체속', inner: { innerObj: '객체' } }]


let copiedObj = deepClone(obj);
let gg = obj.constructorFunc();
// copiedObj.a = 2;
// copiedObj.f = new Date(2021, 6)
// copiedObj.h = false
// copiedObj.constructorFunc = function () {
//   return `hello ${this.regExp}`
// }
// a.constructorFunc = new Animal('dog', 'red')
// let b = new Person('hyojin', 'black')
// console.log('im a \n', a.constructor, '\n', b.constructor)
// console.log(`결과시작\n\n`, copiedObj.i.set('rr', 'hyojin'), copiedObj, copiedObj.i.get('rr'), `\n\n결과 끝\n`,)


