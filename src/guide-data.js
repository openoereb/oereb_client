angular
// Injecting into our app module
  .module('docs')

  // Creating an Angular constant and rendering a list of items as JSON
  .constant('GUIDE_DATA', [
  {
    "name": "User guide",
    "type": "content",
    "outputPath": "partials/guide.html",
    "url": "guide"
  },
  {
    "name": "Installation",
    "type": "content",
    "outputPath": "partials/guide/01-installation.html",
    "url": "guide/01-installation"
  },
  {
    "name": "Configuration",
    "type": "content",
    "outputPath": "partials/guide/02-configuration.html",
    "url": "guide/02-configuration"
  }
]);