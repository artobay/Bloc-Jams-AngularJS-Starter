(function(){
  function SongPlayer() {
    
	 /**
	*@desc SongPlayer an empty object that returns a service 
	*@type {object}
	*/
	
	var SongPlayer = {};
    
	/**
	*@desc Current playing object 
	*@type {object}
	*/
	var currentSong = null;

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
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };
//-------------------------------------------------------------	  
	/**
    * @function playSong
    * @desc Start playing song and sets song.playing to true.
    * @param {Object} song
    */
      var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
         };
//-------------------------------------------------------------
    
	 /** 
	 * @function SongPlayer.play 
	 * @ desc Play selected song when song.playing is true  
	 * @param {object} song
	 */
	  
	  
	  SongPlayer.play = function(song) {
      if(currentSong !== song) {
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      } else if (currentSong === song) {
        if(currentBuzzObject.isPaused()) {
          currentBuzzObject.play();
        }
      }
    };
//----------------------------------------------------------------
	/**
	*@function SongPlayer
	*@des Pause selected song when song.playing is false 
	*@param {object} song 
	
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