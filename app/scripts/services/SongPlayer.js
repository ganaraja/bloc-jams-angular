(function() {
    function SongPlayer() {
         var SongPlayer = {};
         var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
         };

         /**
         * @function playSong
         * @desc Plays the current song and sets the flag playing to true
         * @param none
         */

         var playSong = function(){
               currentBuzzObject.play();
               song.playing = true;
         };

         /**
         * @function SongPlayer.play
         * @desc Plays the selected song and plays the current song if it is paused
         * @param song
         */

         SongPlayer.play = function(song) {
           if (currentSong !== song) {
               setSong(song);
               playSong();
           } else if (currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                  playSong();
               }
           }
         };

         /**
         * @function SongPlayer.pause
         * @desc Pause the selected song
         * @param song
         */

         SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
         };
         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
