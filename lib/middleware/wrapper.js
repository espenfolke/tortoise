const debug = require("debug")("tortoise")

module.exports = function (ctx, next) {
    const wrapped = {
        type: typeof ctx.msg,
        datetime: Date.now(),
        data: ctx.msg
    }

    ctx.msg = JSON.stringify(wrapped)
    debug("wrapper", ctx.msg)

    next()
}