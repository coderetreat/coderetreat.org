function init() {
  initTweetsModel();
}

function initTweetsModel() {
  function TweetsViewModel() {
    this.city = ko.observable();
    this.hashtag = ko.observable();
    this.constraint = ko.observable();

    this.startTweet = ko.computed(function() {
      var text = (this.city() || 'We are')+' checking in for #gdcr16! Let\'s play the Game Of Life! '+(this.hashtag() || '')+' #live';
      return {
        text: text,
        url: 'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)
      };
    }, this);

    this.currentSessionTweet = ko.computed(function() {
      var text = (this.city() || 'We are')+' doing the "'+(this.constraint() || 'XXX')+'" Session now! #gdcr16 #live '+(this.hashtag() || '');
      return {
        text: text,
        url: 'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)
      };
    }, this);

    this.endTweet = ko.computed(function() {
      var text = (this.city() || 'Our Event')+' is done for the day. Thank you for attending! #gdcr16 #live '+(this.hashtag() || '');
      return {
        text: text,
        url: 'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)
      };
    }, this);
  }

  ko.applyBindings(new TweetsViewModel(), document.body);
}

window.onload=init;