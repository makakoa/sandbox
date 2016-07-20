'use strict';

var fs = require('fs'),
    css = require('css');

var stylesString = [
  css.toCSS('html', require('styles'))
].join('');

fs.writeFile(__dirname+'/public/stylesheet.css', stylesString, function(err) {
  if (err) console.error('Error writing styles', err);
  var d = new Date();
  console.log('Styles updated: ', [
    d.getHours(),':',d.getMinutes(),':',d.getSeconds()
  ].join(''));
});
