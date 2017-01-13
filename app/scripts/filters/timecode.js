(function() {
    function timecode() {
        return function(seconds) {
          var seconds = Number.parseFloat(seconds);
          if (Number.isNaN(seconds)) {
              return '-:--';
          }
          timer = buzz.toTimer(seconds)
          return timer;
        };
    }

    angular
        .module('blocJams')
        .filter('timecode', timecode);
})();
