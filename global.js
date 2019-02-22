const http = require('http')
const https = require('https')
const qs = require('querystring')
const mysql = require('mysql')
const mysqlConfig = require('./config/mysql')

const connection = mysql.createConnection(mysqlConfig)
connection.connect((err) => {
    if (err) {
        console.log('sql connect')
        console.log(err)
    }
});

module.exports = {
    http: (options = {}, data = {}, callback) => {
        if (options.method === 'GET') {
            options.path += `?${qs.stringify(data)}`
        }

        const req = https.request(options, (res) => {
            res.setEncoding('utf8');

            let str = ''

            res.on('data', data => {
                str += data
            });

            res.on('end', () => {
                callback(JSON.parse(str))
            })
        })

        req.on('error', e => {
            // todo 日志
            console.log(e.message)
            callback({status: 10000, message: '请求遇到问题'});
        })

        if (options.method === 'POST') req.write(data);
        req.end()
    },

    resSendData(status, msg) {
        return {
            status, msg
        }
    },

    sql: connection,
    connecQueryAdd: function (sql, value) {
        return new Promise((resolve, reject) => {
            connection.query(sql, value, (err, result) => {
                if (err) {
                    throw err;
                    reject('添加失败');
                }
                resolve(result);
            });
        })
    }

}
