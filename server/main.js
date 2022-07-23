import { Meteor } from 'meteor/meteor'
import '../imports/both/collections/collections'

var OscEmitter = require('osc-emitter')
var emitterControl = new OscEmitter()
var emitterPlayer = new OscEmitter()

devMode = {
  enabled: true,
  address: '127.0.0.1'
}

Meteor.startup(() => {
  if (Configs.find().count() == 0) {
    console.log('Config está vazio!')
    import '../imports/both/collections/defaultconfig'
    Configs.insert(oPedro)
    Configs.insert(linhaDoTempo)
    Configs.insert(multipliqueSe)
  }
  else {
    console.log('Config localizada!')
  }
});

Meteor.methods({
  'play'(_name, _lang) {
    deck = Configs.findOne({ name: _name })
    Logs.insert({
      deck: deck,
      action: 'play',
      language: _lang,
      date: new Date(),
      timestamp: new Date().valueOf()
    })
    console.log(`PLAY: ${deck.title}`);

    var conttrolerSendAddr = devMode.enabled ? devMode.address : deck.controller.address;
    var playerSendAddr = devMode.enabled ? devMode.address : deck.player.address;

    if (deck.controller.enabled) {
      emitterControl.add(conttrolerSendAddr, deck.controller.port)
      emitterControl.emit(deck.controller.message, 1)
    }
    if (_lang == 'port') {
      if (deck.player.multiLang.portugueseSingle[2]) {
        emitterPlayer.add(playerSendAddr, parseInt(deck.player.port))
        for (let index = 0; index < 3; index++) {
          // console.log(deck.player.multiLang.portugueseSingle[index].arg);

          emitterPlayer.emit(
            deck.player.multiLang.portugueseSingle[index].msg,
            parseInt(deck.player.multiLang.portugueseSingle[index].arg)
          )
        }
      }
      else {
        emitterPlayer.add(playerSendAddr, parseInt(deck.player.port))
        emitterPlayer.emit(
          deck.player.multiLang.portugueseSingle.msg,
          parseInt(deck.player.multiLang.portugueseSingle.arg)
        )
      }
    }
    else if (_lang == 'eng') {
      if (deck.player.multiLang.englishSingle[2]) {
        emitterPlayer.add(playerSendAddr, parseInt(deck.player.port))
        for (let index = 0; index < 3; index++) {
          // console.log(deck.player.multiLang.portugueseSingle[index].arg);

          emitterPlayer.emit(
            deck.player.multiLang.englishSingle[index].msg,
            parseInt(deck.player.multiLang.englishSingle[index].arg)
          );
        }
      }
      else {
        emitterPlayer.add(playerSendAddr, parseInt(deck.player.port))
        emitterPlayer.emit(
          deck.player.multiLang.englishSingle.msg,
          parseInt(deck.player.multiLang.englishSingle.arg)
        )
      }
    }
  },
  'loop'(_name, _lang) {
    // emitter.add(ip, 1234)
    // emitter.emit('/play', 1, ip)
    // console.log(ip);
    deck = Configs.findOne({ name: _name })
    Logs.insert({
      deck: deck,
      action: 'play',
      language: _lang,
      date: new Date(),
      timestamp: new Date().valueOf()
    })
    console.log(`LOOP: ${deck.title}`);
  },
  'stop'(_name, _lang) {
    // emitter.add(ip, 1234)
    // emitter.emit('/play', 1, ip)
    // console.log(ip);
    deck = Configs.findOne({ name: _name })
    Logs.insert({
      deck: deck,
      action: 'play',
      language: _lang,
      date: new Date(),
      timestamp: new Date().valueOf()
    })
    console.log(`STOP: ${deck.title}`);
  }
})