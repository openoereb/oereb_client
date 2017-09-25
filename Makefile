SRC_JS = $(shell find oereb_client/static/js -name '*.js')
#SRC_CSS = $(shell find oereb_client/static/css -name '*.css')
TEST_JS = $(shell find test/js -name '*.spec.js')
DEPSWRITER = $(shell find node_modules/google-closure-library -name 'depswriter.py')

SRC_PY = $(shell find oereb_client -name '*.py')

.venv/timestamp:
	virtualenv .venv
	touch $@

.venv/requirements-timestamp: .venv/timestamp requirements.txt
	.venv/bin/pip2 install -r requirements.txt

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

.PHONY: lint-py
lint-py: .venv/requirements-timestamp setup.cfg $(SRC_PY)
	.venv/bin/flake8

.PHONY: test-py
test-py: .venv/requirements-timestamp tox.ini $(SRC_PY)
	.venv/bin/tox --recreate --skip-missing-interpreters

.PHONY: lint-js
lint-js: node_modules/timestamp .eslintrc.yml $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/eslint $(SRC_JS) $(TEST_JS)

.PHONY: test-js
test-js: node_modules/timestamp karma.conf.js $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/karma start karma.conf.js

.PHONY: check-js
check-js: git-attributes lint-js test-js

.PHONY: check-py
check-py: git-attributes lint-py test-py

.PHONY: check
check: check-py check-js
