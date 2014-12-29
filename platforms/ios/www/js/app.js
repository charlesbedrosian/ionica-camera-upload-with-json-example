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

  $scope.processOne = function(fileURI) {
  		console.log(fileURI);
      // build JSON from model fields (simulated)
      var toOnDate = "2014-12-23";
      var amount = 18484.20;
      var comments = "this is a test";
      var expenseTypeCode = "EX01";
      var projectCode = "AAA";

      var json = {
      expense : "{ " +
          "toOnDate: \"" + toOnDate + "\", " +
          "amount: " + amount + ", " +
          "comments: \"" + escape(comments) + "\", " + 
          "expenseTypeCode: \"" + expenseTypeCode + "\", " +
          "projectCode: \"" + projectCode + "\", " +
          "fields: []" +
          "}"
          };
      
      var options = new FileUploadOptions();
      options.fileKey = "receipt";
      options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      options.params = json;
      
      var ft = new FileTransfer();
      console.log("Uploading...");
      // var url = "http://posttestserver.com/post.php?dump";
      var url = "http://192.168.1.120:4644/employees/robert.b.cool/saveexpense";
      ft.upload(fileURI, encodeURI(url),
          function(a) {
            console.log("uplaod success!");
            console.log(a.response);
          },
          function(a) {
            console.log("An error happened during upload");
            console.log(a);
          }, options);

  };  
  
  $scope.getPhoto = function() {
    Camera.getPicture().then(function(fileURI) {
		$scope.processOne(fileURI);
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
