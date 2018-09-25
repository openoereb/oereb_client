module.exports = function apiMenuProcessor() {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: process
  };

  function process(docs) {

    docs.push({
      docType: 'apiMenu',
      template: 'apiMenu.template.html',
      outputPath: 'partials/api-menu.html',
      path: 'partials/api-menu.html',
      id: 'partials/api-menu'
    });

  }
};