const apply = {
    async check(ctx, next) {
        const {name, sex, tel, carTime, quota, houseType, term, commodityType, type} = ctx.request.body
        const nameRE = /^[\u4E00-\u9FA5]{2,4}$/
        const telRE = /^1[34578]\d{9}$/
        const quotaRE = /^[1-9][0-9]{0,3}$/
        const carTimeRE = /^[1-2][0-9]{3}-(0[1-9]|1[0-2])$/
        const houseTypeOption = ['类型1', '类型2', '类型3', '类型4', '类型5']                 //  todo 测试数据
        const commodityTypeOption = ['类型1', '类型2', '类型3', '类型4', '类型5']             //  todo 测试数据

        let status = null

        if (!nameRE.test(name)) status = 11
        else if (!telRE.test(tel)) status = 12
        else if (sex !== undefined && (sex !== 1 && sex !== 2)) status = 13
        else if (quota !== undefined && (!quotaRE.test(quota))) status = 14
        else if (type === 'che') {
            if (carTime !== undefined && (!carTimeRE.test(carTime))) status = 15
        } else if (type === 'fang') {
            if (houseType !== undefined) {
                if (typeof houseType !== 'number') status = 16
                else if (!houseTypeOption[houseType]) status = 17
            }
            if (status === null && term !== undefined && (term !== 0 && term !== 2)) status = 18
        } else if (type === 'dang') {
            if (commodityType !== undefined) {
                if (typeof commodityType !== 'number') status = 19
                else if (!commodityTypeOption[commodityType]) status = 20
            }
        } else if (type === undefined) status = 100

        if (status === null) await next()
        else ctx.body = global.$g.resSendData(status, '无效的参数')
    },
    async storage(ctx) {
        const add = () => {
            return new Promise((resolve, reject) => {
                global.$g.sql.query(`INSERT INTO applyRecord SET ?`, ctx.request.body, (error, results, fields) => {
                    if (error) resolve(global.$g.resSendData(21, error))
                    else resolve(global.$g.resSendData(0, '添加成功'))
                })
            })
        }

        const a = await add()
        ctx.body = a
    }
}

module.exports = apply
