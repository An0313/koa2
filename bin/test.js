const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa();
const router = new Router();
const koaBody = require('koa-body')


app.use(koaBody())
function sleep(time) {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove()
        }, time)
    })
}



router.post('/test', async (ctx, next) => {
    console.log(ctx.request.body);
    await next();
}, async (ctx) => {
    await sleep(5000)
    ctx.body = {
        status: 200,
        msg: "111111"
    }
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3002)
