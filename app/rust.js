'use strict';

// RUST: Framework + React + o2

var React = require('react'),
    expose = require('util/exposer')(module.exports),
    _ = require('lodash');

expose({
  class: React.createClass,
  element: React.createElement
});

expose(o2);
function o2(structure) {
  var tag = _.first(structure), props = {}, children = [];
  if (_.isArray(tag)) return o2(_.flatten(['list', structure]));
  _.each(_.tail(structure), function(item) {
    if (_.isArray(item)) return children.push(o2(item));
    if (_.isPlainObject(item)) return _.extend(props, item);
    children.push(item);
  });
  return React.createElement.apply(null, _.flatten([tag, props, children]));
}

expose(list);
function list(tag, arr) {
  arr.unshift(tag);
  return arr;
}
