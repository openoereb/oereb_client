var gutil = require('gulp-util');

module.exports = function indexPageProcessor() {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: process
  };

  function process(docs) {

    var ciPagesUrl = gutil.env.CI_PAGES_URL || '';

    docs.push({
      docType: 'indexPage',
      template: 'indexPage.template.html',
      outputPath: 'index.html',
      path: 'index.html',
      id: 'index',
      ciPagesUrl: ciPagesUrl
    });

  }
};