'use strict';

var ReactDOM = require('react-dom'),
    aframe = require('aframe-react'),
    Scene = aframe.Scene,
    Entity = aframe.Entity,
    rust = require('rust');

function randColorVal() {
  return Math.floor(Math.random() * 255);
}
function randomColor() {
  return 'rgb(' + [
    randColorVal(),
    randColorVal(),
    randColorVal()
  ].join(',') + ')';
}

require('aframe');

ReactDOM.render(
  rust.o2([
    'div',
    // 'Hello World',

    [
      Scene,
      {
        antialias: true
      },

      ['a-sky', {
        color: '#444444'
      }],

      [rust.class({
        getInitialState: function() {
          setTimeout(this.randomizeColor, 2000);
          return {
            color: randomColor()
          };
        },

        randomizeColor: function() {
          setTimeout(this.randomizeColor, 2000);
          this.setState({
            color: randomColor()
          });
        },

        render: function() {
          console.log('color: ', this.state.color);
          return rust.o2([Entity, {
            primitive: 'a-box',
            material: {
              color: this.state.color
            },
            position: '0 0 -10',
            geometry: {
              width: '5',
              height: '5',
              depth: '5'
            }
          }]);
        }
      })]



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
