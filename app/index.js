'use strict';

var ReactDOM = require('react-dom');

ReactDOM.render(
  require('main'),
  document.getElementById('app-entry')
);

if (module.hot) { // react hot loading
  function hotUpdate() {
    require('react-dom').render(
      require('react').createElement(
        require('react-hot-loader').AppContainer,
        {},
        require('main')
      ),
      document.getElementById('app-entry')
    );
  }
  module.hot.accept('./src/main', hotUpdate);
  hotUpdate(); // setup initial app container
}
