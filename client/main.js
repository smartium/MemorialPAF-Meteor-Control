import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'animate.css'
import '../imports/both/collections/collections'
import './main.html';

lang = new ReactiveVar('port')

Template.body.onRendered(() => {
  Meteor.setTimeout(function () {
    $('.deck').children('button[name="stop"]').prop("disabled", true)
    $('#container').show()
  }, 500);

})

Template.container.helpers({
})

Template.decks.helpers({
  deckItems() {
    return Configs.find()
  }
})

Template.language.helpers({
  isPort() {
    return lang.get() == 'port' ? true : false
  }
})

Template.decks.events({
  'click [name="deckItem"]'(e) {
    if (e.target.name == 'play' || e.target.name == 'loop') {
      $('.deck').css("pointer-events", "none");
      $('.deck').css("opacity", "0.5");
      $($(e.target).parent()).css("pointer-events", "auto");
      $($(e.target).parent()).css("opacity", "1");
      $($(e.target).parent()).css("border-color", "#0F0");
    }
    if (e.target.name == 'play') {
      $(e.target).parent().children('button[name="play"]').prop('disabled', true)
      $(e.target).parent().children('button[name="loop"]').prop('disabled', true)
      $(e.target).parent().children('button[name="stop"]').prop('disabled', false)
      $("#language").css("pointer-events", "none");
      $("#language").css("opacity", "0.5");
      Meteor.call('play', this.name, lang.get())
    }
    else if (e.target.name == 'loop') {
      $(e.target).parent().children('button[name="play"]').prop('disabled', true)
      $(e.target).parent().children('button[name="loop"]').prop('disabled', true)
      $(e.target).parent().children('button[name="stop"]').prop('disabled', false)
      Meteor.call('loop', this.name, lang.get())
      $("#language").css("pointer-events", "none");
      $("#language").css("opacity", "0.5");
    }
    else if (e.target.name == 'stop') {
      $('.deck').css("pointer-events", "auto");
      $('.deck').css("opacity", "1");
      $('.deck').css("border-color", "#FFF");
      $(e.target).parent().children('button[name="play"]').prop('disabled', false)
      $(e.target).parent().children('button[name="loop"]').prop('disabled', false)
      $(e.target).parent().children('button[name="stop"]').prop('disabled', true)
      $('.column-2').prop('disabled', false)
      $("#language").css("pointer-events", "auto");
      $("#language").css("opacity", "1");
      Meteor.call('stop', this.name, lang.get())
    }
  }
})

Template.language.events({
  'click button'(e) {
    Meteor.setTimeout(function () {
      lang.set(e.target.id)
    }, 100);
  }
})