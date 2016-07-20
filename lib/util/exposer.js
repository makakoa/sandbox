'use strict';

var _ = require('lodash');

module.exports = function exposer(exposed) {
  exposed = exposed || {};
  return function(addition) {
    if (_.isFunction(addition)) exposed[addition.name] = addition;
    if (_.isObject(addition)) _.extend(exposed, addition);
    return exposed;
  };
};
