var _ = require('lodash');

// Once again, simple generic method to assign all our data
function buildDocData(doc) {
  return _.assign({
    name: doc.name,
    type: doc.docType,
    outputPath: doc.outputPath,
    url: doc.path,
  });
}

module.exports = function guidePagesProcessor(moduleMap) {

  return {
    $runAfter: ['paths-computed'],
    $runBefore: ['rendering-docs'],
    $process: process
  };

  function process(docs) {

    // Filtering out to get only 'content' types and
    // only the ones under the 'guide' module
    var guides = _(docs).filter(function (doc) {
      return doc.docType === 'content' && doc.module === 'guide';
    })

    // Sort them via the path, you could also add a sortOrder param
      .sortBy(function (page) {
        return page.path;
      })

      // Mapping them with our generic method
      .map(buildDocData)

      // Get the value
      .value();

    // Using the same constant template but using a different
    // name and file path
    docs.push({
      name: 'GUIDE_DATA',
      template: 'constant-data.template.js',
      outputPath: 'src/guide-data.js',
      items: guides
    });
  }
};