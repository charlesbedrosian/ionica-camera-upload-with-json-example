// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.services'])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, Camera) {

  $scope.getPhoto = function() {
    Camera.getPicture().then(function(fileURI) {

      var json = {
      expense : "{ toOnDate : \"2014-12-23\", amount : 18484.20, comments : \"this is a test\",fields : [] }"
          };

      var options = new FileUploadOptions();
      options.fileKey = "receipt";
      options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.params = json;
      
      var ft = new FileTransfer();
      console.log("Uploading...");
      ft.upload(fileURI, encodeURI("http://posttestserver.com/post.php?dump"),
          function(a) {
            console.log("uplaod success!");
            console.log(a.response);
          },
          function() {
            console.log("An error happened!");
          }, options);

    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
  };

})
