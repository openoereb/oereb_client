var gutil = require('gulp-util');

module.exports = function versionProcessor(moduleMap) {

  // Our process method definition
  // Getting all docs as a parameter
  function proc(docs) {

    var version = gutil.env.PACKAGE_VERSION;

    // After all the processing is done, we push the changes to docs
    // Note here that we are using our constant template defined earlier
    // Name and Items are parsed with the template
    docs.push({
      name: 'VERSION',
      template: 'constant-data.template.js',
      outputPath: 'src/version-data.js',
      items: version
    });

  }

  // Defining when the processor will run, and it's process
  return {
    $runAfter: ['paths-computed'],
    $runBefore: ['rendering-docs'],
    $process: proc
  };

};