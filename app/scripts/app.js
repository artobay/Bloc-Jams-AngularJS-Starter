(function() {
     function config($stateProvider, $locationProvider) {
		 
		 
		  $locationProvider
         .html5Mode({
             enabled: true,
             requireBase: false
         });
		 
		 $stateProvider
         .state('landing', {
             url: '/',
             templateUrl: '/templates/landing.html'
         })
		.state('album', {
             url: '/album',
             templateUrl: '/templates/album.html'
		 })  
		 
		 /*Alliyar: I didnt use the semicolon here. I learned that we state the name of or object first and then we can give some method to that object, so I tried to give some methods to collection object down here same as we did for album and landing */
		
         .state('collection', {
             url: '/collection',
             templateUrl: '/templates/collection.html'
         });
     }
 
 
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();