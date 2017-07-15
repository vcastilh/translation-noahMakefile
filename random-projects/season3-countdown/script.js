// var EVENT_TIME = 1501471800
var EVENT_TIME = 1501471800000
var NODES = {
  VIDEO: document.querySelector('.background-video'),
  DAYS: document.querySelector('#days'),
  HOURS: document.querySelector('#hours'),
  MINUTES: document.querySelector('#minutes'),
  SECONDS: document.querySelector('#seconds'),
  MILLISECONDS: document.querySelector('#milliseconds')
}

function format (number, length) {
  var string = number.toString()
  while (length > string.length) {
    string = '0' + string
  }
  return string
}

window.setInterval(function () {
  var timeDiff = EVENT_TIME - new Date().getTime()
  duration = moment.duration(timeDiff, 'milliseconds')
  NODES.DAYS.innerText = format(duration.days(), 2)
  NODES.HOURS.innerText = format(duration.hours(), 2)
  NODES.MINUTES.innerText = format(duration.minutes(), 2)
  NODES.SECONDS.innerText = format(duration.seconds(), 2)
  NODES.MILLISECONDS.innerText = format(duration.milliseconds(), 3)
}, 1);

function onYouTubeIframeAPIReady () {
  var player = new YT.Player('youtube-background', {
    videoId: 'DeAw6aXHzcY',
    width: 1080,
    height: 1920,
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0
    },
    events: {
      onReady: function(e) {
        e.target.mute();
      },
      onStateChange: function(e) {
        console.log('video ended')
        if (e.data === YT.PlayerState.ENDED) {
          player.playVideo();
        }
      }
    }
  });
}
