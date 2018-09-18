module.exports = function guideMenuProcessor() {
  return {
    $runAfter: ['adding-extra-docs'],
    $runBefore: ['extra-docs-added'],
    $process: process
  };

  function process(docs) {

    docs.push({
      docType: 'guideMenu',
      template: 'guideMenu.template.html',
      outputPath: 'partials/guide-menu.html',
      path: 'partials/guide-menu.html',
      id: 'partials/guide-menu'
    });

  }
};