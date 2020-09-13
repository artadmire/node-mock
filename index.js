const Koa = require('koa');
const Route = require('koa-router');
// const session = require('koa-session');
// const static = require('koa-static');
const body = require('koa-parser')
const cors = require("koa2-cors");//导入跨域模块
const fs = require('fs')
var uuid = require('node-uuid');
const Workspace = require('./work.utils')

const allowOrigins = [
    "http://0.0.0.0:8080",
];
new Workspace('./')
let app = new Koa();
// 处理post
app.use(body());
app.use(cors({
    origin: function(ctx) {
        if (allowOrigins.includes(ctx.header.origin)) {
            return ctx.header.origin;
        }
        return ctx.header.origin;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    withCredentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
let router = new Route()

router.get('/apis', async ctx => {
    const apiList = Workspace.readJSONList('./api');
    ctx.body = { code: 200, success: true, data: apiList }
})
router.post('/apis', async ctx => {
    const data = ctx.request.body;
    let { id } = data;
    if (!id) id = uuid.v1();
    Workspace.writeJSON(`./api/${id}.json`, { ...data, id, key: id })
    ctx.body = { code: 200 }
})
router.post('/rules', async ctx => {
    const data = ctx.request.body;
    let { id, fun } = data;
    if (!id) {
        id = uuid.v1();
    }
    // eval(`var datas = (${fun})()`);
    Workspace.writeJSON(`./datarule/${id}.json`, { ...data, id, key: id })
    ctx.body = { code: 200, success: true }
})
router.get('/rules', async ctx => {
    const ruleList = Workspace.readJSONList('./datarule');
    ctx.body = { code: 200, success: true, data: ruleList }

})
router.get('/scenes', async ctx => {
    const id = ctx.request.body;
    if (id) {
        let data = Workspace.readJSON(`./testscene/${id}.json`)
        data = data ? [data] : [];
        ctx.body = { code: 200, success: true, data }
    } else {
        const sceneList = Workspace.readJSONList('./testscene');
        ctx.body = { code: 200, success: true, data: sceneList }
    }

})
router.post('/scenes', async ctx => {
    const data = ctx.request.body;
    let { id = '' } = data;
    if (!id) id = uuid.v1();
    Workspace.updateJSON(`./testscene/${id}.json`, { ...data, id, key: id })
    ctx.body = { code: 200, success: true, data: { id } }

})
router.get('/pages', async ctx => {

    ctx.body = { code: 200 }
})
router.post('/pages', async ctx => {

    ctx.body = { code: 200 }
})

router.get('/*', async ctx => {
    ctx.throw(400)
})
app.use(router.routes());
app.use(router.allowedMethods());
// app.use(static(__dirname + './static'))
app.listen(1213)
console.log('Server running at http://0.0.0.0:1213/');





