
// var fs = require('fs')
// // 检测是不是目录
// fs.stat('./index.js', (err, data)=> {
//     if(err) {
//         console.log(err)
//         return;
//     }
//     console.log('是文件：', data.isFile())
//     console.log('是目录：', data.isDirectory())
    
// })
// fs.mkdir('./css', (error)=> {
//     // 目录存在，就会报错，目录不存在，会直接创建
//     if(error) {
//         console.log('创建失败');
//         return;
//     }
//     console.log('创建成功')
// })

// fs.writeFile('./index.html', '你好麦乐', (err) => {
//     if(err) {
//         console.log('创建写入文件失败', err);
//         return;
//     }
//     console.log('创建写入文件成功')
// })
const { ensureFolder } = require('./utils')
const jsonfile = require("jsonfile");

console.log(ensureFolder('page'))
jsonfile.writeFileSync('./api', {a: 88})
jsonfile.writeFileSync('./api.json', {a: 89, b:590}, {flag: 'a'}, { spaces: 2, EOL: '\r\n' })
