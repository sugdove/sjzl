const promise1 = new Promise((resolve,reject)=>{
    console.log('resolve')
    resolve('执行resolve')
    reject('执行reject')
})