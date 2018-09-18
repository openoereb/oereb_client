angular
  .module('docs')
  .config(config);

function config(API_DATA, $routeProvider) {

  $routeProvider
    .when('/api', {
      templateUrl: 'partials/api.html'
    })
    .when('/guide', {
      templateUrl: 'partials/guide.html'
    })
    .otherwise('/guide');

  // Looping through all of our API pages
  angular.forEach(API_DATA, function (parent) {

    $routeProvider.when('/' + parent.url, {
      templateUrl: parent.outputPath
    });

    // In the case of API, we have multiple modules and each
    // of them have children, so we are doing the same thing
    // here but for the child states
    angular.forEach(parent.docs, function (doc) {

      $routeProvider.when('/' + doc.url, {
        templateUrl: doc.outputPath
      });

    });
  });

}

config.$inject = ["API_DATA", "$routeProvider"];