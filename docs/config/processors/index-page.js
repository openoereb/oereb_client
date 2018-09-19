var gutil = require('gulp-util');

module.exports = function indexPageProcessor() {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: process
  };

  function process(docs) {

    var urlPrefix = gutil.env.URL_PREFIX || '';

    docs.push({
      docType: 'indexPage',
      template: 'indexPage.template.html',
      outputPath: 'index.html',
      path: 'index.html',
      id: 'index',
      urlPrefix: urlPrefix
    });

  }
};