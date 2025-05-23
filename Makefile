# ********************
# Variable definitions
# ********************

# Environment and python
VENV_BIN ?= .venv/bin/
PYTHON_VERSION ?= python3

# Package name and version
PKG = oereb_client
PKG_VERSION = $(if ${VERSION},${VERSION},main)

# JavaScript source files
SRC_JS += $(shell find $(PKG)/static/src -name '*.js')

# Style source files
SRC_SCSS += $(shell find $(PKG)/static/src -name '*.scss')

# JavaScript test specifications
TEST_JS += $(shell find test/js -name '*.js')
TEST_JS += $(shell find test/js -name '*.test.js')


# *******************
# Set up environments
# *******************

.venv/.timestamp:
	$(PYTHON_VERSION) -m venv .venv
	$(VENV_BIN)pip install --upgrade pip
	touch $@

.venv/.requirements.timestamp: .venv/.timestamp requirements.txt setup.py
	$(VENV_BIN)pip install wheel
	$(VENV_BIN)pip install -r requirements.txt
	touch $@

node_modules/.timestamp: package.json
	npm install
	touch $@


# *****************
# Build application
# *****************

oereb_client/static/build/.timestamp: node_modules/.timestamp vite.config.js $(SRC_JS) $(SRC_SCSS)
	rm -rf oereb_client/static/build/
	./node_modules/.bin/vite build
	touch $@


# *******************
# Build documentation
# *******************

.storybook/oereb_client.json: oereb_client.yml
	yq eval -j oereb_client.yml > $@


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
	rm -rf .pytest_cache
	rm -f .coverage
	rm -rf coverage
	rm -f npm-debug.log
	rm -rf docs/build
	rm -f .storybook/oereb_client.json

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut -f 1 -d ' '`

.PHONY: lint-py
lint-py: .venv/.requirements.timestamp setup.cfg
	.venv/bin/flake8

.PHONY: test-py
test-py: .venv/.requirements.timestamp
	.venv/bin/py.test -vv --cov-config .coveragerc --cov-report xml:.pytest-coverage.xml --cov-report term:skip-covered --cov oereb_client test/py

.PHONY: lint-js
lint-js: node_modules/.timestamp eslint.config.js $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/eslint $(SRC_JS) $(TEST_JS)

.PHONY: lint-js-fix
lint-js-fix: node_modules/.timestamp eslint.config.js $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/eslint --fix $(SRC_JS) $(TEST_JS)

.PHONY: test-js
test-js: node_modules/.timestamp vite.config.js $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/vitest --coverage --run

.PHONY: check-js
check-js: git-attributes lint-js test-js

.PHONY: check-py
check-py: git-attributes lint-py test-py

.PHONY: check
check: check-py check-js

.PHONY: install
install: .venv/.requirements.timestamp node_modules/.timestamp

.PHONY: build
build: install oereb_client/static/build/.timestamp

.PHONY: serve
serve: build app.ini
	uwsgi --plugin $(PYTHON_VERSION) --http-socket 0.0.0.0:8080 --ini-paste-logged /app/app.ini

.PHONY: serve-dev
serve-dev: build app.ini node_modules/.timestamp .venv/.requirements.timestamp
	./node_modules/.bin/vite build --watch &
	.venv/bin/pserve app.ini --reload

.PHONY: serve-devwin
serve-devwin: build pserve.ini
	DEVELOPMENT=true $(VENV_BIN)pserve pserve.ini --reload

.PHONY: scan-locales
scan-locales: node_modules/.timestamp i18next-scanner.config.cjs
	./node_modules/.bin/i18next-scanner --config i18next-scanner.config.cjs

.PHONY: updates-py
updates-py: .venv/.requirements.timestamp
	$(VENV_BIN)pip list --outdated --format=columns

.PHONY: updates-js
updates-js: package.json
	-npm outdated

.PHONY: updates
updates: updates-py updates-js

.PHONY: doc
doc: node_modules/.timestamp .storybook/oereb_client.json
	rm -rf docs/build/
	npm run build-storybook -- --docs --output-dir ./docs/build
	mkdir -p docs/build/static/i18n
	cp -r oereb_client/static/i18n/* docs/build/static/i18n/
	mkdir -p docs/build/samples
	cp -r samples/static docs/build/samples/static

.PHONY: serve-doc
serve-doc: node_modules/.timestamp
	npx http-server ./docs/build

.PHONY: update-snapshots
update-snapshots: $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/vitest --update --coverage --run
