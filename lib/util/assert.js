'use strict';

module.exports = function assert(statement, message) {
  if (!statement) throw message;
};
