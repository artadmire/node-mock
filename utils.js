"use strict";
const child_process_1 = require("child_process");
const fs = require("fs");
const ip = require("ip");
const jsonfile = require("jsonfile");
/**
 * 读取json文件并传回内容
 * @param file 文件地址
 */
function readJSON(file) {
    if (fs.existsSync(file)) {
        return jsonfile.readFileSync(file);
    }
    console.error(`${file}不存在`);
    return {};
}
exports.readJSON = readJSON;
/**
 * 写入 JSON 配置文件
 * @param file 目标文件地址
 * @param obj 目标内容
 */
function writeJSON(file, json) {
    jsonfile.writeFileSync(file, json, { spaces: 2, EOL: "\r\n" });
}
exports.writeJSON = writeJSON;
/**
 * 更新 JSON 文件
 * @param file 目标文件地址
 * @param obj 新增内容
 */
function updateJSON(file, json) {
    if (fs.existsSync(file)) {
        jsonfile.writeFileSync(file, Object.assign({}, jsonfile.readFileSync(file), json), { spaces: 2, EOL: "\r\n" });
    }
    else {
        jsonfile.writeFileSync(file, json, { spaces: 2, EOL: "\r\n" });
    }
}
exports.updateJSON = updateJSON;
/**
 * 获取本机ip
 */
exports.localIp = ip.address();
/**
 * 确保给定的文件夹存在，如果不存在，就创建
 * @param folder 文件夹路径
 */
exports.ensureFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.info(`目录${folder}不存在，已自动创建`);
    }
    return folder;
};
/**
 * 同步执行某个命令，并将执行结果以字符串形式返回
 * @param cmd 要执行的命令
 * @param cwd 指定工作目录，默认为当前工作目录
 * @param env 设定环境变量
 */
exports.excCommand = (cmd, cwd = process.cwd(), env = {}) => {
    const result = child_process_1.execSync(cmd, {
        cwd,
        env: Object.assign({}, process.env, env),
    });
    return result.toString();
};
/**
 * 循环检查一个目录下面所有的文件是不是目录
 * @param file 要检查的目录或者文件名
 */
exports.getApiData = () => {
    const apiList = []
    return function isDir(file) {
        const res = fs.readdirSync(file);
        console.log(res)
        res.forEach(name => {
            const isFile = fs.statSync(`${file}/${name}`).isFile()
            if (isFile) apiList.push(readJSON(`${file}/${name}`));
            else isDir(`${file}/${name}`)
                
        })
        return apiList;
    }
}

