const router = require('koa-router')()

const apply = require('./index/apply')

router.all('*', async (ctx, next) => {
    if (ctx.is('json')) await next()
    else ctx.throw(415, '请求格式错误!');
})

router.post('/apply', apply.check, apply.storage)


// function sleep(time) {
//     return new Promise((reslove) => {
//         setTimeout(() => {
//             reslove()
//         }, time)
//     })
// }
//
// router.post('/test', async (ctx, next) => {
//     console.log(ctx.request.body);
//     await next();
// }, async (ctx) => {
//     await sleep(5000)
//     ctx.body = {
//         status: 200,
//         msg: "111111"
//     }
// })

module.exports = router
