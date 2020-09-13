const fs = require("fs");
const jsonfile = require("jsonfile");
const path = require("path");

class Workspace {
    /**
     * 读取某个文件的json数据内容并返回,文件不存在就返回空对象
     * @param {*} file 
     */
    static readJSON(file) {
        // 路径是否存在，存在返回true，否则返回false
        if (fs.existsSync(file)) {
            return jsonfile.readFileSync(file);
        }
        console.log(`${file}文件不存在`);
        return null
    }
    /**
     * 写入并创建文件
     * @param {*} file 
     * @param {*} json 
     */
    static writeJSON(file, json) {
        jsonfile.writeFileSync(file, json, { spaces: 2, EOL: "\r\n" });
    }
    /**
     * 有就更新无则创建
     * @param {*} file 
     * @param {*} json 
     */
    static updateJSON(file, json) {
        if (fs.existsSync(file)) {
            return jsonfile.writeFileSync(file, Object.assign({}, jsonfile.readFileSync(file), json), { spaces: 2, EOL: "\r\n" });
        } else {
            Workspace.writeJSON(file, json)
        }
    }
    static readJSONList(folder, filterRule = (file) => /\.json$/.test(file), callback = (folder, f) => (Workspace.readJSON(path.join(folder, f)))) {
        if (fs.existsSync(folder)) {
            const files = fs.readdirSync(folder);
            const targets = files.filter(filterRule);
            return targets.map((f) => callback(folder, f));

        } else {
            throw new Error(`${folder} not exists`);
        }
    }
    constructor (workspace) {
        this.workspace = this.ensureFolder(workspace);
        this.apiFolder = this.ensureFolder(path.join(workspace, "api"));
        this.pageFolder = this.ensureFolder(path.join(workspace, "page"));
        this.testSuiteFolder = this.ensureFolder(path.join(workspace, "testscene"));
        this.apiDataRuleFolder = this.ensureFolder(path.join(workspace, "datarule"));
    }
    /**
    * 确保给定的文件夹存在，如果不存在，就创建
    * @param folder
    */
    ensureFolder(folder) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            console.info(`目录${folder}不存在，已自动创建`);
        }
        return folder;
    }
}
module.exports = Workspace;