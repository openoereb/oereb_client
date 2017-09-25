SRC_JS = $(shell find oereb_client/static/js -name '*.js')
#SRC_CSS = $(shell find oereb_client/static/css -name '*.css')
TEST_JS = $(shell find test/js -name '*.spec.js')
DEPSWRITER = $(shell find node_modules/google-closure-library -name 'depswriter.py')

node_modules/timestamp: package.json
	npm install
	touch $@

.PHONY: install
install: node_modules/timestamp

.PHONY: clean
clean:
	rm -rf node_modules
	rm -f npm-debug.log

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut --fields=1 --delimiter=' '`

.PHONY: lint-js
lint-js: node_modules/timestamp .eslintrc.yml $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/eslint $(SRC_JS) $(TEST_JS)

.PHONY: test
test-js: node_modules/timestamp karma.conf.js $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/karma start karma.conf.js

.PHONY: check-js
check: git-attributes lint-js test-js
