const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(proxy(['/ditection','/images'], { target: 'http://localhost:5000' }))
}