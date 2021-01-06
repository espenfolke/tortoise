var Promise = require('bluebird');

var wrap = function(msg) {
  const wrapped = {
    type: typeof msg,
    datetime: Date.now(),
    data: msg
  }
  
  return wrapped
}

var validateWrapAndParsePublish = function(msg) {
  // Validate msg
  var type = typeof msg;
  if((msg === null || msg === undefined) || (type !== 'number' && type !== 'string' && type !== 'object')) {
    return Promise.reject('payload property type must be one of: number, string, object');
  }

  const wrapped = wrap(msg)
  msg = JSON.stringify(wrapped);

  return Promise.resolve(msg);
}

var validateAndParsePublish = function(msg) {
  // Validate msg
  var type = typeof msg;
  if((msg === null || msg === undefined) || (type !== 'number' && type !== 'string' && type !== 'object')) {
    return Promise.reject('payload property type must be one of: number, string, object');
  }

  // Parse to string if object
  if(type === 'object') {
    msg = JSON.stringify(msg);
  }

  return Promise.resolve(msg);
}

module.exports = {
  validateAndParsePublish: validateAndParsePublish,
  validateWrapAndParsePublish: validateWrapAndParsePublish
}