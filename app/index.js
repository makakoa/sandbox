'use strict';

var ReactDOM = require('react-dom'),
    rust = require('rust');

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

ReactDOM.render(
  rust.element(
    'div',
    {
      style: {
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexAlign: 'center',
        alignItems: 'flex-end',
        backgroundColor: 'black'
      }
    },
    rust.element(rust.class({
      componentDidMount: function() {
        this.canvasCtx = this.refs.canvas.getContext('2d');
        var audioCtx = new window.AudioContext();
        this.analyser = audioCtx.createAnalyser();

        var source = audioCtx.createMediaElementSource(this.refs.audio);
        source.connect(this.analyser);
        this.analyser.connect(audioCtx.destination);

        // var osc = audioCtx.createOscillator();
        // osc.type = 'sine';
        // osc.frequency.value = 300;
        // osc.connect(this.analyser);
        // this.analyser.connect(audioCtx.destination);
        // console.log('starting oscillator', osc);
        // osc.start();
        // window.osc = osc;

        this.draw();
      },

      draw: function() {
        requestAnimationFrame(this.draw);

        var canvasCtx = this.canvasCtx;

        this.analyser.fftSize = 256;
        var bufferLength = this.analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        this.analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        var barWidth = (WIDTH / bufferLength) * 2.5;
        var barHeight;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          canvasCtx.fillStyle = 'rgb(' + [
            (barHeight+100),
            (barHeight+100),
            (barHeight+100)
          ].join(',') + ')';
          canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

          x += barWidth + 1;
        }

        // this.analyser.fftSize = 2048;
        // var bufferLength = this.analyser.fftSize;
        // var dataArray = new Uint8Array(bufferLength);
        // this.analyser.getByteTimeDomainData(dataArray);

        // var canvasCtx = this.canvasCtx;

        // canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        // canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        // canvasCtx.lineWidth = 2;
        // canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        // canvasCtx.beginPath();

        // var sliceWidth = WIDTH * 1.0 / bufferLength;
        // var x = 0;

        // for (var i = 0; i < bufferLength; i++) {

        //   var v = dataArray[i] / 128.0;
        //   var y = v * HEIGHT/2;

        //   if (i === 0) {
        //     canvasCtx.moveTo(x, y);
        //   } else {
        //     canvasCtx.lineTo(x, y);
        //   }

        //   x += sliceWidth;
        // }

        // canvasCtx.lineTo(this.refs.canvas.width, this.refs.canvas.height/2);
        // canvasCtx.stroke();
      },

      render: function() {
        return rust.element(
          'div',
          null,
          rust.element('audio', {
            autoPlay: true,
            id: 'song',
            ref: 'audio',
            src: 'thread-of-clouds.mp3'
          }),
          rust.element('canvas', {
            ref: 'canvas',
            width: WIDTH,
            height: HEIGHT
          })
        );
      }
    }))
  ),
  document.getElementById('app-entry')
);
