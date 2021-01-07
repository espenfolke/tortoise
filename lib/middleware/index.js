const validator = require("./validator")
const wrapper = require("./wrapper")
const Promise = require("bluebird")

const last = a => a[a.length - 1]
const reduce = a => a.slice(0, -1)

class Middleware {
  use (method) {
    this.execute = ((stack) => (...args) => stack(...reduce(args), () => {
      const next = last(args)
      method.apply(this, [...reduce(args), next.bind.apply(next, [null, ...reduce(args)])])
    }))(this.execute)
  }

  execute (...args) {
    return new Promise(function (resolve, reject) {
        try {
            last(args).apply(this, reduce(args))
            resolve()
        } catch (err) {
            reject(err)
        }
    })
  }
}

const pipeline = new Middleware();
pipeline.use(validator)
pipeline.use(wrapper)

module.exports = pipeline

// pipeline.execute(msg)