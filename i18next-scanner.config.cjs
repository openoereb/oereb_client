/* eslint-disable no-sync */

const fs = require('fs');
const chalk = require('chalk');

module.exports = {
  input: [
    './oereb_client/static/src/**/*.{js,jsx}',
    '!**/node_modules/**'
  ],
  output: './',
  options: {
    debug: false,
    removeUnusedKeys: true,
    sort: true,
    func: {
      list: ['t', '$t', 'i18next.t', 'i18n.t'],
      extensions: ['.js', '.jsx']
    },
    trans: {
      component: 'Trans',
      i18nKey: 'i18nKey',
      defaultsKey: 'defaults',
      extensions: ['.js', '.jsx'],
      fallbackKey: function (ns, value) {
        return value;
      },
      acorn: {
        ecmaVersion: 10, // defaults to 10
        sourceType: 'module' // defaults to 'module'
        // Check out https://github.com/acornjs/acorn/tree/master/acorn#interface for additional options
      }
    },
    lngs: ['en', 'de', 'fr'],
    ns: [
      'locale'
    ],
    defaultLng: 'en',
    defaultNs: 'locale',
    defaultValue: '__STRING_NOT_TRANSLATED__',
    resource: {
      loadPath: 'oereb_client/static/i18n/{{lng}}/{{ns}}.json',
      savePath: 'oereb_client/static/i18n/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n'
    },
    nsSeparator: false, // namespace separator
    keySeparator: '.', // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    },
    plural: false
  },
  transform: function(file, enc, done) {
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    let count = 0;

    parser.parseFuncFromString(content, {list: ['i18next._', 'i18next.__']}, (key, options) => {
      parser.set(key, Object.assign({}, options, {
        nsSeparator: false,
        keySeparator: false
      }));
      ++count;
    });

    if (count > 0) {
      console.log(
        `i18next-scanner: count=${chalk.cyan(count)},
        file=${chalk.yellow(JSON.stringify(file.relative))}`
      );
    }

    done();
  }
};
