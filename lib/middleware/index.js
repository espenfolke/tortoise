const validator = require("./validator")
const wrapper = require("./wrapper")
const Promise = require("bluebird")

module.exports.prePublish = function (context, promiseArray = [validator, wrapper]) {
    return new Promise(function (resolve, reject) {
        promiseArray
            .reduce((p,f) => p.then(f), Promise.resolve(context))
            .then(context => resolve(context))
            .catch(err => reject(err))
    })
}
