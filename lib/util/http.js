'use strict';

var _ = require('lodash'),
    request = require('superagent'),
    exposer = require('util/exposer'),
    Promise = require('util/promise');

function requestFactory(type) {
  return function makeRequest(url, headers, payload) {
    return new Promise(function(resolve, reject) {
      var req = request(type, url).withCredentials();
      if (headers) req.set(headers);
      if (payload) req.send(payload);
      req.end(function(err, res) {
        if (res) return resolve(res.body || res);
        reject(err);
      });
    });
  };
}

module.exports = function http() {
  var expose = exposer();

  expose(_.transform(['get','post','put','delete'], function(result, method) {
    result[method] = requestFactory(method.toUpperCase());
  }, {}));

  return expose();
};
