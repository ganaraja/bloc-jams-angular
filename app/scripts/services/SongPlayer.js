(function() {
      function SongPlayer(Fixtures) {
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

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
