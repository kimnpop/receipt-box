export const loadScriptChannelTalk = () => {
  var w = window;
  if (w.ChannelIO) {
    return (window.console.error || window.console.log || function () {})(
      'ChannelIO script included twice.'
    );
  }
  var ch = function () {
    ch.c(arguments);
  };
  ch.q = [];
  ch.c = function (args) {
    ch.q.push(args);
  };
  w.ChannelIO = ch;
  function l() {
    if (w.ChannelIOInitialized) {
      return;
    }
    w.ChannelIOInitialized = true;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
    s.charset = 'UTF-8';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  }
  if (document.readyState === 'complete') {
    l();
  } else if (window.attachEvent) {
    window.attachEvent('onload', l);
  } else {
    window.addEventListener('DOMContentLoaded', l, false);
    window.addEventListener('load', l, false);
  }
};

export const bootChannelTalk = (isChannelButtonOnBootHidden) => {
  window.ChannelIO('boot', {
    pluginKey: '5269ff47-a114-41bf-bdd3-7589d2df76db',
    hideChannelButtonOnBoot: isChannelButtonOnBootHidden,
  });
};

export const shutdownChannelTalk = () => {
  window.ChannelIO('shutdown');
};

export const openChatChannelTalk = (id, message) => {
  window.ChannelIO('openChat', id, message);
};
