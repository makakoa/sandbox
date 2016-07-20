'use strict';

var ReactDOM = require('react-dom'),
    rust = require('rust');

ReactDOM.render(
  rust.element(
    'div',
    null,
    'Hello World'
  ),
  document.getElementById('app-entry')
);
