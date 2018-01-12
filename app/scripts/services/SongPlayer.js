(function(){
  function SongPlayer($rootScope, Fixtures) {  /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
    

    /**
    *@desc currentAlbum object stores album info
    *@type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /**
    *@desc Buzz object audio file
    *@type {Object}
    */
    var currentBuzzObject = null;

    /**
    *@function setSong
    *@desc Stops currently playing song and loads new audio file as
    *currentBuzzObject.
    *@param {Object} song
    */
    var setSong = function(song) {
      if(currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

    /**
    *@function stopSong
    *@desc Stops currently playing song and sets it to null
    *@param {Object} song
    */

	var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
    };

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

    /**
    *@function playSong
    *@desc Starts playing selected song and sets playing property to true.
    *@param {Object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    *@function getSongIndex
    *@desc Gets index # of current song
    *@param {Object} song
    *@return Index # of current song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    *@desc Current song Object
    *@type {Object}
    */
    SongPlayer.currentSong = null;
    
	 /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
 SongPlayer.currentTime = null;
 SongPlayer.volume = null; 
//------------------------------------------------------------
     /**
    *@function SongPlayer.play
    *@desc Plays selected song or paused song
    *@param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if(currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
//--------------------------------------------------------
    /**
    *@function SongPlayer.pause
    *@desc Pauses selected song if playing and sets playing property to false
    *@param {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
//--------------------------------------------------------------
    /**
    *@function SongPlayer.previous
    *@desc Plays previous song in songs list
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      if(currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
//--------------------------------------------------------------
	 /**
    *@function SongPlayer.previous
    *@desc Plays next song in songs list
    */
	 SongPlayer.next = function() {
      var currentIndex = getSongIndex(SongPlayer.currentSong);
      currentIndex++;
      if(currentIndex > currentAlbum.songs.length - 1) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var newSong = currentAlbum.songs[currentIndex];
        setSong(newSong);
        playSong(newSong);
      }
    };
//-------------------------------------------------------------
        SongPlayer.setCurrentTime = function(time) {
           if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
     }
 };
	
//----------------------------------------------------------	
		
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
