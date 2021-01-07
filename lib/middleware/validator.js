const debug = require("debug")("tortoise")

module.exports = function(ctx, next) {
    debug("validator", ctx.msg)
    const msg = ctx.msg

    // Validate msg
    const type = typeof msg;
    if((msg === null || msg === undefined) || (type !== 'number' && type !== 'string' && type !== 'object')) {
      throw new Error('payload property type must be one of: number, string, object')
    } else {
      next()
    }  
}