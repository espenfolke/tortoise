const validator = require("./validator")
const wrapper = require("./wrapper")
const Promise = require("bluebird")

module.exports.prePublish = function (context) {
    return new Promise(function (resolve, reject) {
        return validator(context)
            .then((context) => { return wrapper(context) })
            .then(context => resolve(context))
            .catch(err => reject(err))
    })
}