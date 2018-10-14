/* global $ */
function init() {
  focusTabOnPageLoad();
  initLinksToTabs();
  initTweetsModel();
  initVideoBoothsModel();
}

function initLinksToTabs() {
  // From http://stackoverflow.com/questions/19625211/bootstrap-linking-to-a-tab-with-an-url
  $(function() {
    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $('ul.nav li a[href="' + $(this).attr('href') + '"]').tab('show');
   });
 });
}

function focusTabOnPageLoad() {
  // Javascript to enable link to tab
  var url = document.location.toString();
  if (url.match('#')) {
    $('.nav-tabs a[href="#'+url.split('#')[1]+'"]').tab('show') ;
  }

// With HTML5 history API, we can easily prevent scrolling!
  $('.nav-tabs a').on('shown.bs.tab', function (e) {
    if(history.pushState) {
      history.pushState(null, null, e.target.hash);
    } else {
      window.location.hash = e.target.hash; //Polyfill for old browsers
    }
  })
}


function initVideoBoothsModel() {
  function VideoBoothsViewModel() {
    var _this = this;

    function Booth(name, tag, from, to) { return {name: name, tag: tag, from: from, to: to }};

    this.availableTimezoneCategories = [
      Booth('(UTC-12 - UTC-06) United States, Canada', 'gdcr18_utc-12_-_utc-06', -12, -6),
      Booth('(UTC-05 - UTC-03) Colombia, Ecuador, Mexico, Peru, Chile, Argentina, United States, Canada', 'gdcr18_utc-05_-_utc-03', -5, -3),
      Booth('(UTC-02 - UTC+0) Portugal, Spain, United Kingdom', 'gdcr18_utc-02_-_utc+00', -2, 0),
      Booth('(UTC+01 - UTC+2) Austria, Belgium, Czech Republic, France, Germany, Hungary, Italy, Macedonia, Poland, Serbia, South Africa, Switzerland, Turkey', 'gdcr18_utc+01_-_utc+02', 1, 2),
      Booth('(UTC+03 - UTC+05:30) Belarus, Finland, Latvia, Lithuania, Romania, Russia, India', 'gdcr18_utc+03_-_utc+0530', 3, 5.5),
      Booth('(UTC+06 - UTC+14) Bangladesh, Kazakhstan, China, Philippines, Singapore, Japan, Australia, New Zealand', 'gdcr18_utc+06_-_utc+14', 6, 14)
    ];

    this.boothNumber = ko.observable(1);

    function getInitialTimezone() {
      const hrsOffset = -(new Date().getTimezoneOffset() / 60);
      for(const booth of _this.availableTimezoneCategories) {
        if(booth.to >= hrsOffset) {
          return booth;
        }
      }
      return undefined;
    }
    this.selectedTimezoneCategory = ko.observable();
    this.selectedTimezoneCategory.subscribe(function() {
      this.boothNumber(1);
    }, this);


    this.increaseBoothNumber = function() {
      _this.boothNumber(_this.boothNumber()+1);
    };
    this.decreaseBoothNumber = function() {
      _this.boothNumber(Math.max(1, _this.boothNumber()-1));
    };

    this.selectedBoothVideoUrl = ko.computed(function() {
      var selectedTimezoneCategory = this.selectedTimezoneCategory();
      if(typeof selectedTimezoneCategory !== 'object')
        return undefined;

      return "https://appear.in/"+selectedTimezoneCategory.tag+"-"+this.boothNumber();
    }, this);

    this.selectedBoothVideoUrl.subscribe(function() {
      $('#videoboothIframe').attr('src', this.selectedBoothVideoUrl());
    }, this);

    this.selectedTimezoneCategory(getInitialTimezone());
  }

  ko.applyBindings(new VideoBoothsViewModel(), $('#booths')[0]);
}

function initTweetsModel() {
  function TweetsViewModel() {
    this.city = ko.observable();
    this.hashtag = ko.observable();
    this.constraint = ko.observable();

    this.startTweet = ko.computed(function() {
      var text = (this.city() || 'We are')+' checking in for #gdcr18! Let\'s play the Game Of Life! '+(this.hashtag() || '')+' #live';
      return {
        text: text,
        url: 'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)
      };
    }, this);

    this.currentSessionTweet = ko.computed(function() {
      var text = (this.city() || 'We are')+' doing the "'+(this.constraint() || 'XXX')+'" Session now! #gdcr18 #live '+(this.hashtag() || '');
      return {
        text: text,
        url: 'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)
      };
    }, this);

    this.endTweet = ko.computed(function() {
      var text = (this.city() || 'Our Event')+' is done for the day. Thank you for attending! #gdcr18 #live '+(this.hashtag() || '');
      return {
        text: text,
        url: 'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)
      };
    }, this);
  }

  ko.applyBindings(new TweetsViewModel(), $('#twitter')[0]);
}

window.onload=init;
