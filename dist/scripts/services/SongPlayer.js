(function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         var currentAlbum = Fixtures.getAlbum();
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });


            currentBuzzObject.bind('timeupdate', function() {
               $rootScope.$apply(function() {
                   SongPlayer.currentTime = currentBuzzObject.getTime();
               });
            });

            currentBuzzObject.bind('volumechange', function() {
               $rootScope.$apply(function() {
                   SongPlayer.volume = currentBuzzObject.getVolume();
               });
            });
            SongPlayer.currentSong = song;
         };

         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };

         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;

         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;

         /**
         * @desc volume of currently playing song
         * @type {Object}
         */
         SongPlayer.volume = null;

         /**
         * @function playSong
         * @desc Plays the current song and sets the flag playing to true
         * @param none
         */

         var playSong = function(song){
               currentBuzzObject.play();
               song.playing = true;
         };

         /**
         * @function stopSong
         * @desc Stops the current song and sets the flag playing to null
         * @param none
         */

         var stopSong = function(song){
               currentBuzzObject.stop();
               song.playing = null;
         };

         /**
         * @function SongPlayer.play
         * @desc Plays the selected song and plays the current song if it is paused
         * @param song
         */

         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
               setSong(song);
               playSong(song);
           } else if (SongPlayer.currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                  playSong(song);
               }
           }
         };

         /**
         * @function SongPlayer.pause
         * @desc Pause the selected song
         * @param song
         */

         SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
         };

         SongPlayer.previous = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             if (currentSongIndex < 0) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };


         SongPlayer.next = function() {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             if (currentSongIndex > currentAlbum.songs.length) {
               stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };

         /**
         * @function volume
         * @desc Set current volume of currently playing song
         * @param {Number} volume
         */
         SongPlayer.setVolume = function(volume) {
             if (currentBuzzObject) {
                 currentBuzzObject.setVolume(volume);
             }
         };
         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
