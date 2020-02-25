const express = require('express')
const app = express()


module.exports = {
    app,
    get: app.get.bind(app),
    post: app.post.bind(app),
}
