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
    $(document).on(
      "click.bs.tab.data-api",
      '[data-toggle="tab"], [data-toggle="pill"]',
      function(e) {
        e.preventDefault();
        $('ul.nav li a[href="' + $(this).attr("href") + '"]').tab("show");
      }
    );
  });
}

function focusTabOnPageLoad() {
  // Javascript to enable link to tab
  var url = document.location.toString();
  if (url.match("#")) {
    $('.nav-tabs a[href="#' + url.split("#")[1] + '"]').tab("show");
  }

  // With HTML5 history API, we can easily prevent scrolling!
  $(".nav-tabs a").on("shown.bs.tab", function(e) {
    if (history.pushState) {
      history.pushState(null, null, e.target.hash);
    } else {
      window.location.hash = e.target.hash; //Polyfill for old browsers
    }
  });
}

function initVideoBoothsModel() {
  const ROOM_NUM_LOWER_END = 2;
  const ROOM_NUM_UPPER_END = 8;

  function VideoBoothsViewModel() {
    var _this = this;

    function Booth(name, tag, from, to) {
      return { name: name, tag: tag, from: from, to: to };
    }

    this.availableTimezoneCategories = [
      Booth(
        "(UTC-12 - UTC-06) United States, Canada",
        "gdcr19_utc-12_-_utc-06",
        -12,
        -6
      ),
      Booth(
        "(UTC-05 - UTC-03) Colombia, Ecuador, Mexico, Peru, Chile, Argentina, United States, Canada",
        "gdcr19_utc-05_-_utc-03",
        -5,
        -3
      ),
      Booth(
        "(UTC-02 - UTC+0) Portugal, Spain, United Kingdom",
        "gdcr19_utc-02_-_utc+00",
        -2,
        0
      ),
      Booth(
        "(UTC+01 - UTC+2) Austria, Belgium, Czech Republic, France, Germany, Hungary, Italy, Macedonia, Poland, Serbia, South Africa, Switzerland, Turkey",
        "gdcr19_utc+01_-_utc+02",
        1,
        2
      ),
      Booth(
        "(UTC+03 - UTC+05:30) Belarus, Finland, Latvia, Lithuania, Romania, Russia, India",
        "gdcr19_utc+03_-_utc+0530",
        3,
        5.5
      ),
      Booth(
        "(UTC+06 - UTC+14) Bangladesh, Kazakhstan, China, Philippines, Singapore, Japan, Australia, New Zealand",
        "gdcr19_utc+06_-_utc+14",
        6,
        14
      )
    ];

    this.boothNumber = ko.observable(1);

    function getInitialTimezone() {
      const hrsOffset = -(new Date().getTimezoneOffset() / 60);
      for (const booth of _this.availableTimezoneCategories) {
        if (booth.to >= hrsOffset) {
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
      _this.boothNumber(_this.boothNumber() + 1);
    };
    this.decreaseBoothNumber = function() {
      _this.boothNumber(Math.max(1, _this.boothNumber() - 1));
    };

    this.selectedBoothVideoRoom = ko.computed(function() {
      var selectedTimezoneCategory = this.selectedTimezoneCategory();
      if (typeof selectedTimezoneCategory !== "object") return undefined;

      return selectedTimezoneCategory.tag + "-" + this.boothNumber();
    }, this);

    this.selectedBoothVideoUrl = ko.computed(function() {
      return "https://meet.jit.si/" + this.selectedBoothVideoRoom();
    }, this);

    this.jitsiApi = ko.observable(undefined);
    this.city = ko.observable("");
    this.city.subscribe(function() {
      if (this.city() !== "" && typeof this.jitsiApi() !== "undefined") {
        this.jitsiApi().executeCommand("displayName", this.city());
      }
    }, this);

    this.started = ko.observable(false);
    this.start = function() {
      _this.started(true);
      _this.connectToRoom();
    };

    this.connectToRoom = function() {
      if (!_this.started()) {
        return;
      }

      const container = document.querySelector("#videoboothIframeContainer");
      while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
      }

      const options = {
        roomName: _this.selectedBoothVideoRoom(),
        parentNode: container,
        configOverwrite: {
          startWithAudioMuted: true
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          DEFAULT_REMOTE_DISPLAY_NAME: "Fellow Coderetreat",
          SHOW_WATERMARK_FOR_GUESTS: false,
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fodeviceselection",
            "hangup",
            "chat",
            "settings",
            "videoquality",
            "filmstrip",
            "shortcuts",
            "tileview"
          ]
        }
      };
      _this.jitsiApi(new JitsiMeetExternalAPI("meet.jit.si", options));
      console.log("booth", "new API");

      window.setTimeout(function() {
        console.log("booth", "city", _this.city());
        if (_this.city() !== "") {
          console.log("booth", "Setting displayName", _this.city());
          _this.jitsiApi().executeCommand("displayName", _this.city());
        }
        console.log("booth", "initial timeout");
        _this.updateParticipantsCount();
        _this
          .jitsiApi()
          .on("participantJoined", _this.updateParticipantsCount.bind(this));
        _this
          .jitsiApi()
          .on("participantLeft", _this.updateParticipantsCount.bind(this));
      }, 5000);
    };
    this.selectedBoothVideoRoom.subscribe(this.connectToRoom, this);

    this.autoswitchRoom = ko.observable(true);
    this.tooFewParticipants = ko.observable(false);

    this.participantsCount = ko.observable(undefined);

    this.updateParticipantsCount = function() {
      if (typeof _this.jitsiApi() === "undefined") {
        return;
      }
      const count = _this.jitsiApi().getNumberOfParticipants();
      console.log("booth", "Updating participants count", count);

      _this.participantsCount(count);
      _this.participantsCount.valueHasMutated();
    };

    this.autoswitchRoom.subscribe(this.updateParticipantsCount, this);

    this.tooFewParticipants = ko.computed(function() {
      const num = this.participantsCount();
      if (typeof num === "undefined") return false;

      return num < ROOM_NUM_LOWER_END;
    }, this);

    this.tooManyParticipants = ko.computed(function() {
      const num = this.participantsCount();
      if (typeof num === "undefined") return false;

      return num > ROOM_NUM_UPPER_END;
    }, this);

    this.tooFewParticipants.subscribe(function() {
      console.log("booth", "Too few!", this.tooFewParticipants());
    }, this);

    this.tooManyParticipants.subscribe(function() {
      console.log("booth", "Too many!", this.tooManyParticipants());
    }, this);

    this.autoswitchTimeout = ko.observable(undefined);
    this.maybeSwitchRoomSoon = function() {
      if (!_this.autoswitchRoom()) {
        return;
      }

      const tooFew = _this.tooFewParticipants();
      const tooMany = _this.tooManyParticipants();
      const timeout = _this.autoswitchTimeout();
      console.log("booth", "Maybe", tooFew, tooMany, timeout);

      if (!tooFew && !tooMany && timeout) {
        window.clearTimeout(timeout);
      } else if (tooFew || tooMany) {
        window.setTimeout(_this.switchRoom.bind(_this), 1000);
      }
    };

    this.participantsCount.subscribe(this.maybeSwitchRoomSoon, this);

    this.switchRoom = function() {
      console.log("booth", "Switching");
      _this.autoswitchTimeout(undefined);
      if (!_this.autoswitchRoom()) {
        return;
      }

      const tooFew = _this.tooFewParticipants();
      const tooMany = _this.tooManyParticipants();
      if (!tooFew && !tooMany) {
        return;
      }
      const currentBooth = _this.boothNumber();
      _this.boothNumber(((currentBooth + 1) % 5) + 1);
      _this.participantsCount(undefined);
    };

    this.selectedTimezoneCategory(getInitialTimezone());
  }

  ko.applyBindings(new VideoBoothsViewModel(), $("#booths")[0]);
}

function initTweetsModel() {
  function TweetsViewModel() {
    this.city = ko.observable();
    this.hashtag = ko.observable();
    this.constraint = ko.observable();

    this.startTweet = ko.computed(function() {
      var text =
        (this.city() || "We are") +
        " checking in for #gdcr19! Let's play the Game Of Life! " +
        (this.hashtag() || "") +
        " #live";
      return {
        text: text,
        url: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text)
      };
    }, this);

    this.currentSessionTweet = ko.computed(function() {
      var text =
        (this.city() || "We are") +
        ' doing the "' +
        (this.constraint() || "XXX") +
        '" Session now! #gdcr19 #live ' +
        (this.hashtag() || "");
      return {
        text: text,
        url: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text)
      };
    }, this);

    this.endTweet = ko.computed(function() {
      var text =
        (this.city() || "Our Event") +
        " is done for the day. Thank you for attending! #gdcr19 #live " +
        (this.hashtag() || "");
      return {
        text: text,
        url: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text)
      };
    }, this);
  }

  ko.applyBindings(new TweetsViewModel(), $("#twitter")[0]);
}

window.onload = init;
