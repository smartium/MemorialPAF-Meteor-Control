import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'animate.css'
import '../imports/both/collections/collections'
import './main.html';

lang = new ReactiveVar()
state = new ReactiveVar('port')

Meteor.startup(function () {
  Meteor.call('getState', (err, res) => {
    state.set(res)
    lang.set(res.activeLang)
  })
});

Template.registerHelper('appState', () => {
  return State.findOne()
});

Template.body.onRendered(() => {
  Meteor.setTimeout(function () {
    $('.deck').children('button[name="stop"]').prop("disabled", true)
    $('.decks').prop("disabled", true)
    $('#container').show()
  }, 500);

})

Template.tools.onRendered(() => {
  function showTime() {
    var date = new Date()
    var h = date.getHours()
    var m = date.getMinutes()
    var s = date.getSeconds()
    h = (h < 10) ? "0" + h : h
    m = (m < 10) ? "0" + m : m
    s = (s < 10) ? "0" + s : s
    var time = h + ":" + m + ":" + s + " "
    document.getElementById('clock').innerText = time;
    document.getElementById('clock').textContent = time;
    setTimeout(showTime, 1000);
  }
  showTime();
})

Template.container.helpers({
  screen() {
    return '~~ Memorial PAF ~~'
  }
})

Template.decks.helpers({
  deckItems() {
    return Configs.find()
  }
})

Template.language.helpers({
  state() {
    return State.findOne()
  },
  isPort(lang) {
    return lang == 'port' ? true : false
  }
})

Template.tools.helpers({
  state() {
    return State.findOne()
  },
  clock() {
    // return getTime('clock')
  }
})

Template.decks.events({
  'click [name="deckItem"]'(e) {
    if (e.target.name == 'play' || e.target.name == 'loop') {
      $('.deck').css("pointer-events", "none");
      $('.deck').css("opacity", "0.5");
      $("#language").css("pointer-events", "none");
      $("#language").css("opacity", "0.5");
      $(e.target).parent().children('button[name="play"]').prop('disabled', true)
      $(e.target).parent().children('button[name="loop"]').prop('disabled', true)
      $($(e.target).parent()).css("pointer-events", "auto");
      $($(e.target).parent()).css("opacity", "1");
      $($(e.target).parent()).css("border-color", "#0F0");
      $(e.target).parent().children('button[name="stop"]').prop('disabled', false)
      $(e.target).parent().children('button[name="stop"]').css({
        "border-color": "red",
        "color": "red"
      })
    }
    if (e.target.name == 'play') {
      Meteor.call('play', this.name, lang.get())
    }
    else if (e.target.name == 'loop') {
      Meteor.call('loop', this.name, lang.get())
    }
    else if (e.target.name == 'stop') {
      $('.deck').css("pointer-events", "auto");
      $('.deck').css("opacity", "1");
      $('.deck').css("border-color", "#FFF");
      $(e.target).parent().children('button[name="play"]').prop('disabled', false)
      $(e.target).parent().children('button[name="loop"]').prop('disabled', false)
      $(e.target).parent().children('button[name="stop"]').prop('disabled', true)
      $(e.target).parent().children('button[name="stop"]').css({
        "border-color": "white",
        "color": "white"
      })
      $('.column-2').prop('disabled', false)
      $("#language").css("pointer-events", "auto");
      // $("#language").css("opacity", "1");
      $("#language").removeAttr("style");
      Meteor.call('stop', this.name, lang.get())
    }
  }
})

Template.language.events({
  'click button'(e) {
    Meteor.setTimeout(function () {
      // lang.set(e.target.id)
      Meteor.call('setState', e.target.id)
    }, 100);
  }
})

Template.tools.events({
  'click .tools button'(e) {
    Meteor.call('tools.toggleLock')
  }
})


function getTime(elem) {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  var time = h + ":" + m + ":" + s
  document.getElementById(elem).innerText = time
  document.getElementById(elem).textContent = time
  setTimeout(getTime, 1000);
}