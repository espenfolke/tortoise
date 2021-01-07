const Bluebird = require('bluebird');
const debug = require('debug')('tortoise:RedisStore');
const redis = require('redis');
const util = require('util');

function RedisStore (options) {

  options = options || {};

  if ( ! options.host) throw new Error('a host is required to instantiate a redis store');
  if ( ! options.port) throw new Error('a port is required to instantiate a redis store');

  debug('creating RedisStore with arguments %j', options);

  var extraOptions = options.password ? { password: options.password } : null

  this.client = redis.createClient(options.port, options.host, extraOptions);

  this.keyFormat = options.keyFormat || 'tortoise.retry.%s';
  this.keyExpireTTL = options.keyExpireTTL || options.ttl || 10 * 60;
}

