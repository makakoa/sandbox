'use strict';

var expose = require('util/exposer')(module.exports);

expose(b64encode);
function b64encode(s) {
  return new Buffer(s).toString('base64');
}

expose(b64decode);
function b64decode(s) {
  return new Buffer(s, 'base64').toString('ascii');
}
