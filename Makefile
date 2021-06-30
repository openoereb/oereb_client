# ********************
# Variable definitions
# ********************

# Package name and version
PKG = oereb_client
PKG_VERSION = $(if ${VERSION},${VERSION},master)

# JavaScript source files
SRC_JS = $(shell find $(PKG)/static/js -name '*.js')

# JavaScript test specifications
TEST_JS = $(shell find test/js -name '*.spec.js')


# *******************
# Set up environments
# *******************

.venv/.timestamp:
	python3 -m venv .venv
	.venv/bin/pip install --upgrade pip
	touch $@

.venv/.requirements.timestamp: .venv/.timestamp requirements.txt
	.venv/bin/pip install wheel
	.venv/bin/pip install -r requirements.txt
	touch $@

node_modules/.timestamp: package.json
	npm install
	touch $@


# **************
# Common targets
# **************

.PHONY: clean
clean:
	rm -rf $(shell find . -name '__pycache__')
	rm -rf .venv
	rm -rf node_modules
	rm -rf build
	rm -rf dist
	rm -rf $(PKG).egg-info
	rm -rf .cache
	rm -f .coverage
	rm -f npm-debug.log

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut --fields=1 --delimiter=' '`

.PHONY: lint-py
lint-py: .venv/.requirements.timestamp setup.cfg
	.venv/bin/flake8

.PHONY: test-py
test-py: .venv/.requirements.timestamp
	.venv/bin/py.test -vv --cov-config .coveragerc --cov oereb_client test/py

.PHONY: lint-js
lint-js: node_modules/.timestamp .eslintrc.yml $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/eslint $(SRC_JS) $(TEST_JS)

.PHONY: test-js
test-js: node_modules/.timestamp karma.conf.js $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/karma start karma.conf.js

.PHONY: check-js
check-js: git-attributes lint-js test-js

.PHONY: check-py
check-py: git-attributes lint-py test-py

.PHONY: check
check: check-py check-js

.PHONY: install
install: .venv/.requirements.timestamp node_modules/.timestamp

.PHONY: build
build: install

.PHONY: serve
serve: build app.ini
	uwsgi --plugin python3 --http-socket 0.0.0.0:8080 --ini-paste-logged /app/app.ini

.PHONY: updates-py
updates-py: .venv/.requirements.timestamp
	.venv/bin/pip list --outdated --format=columns

.PHONY: updates-js
updates-js: package.json
	-npm outdated

.PHONY: updates
updates: updates-py updates-js

.PHONY: doc
doc: node_modules/.timestamp
	./node_modules/.bin/gulp --PACKAGE_VERSION=$(PKG_VERSION) dgeni
