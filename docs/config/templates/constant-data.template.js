angular
// Injecting into our app module
  .module('docs')

  // Creating an Angular constant and rendering a list of items as JSON
  .constant('{$ doc.name $}', {$ doc.items | json $});