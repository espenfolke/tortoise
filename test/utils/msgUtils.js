var assert = require('chai').assert
  , sinon = require('sinon')
  , Promise = require('bluebird')
  , msgUtils = require('../../lib/utils/msgUtils')
  ,  pipeline= require('../../lib/middleware')
  , _ = require('lodash');

suite('utils/msgUtils', function() {



  test('validateWrapAndParsePublish parses and validates correctly', function(done) {

    var testCases = [
      {
        message: 'a',
        result: 'a'
      },
      {
        message: 1,
        result: 1
      },
      {
        message: { test: 'test' },
        result: JSON.stringify({ test: 'test' })
      },
      {
        message: null,
        expectFail: true
      },
      {
        message: undefined,
        expectFail: true
      },
      {
        expectFail: true
      },
      {
        message: true,
        expectFail: true
      },
      {
        message: false,
        expectFail: true
      }
    ];

    var testCasePromises = _.map(testCases, function(testCase) {
      return msgUtils.validateWrapAndParsePublish(testCase.message)
        .then(function(message) {
          const msg = JSON.parse(message)
          const data = (typeof msg.data == 'object') ? JSON.stringify(msg.data) : msg.data
          return data === testCase.result;
        })
        .catch(function(err) {
          return testCase.expectFail || false;
        });
    });

    Promise.all(testCasePromises)
      .then(function(results) {
        assert(_.every(results), 'A test case failed');
        done();
      });

  });

  test('validateAndParsePublish parses and validates correctly', function(done) {

    var testCases = [
      {
        message: 'a',
        result: 'a'
      },
      {
        message: 1,
        result: 1
      },
      {
        message: { test: 'test' },
        result: JSON.stringify({ test: 'test' })
      },
      {
        message: null,
        expectFail: true
      },
      {
        message: undefined,
        expectFail: true
      },
      {
        expectFail: true
      },
      {
        message: true,
        expectFail: true
      },
      {
        message: false,
        expectFail: true
      }
    ];

    var testCasePromises = _.map(testCases, function(testCase) {
      return msgUtils.validateAndParsePublish(testCase.message)
        .then(function(message) {
          return message === testCase.result;
        })
        .catch(function(err) {
          return testCase.expectFail || false;
        });
    });

    Promise.all(testCasePromises)
      .then(function(results) {
        assert(_.every(results), 'A test case failed');
        done();
      });

  });



  test('middleware parses and validates correctly', function(done) {

    var testCases = [
      {
        message: 'a',
        result: 'a'
      },
      {
        message: 1,
        result: 1
      },
      {
        message: { test: 'test' },
        result: JSON.stringify({ test: 'test' })
      },
      {
        message: null,
        expectFail: true
      },
      {
        message: undefined,
        expectFail: true
      },
      {
        expectFail: true
      },
      {
        message: true,
        expectFail: true
      },
      {
        message: false,
        expectFail: true
      }
    ];

    var testCasePromises = _.map(testCases, function(testCase) {
        return pipeline.execute({msg: testCase.message})
        .then(function(ctx) {
          const msg = JSON.parse(ctx.msg)
          const data = (typeof msg.data == 'object') ? JSON.stringify(msg.data) : msg.data
          console.log("true", testCase, data === testCase.result);
          return data === testCase.result;
        })
        .catch(function (err) {
          // console.log("err", testCase, testCase.expectFail || false);
          return testCase.expectFail || false;
        });
      });

    Promise.all(testCasePromises)
      .then(function(results) {
        console.log(results);
        assert(_.every(results), 'A test case failed');
        done();
      });

  });
});