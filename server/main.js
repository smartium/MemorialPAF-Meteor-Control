import { Meteor } from 'meteor/meteor'

var OscEmitter = require('osc-emitter')
var emitter = new OscEmitter()

// emitter.add('172.20.10.5', 1234)
// var isPlaying = false

Meteor.startup(() => {
  // Meteor.setInterval(() => {
  //   isPlaying = !isPlaying
  //   console.log(isPlaying);
  //   if (isPlaying) {
  //     Meteor.call('play', '172.20.10.5')
  //   }
  //   else {
  //     Meteor.call('stop', '172.20.10.5')
  //   }
    
  // }, 15000)
});

Meteor.methods({
  'play'(ip) {
    emitter.add(ip, 1234)
    emitter.emit('/play', 1, ip)
    console.log(ip);
  },

  'stop'(ip) {
    emitter.add(ip, 1234)
    emitter.emit('/stop', 1, ip)
  }
})