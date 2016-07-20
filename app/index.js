'use strict';

/* globals THREE */

// var ReactDOM = require('react-dom'),
//     rust = require('rust');

// ReactDOM.render(
//   rust.element(
//     'div',
//     null,
//     'Hello World'
//   ),
//   document.getElementById('app-entry')
// );


var scene, camera, renderer;
var geometry, material, shape;

init();
animate();

function init() {

  scene = new THREE.Scene();

  var directionalLight = new THREE.DirectionalLight( 0xff0000, 2 );
  directionalLight.position.set( 0, 1, 0 );
  scene.add( directionalLight );

  // var light = new THREE.PointLight( 0xffffff, 1, 0 );
  // light.position.set( 0, 200, 0 );
  // scene.add(light);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  geometry = new THREE.SphereGeometry( 200, 8, 6 );
  // geometry = new THREE.BoxGeometry( 200, 200, 200 );

  // material = new THREE.MeshBasicMaterial({
  //   // wireframe: true,
  //   color: 0x00b4ff
  // });

  material = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
  });

  shape = new THREE.Mesh( geometry, material );
  scene.add( shape );

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame( animate );

  shape.rotation.x += 0.01;
  shape.rotation.y += 0.02;

  renderer.render( scene, camera );

}
