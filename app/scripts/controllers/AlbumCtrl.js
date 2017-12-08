(function () {
  function AlbumCtrl(Fixures) {
  this.albumData = Fixtures.getAlbum();
  }
 
   angular
     .module('blocJams')
     .controller('AlbumCtrl', ['Fixtures',AlbumCtrl]);
 })();
