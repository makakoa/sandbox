'use strict';

var expose = require('util/exposer')(module.exports),
    _ = require('lodash');

expose(toCSS);
function toCSS(prefix, obj) {
  var nested = '';
  var current = _.map(obj, function(val, key) {
    if (_.isObject(val)) {
      nested += toCSS(key.startsWith('&')
                      ? prefix + key.slice(1)
                      : prefix + ' ' + key, val);
      return '';
    }
    return [key,':',val,';'].join('');
  }).join('');
  return [prefix, '{', current, '}', nested ].join('');
}
