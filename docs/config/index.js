var path = require('canonical-path');

var Package = require('dgeni').Package;

module.exports = new Package('oereb_client_doc', [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks')
])

  .processor(require('./processors/index-page'))
  .processor(require('./processors/version'))
  .processor(require('./processors/api-data'))
  .processor(require('./processors/guide-data'))

  .config(function (log, readFilesProcessor, writeFilesProcessor) {

    // Set the log level to 'info', switch to 'debug' when troubleshooting
    log.level = 'info';

    // Specify the base path used when resolving relative paths to source and output files
    readFilesProcessor.basePath = path.resolve(__dirname, '../..');

    // Specify our source files that we want to extract
    readFilesProcessor.sourceFiles = [
      { // All of our application files
        include: 'oereb_client/static/js/**/*.js',
        basePath: 'oereb_client/static/js'
      },
      { // Our static Markdown documents
        include: 'docs/content/**/*.md',
        basePath: 'docs/content',
        fileReader: 'ngdocFileReader'
      }
    ];

    // Use the writeFilesProcessor to specify the output folder for the extracted files
    writeFilesProcessor.outputFolder = 'docs/build';

  })

  .config(function (parseTagsProcessor, getInjectables) {
    parseTagsProcessor.tagDefinitions =
      parseTagsProcessor.tagDefinitions.concat(getInjectables(require('./tag-defs')));
  })

  .config(function (templateFinder) {

    // Specify where the templates are located
    templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));

  })

  .config(function (computePathsProcessor, computeIdsProcessor) {

    computePathsProcessor.pathTemplates.push({
      docTypes: ['module'],
      pathTemplate: '${area}/${name}',
      outputPathTemplate: 'partials/${area}/${name}.html'
    });

    computePathsProcessor.pathTemplates.push({
      docTypes: ['componentGroup'],
      pathTemplate: '${area}/${moduleName}/${groupType}',
      outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
    });

    // create new compute for 'content' type doc
    // indexPage is something new we will be defining later
    computeIdsProcessor.idTemplates.push({
      docTypes: ['content', 'indexPage'],
      getId: function (doc) {
        return doc.fileInfo.baseName;
      },
      getAliases: function (doc) {
        return [doc.id];
      }
    });

    // Build custom paths and set the outputPaths for "content" pages
    computePathsProcessor.pathTemplates.push({
      docTypes: ['content'],
      getPath: function (doc) {
        var docPath = path.dirname(doc.fileInfo.relativePath);
        if (doc.fileInfo.baseName !== 'index') {
          docPath = path.join(docPath, doc.fileInfo.baseName);
        }
        return docPath;
      },
      outputPathTemplate: 'partials/${path}.html'
    });

  })

  .config(function (extractAccessTransform) {
    extractAccessTransform.allowedDocTypes.add('js');
  });
