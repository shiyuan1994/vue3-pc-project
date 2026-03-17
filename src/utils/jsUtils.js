// 浅拷贝：object.assign、...扩展运算符、slice、concat
const shallowCopy = (object) =>{
  // 只拷贝对象
  if (!object || typeof object !== "object") return
  // 判断object是数组还是对象
  let newObject = Array.isArray(object) ? [] : {}
  for(let key in object) {
    // 判断是object的属性才拷贝
    if (object.hasOwnProperty(key)) {
      newObject[key] = object[key]
    }
  }
  return newObject
}

// 深拷贝:JSON.stringify(JSON.parse())
const deepClone = (object) => {
  if (!object || type object !== "object") return
  let newObject = Array.isArray(object) ? [] : {}
  for(let key in object) {
    if (object.hasOwnProperty(key)) {
      if (typeof object[key] === 'object') {
        newObject[key] = deepClone(object[key]) // 递归遍历深层对象
      } else {
        newObject[key] = object[key]
      }
    }
  }
  return newObject
}