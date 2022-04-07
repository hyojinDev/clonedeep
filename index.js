const cloneDeep = require('./src/main')

console.log(cloneDeep(['ㄱ', 'ㄴ', 'ㄷ', ['a', 'b', 'c']]))

module.exports = {
  cloneDeep
}