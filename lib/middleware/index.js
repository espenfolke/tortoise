const validator = require("./validator")
const wrapper = require("./wrapper")
const Promise = require("bluebird")

module.exports.prePublish = function (context) {
    return new Promise(function (resolve, reject) {
        return Promise.resolve(context)
            .then(context => validator(context))
            .then(context => wrapper(context))
            .then(context => resolve(context))
            .catch(err => reject(err))
    })
}
