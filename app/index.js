'use strict';

var ReactDOM = require('react-dom'),
    aframe = require('aframe-react'),
    Scene = aframe.Scene,
    Entity = aframe.Entity,
    rust = require('rust');

require('aframe');

ReactDOM.render(
  rust.o2([
    'div',
    // 'Hello World',

    [
      Scene,

      ['a-sky', {
        color: '#444444'
      }],


      [Entity, {
        geometry: {
          primitive: 'box',
          color: '#4279ff',
          width: '4',
          height: '10',
          depth: '2'
        }
      }]
    ]

    // ['a-scene',

    //   ['a-sky', {
    //     color: '#4279ff'
    //   }],
    //   ['a-light', {
    //     type: 'point',
    //     color: 'blue',
    //     position: '0 5 0'
    //   }]
    // ]
  ]),
  document.getElementById('app-entry')
);
