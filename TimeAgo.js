var React = require('react-native');
var {
  PropTypes,
  Text
} = React;
var moment = require('moment');
var TimerMixin = require('react-timer-mixin');
var defaultRelativeTime = {
    'future' : 'in %s',
    'past'   : '%s ago',
    'few seconds':'1s',
    'minute':'1min',
    'minutes':'mins',
    'hour':'1h',
    'hours':'hs',
    'day':'1d',
    'days':'ds',
    'month':'1mon',
    'months':'mons',
    'year':'yr',
    'years':'yrs'
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
     digit= (!isNaN(parseInt(digit))) ? digit[0]: digit=''

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

  }
});

module.exports = TimeAgo;
