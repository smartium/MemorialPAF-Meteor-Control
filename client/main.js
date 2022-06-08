import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

pStatus = new ReactiveVar('')

const TERM01 = '127.0.0.1'
const TERM02 = '172.20.10.5'


Template.body.onRendered(()=> {
  // pStatus.set('S T O P')
  // Meteor.call('stop', '172.20.10.5')
  // Meteor.setTimeout(()=> {
  //   Meteor.call('play', '172.20.10.5')
  //   pStatus.set('P L A Y')
  // }, 3000)
})

Template.container.helpers({
  'pstatus'() {
    return pStatus.get()
  }
})

Template.commands.events({
  'click #play'(e) {
    e.preventDefault()
    Meteor.call('play', $('#ip').val())
    // pStatus.set('P L A Y')
    pStatus.set($('#ip').val())
  },

  'click #stop'(e) {
    e.preventDefault()
    Meteor.call('stop', TERM02)
    pStatus.set('S T O P')
  }
})