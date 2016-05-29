import React, {PropTypes} from 'react';
import {

  Text
} from 'react-native';
var moment = require('moment');
var TimerMixin = require('react-timer-mixin');
var defaultRelativeTime = {
    'future' : 'in %s',
    'past'   : '%s ago',
    'few seconds':'now',
    'minute':'1 min',
    'minutes':' mins',
    'hour':'1 hr',
    'hours':' hrs',
    'day':'1 day',
    'days':' days',
    'month':'1 mon',
    'months':' mons',
    'year':' y',
    'years':' y'
};
var TimeAgo = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    time: PropTypes.string,
    unixTimeStamp: PropTypes.number,
    interval: PropTypes.number,
    hideAgo: PropTypes.bool
  },

  getDefaultProps() {
    return {
      hideAgo: false,
      interval: 60000
    }
  },

  componentDidMount() {
    var {interval} = this.props;
    this.setInterval(this.update, interval);
  },

  componentWillUnmount() {
    this.clearInterval(this.update);
  },

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    this.forceUpdate();
  },

  getShortTimeString(longAgoString){
     var compare =longAgoString.substr(longAgoString.indexOf(' ')).trim();
     var digit =longAgoString.split(' ');
     digit= (!isNaN(parseInt(digit[0]))) ? digit[0]: digit=''

     return defaultRelativeTime[compare] ? digit+" "+defaultRelativeTime[compare] : longAgoString;
},

  render() {
    if(this.props.unixTimeStamp){
    return (
      <Text {...this.props}>{this.getShortTimeString(moment.unix(this.props.unixTimeStamp).fromNow(this.props.hideAgo))}</Text>
    );
    }
    else if(this.props.time){
      return (
      <Text {...this.props}>{moment(this.props.time).fromNow(this.props.hideAgo)}</Text>
    );
    }
    else{
      return (
      <Text {...this.props}>nothig is there</Text>
    );
    }


  }
});

module.exports = TimeAgo;
