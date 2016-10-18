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

    function Booth(name, tag) { return {name: name, tag: tag }};

    this.availableTimezoneCategories = [
      Booth('(UTC-12 - UTC-06) United States, Canada', 'gdcr16_utc-12_-_utc-06'),
      Booth('(UTC-05 - UTC-03) Colombia, Ecuador, Mexico, Peru, Chile, Argentina, United States, Canada', 'gdcr16_utc-05_-_utc-03'),
      Booth('(UTC-02 - UTC+01) Portugal, Spain, United Kingdom', 'gdcr16_utc-02_-_utc+01'),
      Booth('(UTC+02) Austria, Belgium, Czech Republic, France, Germany, Hungary, Italy, Macedonia, Poland, Serbia, South Africa, Switzerland, Turkey', 'gdcr16_utc+02'),
      Booth('(UTC+03 - UTC+05:30) Belarus, Finland, Latvia, Lithuania, Romania, Russia, India', 'gdcr16_utc+03_-_utc+0530'),
      Booth('(UTC+06 - UTC+14) Bangladesh, Kazakhstan, China, Philippines, Singapore, Japan, Australia, New Zealand', 'gdcr16_utc+06_-_utc+14')
    ];

    this.boothNumber = ko.observable(1);

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
  }

  ko.applyBindings(new VideoBoothsViewModel(), $('#booths')[0]);
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

  ko.applyBindings(new TweetsViewModel(), $('#twitter')[0]);
}

window.onload=init;