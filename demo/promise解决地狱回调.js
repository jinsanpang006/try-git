// 引入模块
const fs = require('fs')

function read (src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)// 这里默认就读出结果来了
      }
    })
  })
}

// read('a.txt').then(res => {
//   console.log(res)
//   return read('b.txt')
// }).then(res => {
//   console.log(res)
//   return read('c.txt')
// }).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

async function fn () {
  try {
    const data1 = await read('a.txt')
    console.log(data1)
    const data2 = await read('b.txt')
    console.log(data2)
    console.log(222)
    const data3 = await read('c.txt')
    console.log(data3)
  } catch (err) {
    console.log(err)
  }
}
fn()
