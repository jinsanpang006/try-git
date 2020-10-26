// promise  书写异步代码的另一种方式    解决关于调函数嵌套问题    eg 依次读取 abcd四个文件

// 创建   var p = new promise((resolve,rejected)=>{   里面一般有一个异步操作    成功调用 resolve 失败调用 rejected })

// 使用  p.then(回调 resolve 改变状态为fulfilled时 调用)代表处理成功 .  上面resolve改变了状态 并且会执行成功函数 [[PromiseResult]]: 函数处理结果
// 然后在执行回调   res 把结果拿出来
//             catch(回调 reject 改变状态为rejected时调用) 代表处理失败    同理

// promise  有三个 状态  pending    fulfilled   rejected             一旦promise的状态发生变化, 状态就会被凝固
