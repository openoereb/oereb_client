# ********************
# Variable definitions
# ********************

# Node modules
NODE_MODULES = node_modules/.timestamp

# Package name and version
PKG = oereb_client
PKG_VERSION = $(if ${VERSION},${VERSION},master)

# Static directories
BUILD_DIR = $(PKG)/static/build/.timestamp
CSS_DIR = $(PKG)/static/css/.timestamp
FONTS_DIR = $(PKG)/static/fonts/.timestamp

# Compiled files
APP_JS = $(dir $(BUILD_DIR))oereb.min.js
APP_CSS = $(dir $(BUILD_DIR))oereb.min.css

# External JavaScript libraries
LIB_JS = \
	$(dir $(NODE_MODULES))jquery/dist/jquery.min.js \
	$(dir $(NODE_MODULES))bootstrap/dist/js/bootstrap.min.js \
	$(dir $(NODE_MODULES))angular/angular.min.js \
	$(dir $(NODE_MODULES))angular-animate/angular-animate.min.js \
	$(dir $(NODE_MODULES))angular-file-saver/dist/angular-file-saver.bundle.min.js \
	$(dir $(NODE_MODULES))openlayers/dist/ol.js \
	$(dir $(NODE_MODULES))proj4/dist/proj4.js

# JavaScript source files
SRC_JS = $(shell find $(PKG)/static/js -name '*.js')

# HTML source files
SRC_HTML = $(shell find oereb_client/static/html -name '*.html')

# LESS source files
SRC_LESS = $(shell find oereb_client/static/less -name '*.less')

# JavaScript test specifications
TEST_JS = $(shell find test/js -name '*.spec.js')

# Angular template cache
TEMPLATE_CACHE = $(dir $(BUILD_DIR))templates.js

# Python source files
SRC_PY = $(shell find oereb_client -name '*.py')


# *******************
# Set up environments
# *******************

.venv/.venv-timestamp:
	python3 -m venv .venv
	touch $@

.venv/.requirements-timestamp: .venv/.venv-timestamp requirements.txt
	.venv/bin/pip3 install wheel
	.venv/bin/pip3 install -r requirements.txt
	touch $@

$(NODE_MODULES): package.json
	npm install --cache /tmp
	touch $@


# *********************
# Generated directories
# *********************

$(BUILD_DIR):
	mkdir -p $(dir $(BUILD_DIR))
	touch $@

$(CSS_DIR):
	mkdir -p $(dir $(CSS_DIR))
	touch $@

$(FONTS_DIR):
	mkdir -p $(dir $(FONTS_DIR))
	touch $@


# ****************************
# Build angular template cache
# ****************************

$(TEMPLATE_CACHE): $(NODE_MODULES) $(BUILD_DIR) $(SRC_HTML)
	./node_modules/.bin/nghtml2js \
	--module-name oereb \
	--base-path oereb_client/ \
	--no-new-module \
	--header "goog.require('oereb');" \
	--whitespace spaces \
	--files 'oereb_client/static/html/**/*.html' \
	--output $@


# **********************
# Copy application fonts
# **********************

$(dir $(FONTS_DIR)).bs-timestamp: $(NODE_MODULES) $(FONTS_DIR)
	cp $(dir $(NODE_MODULES))bootstrap/fonts/*.* $(dir $(FONTS_DIR))
	touch $@

$(dir $(FONTS_DIR)).fa-timestamp: $(NODE_MODULES) $(FONTS_DIR)
	cp $(dir $(NODE_MODULES))font-awesome/fonts/*.* $(dir $(FONTS_DIR))
	touch $@


# *********************
# Build application CSS
# *********************

$(dir $(CSS_DIR))oereb.css: $(NODE_MODULES) $(CSS_DIR) $(SRC_LESS) $(dir $(FONTS_DIR)).fa-timestamp
	./node_modules/.bin/lessc oereb_client/static/less/oereb.less $@

$(APP_CSS): $(NODE_MODULES) $(BUILD_DIR) $(dir $(CSS_DIR))oereb.css
	./node_modules/.bin/cleancss -O2 -o $@ \
	node_modules/openlayers/dist/ol.css \
	oereb_client/static/css/oereb.css


# ********************
# Build application JS
# ********************

$(dir $(BUILD_DIR))build.js: $(NODE_MODULES) $(BUILD_DIR) $(TEMPLATE_CACHE) $(SRC_JS) $(LIB_JS)
	touch $@

$(APP_JS): $(dir $(BUILD_DIR))build.js $(LIB_JS)
	awk 'FNR==1{print ""}1' $(LIB_JS) $< > $@


# **************
# Common targets
# **************

.PHONY: clean
clean:
	rm -rf .venv
	rm -rf node_modules
	rm -rf build
	rm -rf dist
	rm -rf $(PKG).egg-info
	rm -rf .cache
	rm -f .coverage
	rm -f npm-debug.log
	rm -rf $(dir $(LIB_DIR))
	rm -rf $(dir $(CSS_DIR))
	rm -rf $(dir $(FONTS_DIR))
	rm -rf $(dir $(BUILD_DIR))

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut --fields=1 --delimiter=' '`

.PHONY: lint-py
lint-py: .venv/.requirements-timestamp setup.cfg $(SRC_PY)
	.venv/bin/flake8

.PHONY: test-py
test-py: .venv/.requirements-timestamp $(SRC_PY)
	.venv/bin/py.test -vv --cov-config .coveragerc --cov oereb_client test/py

.PHONY: lint-js
lint-js: $(NODE_MODULES) .eslintrc.yml $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/eslint $(SRC_JS) $(TEST_JS)

.PHONY: test-js
test-js: $(NODE_MODULES) karma.conf.js $(SRC_JS) $(TEST_JS) $(TEST_DEPS) $(TEMPLATE_CACHE)
	./node_modules/.bin/karma start karma.conf.js

.PHONY: check-js
check-js: git-attributes lint-js test-js

.PHONY: check-py
check-py: git-attributes lint-py tox

.PHONY: check
check: check-py check-js

.PHONY: less
less: $(dir $(CSS_DIR))oereb.css

.PHONY: serve
serve: .venv/.requirements-timestamp $(NODE_MODULES) $(dir $(CSS_DIR))oereb.css development.ini
	.venv/bin/pserve development.ini --reload

.PHONY: build
build: $(APP_CSS) $(APP_JS)

.PHONY: install
install: .venv/.requirements-timestamp build

.PHONY: updates-py
updates-py: .venv/.requirements-timestamp
	.venv/bin/pip3 list --outdated --format=columns

.PHONY: updates-js
updates-js: package.json
	-npm outdated

.PHONY: updates
updates: updates-py updates-js

.PHONY: doc
doc: $(NODE_MODULES)
	./node_modules/.bin/gulp --PACKAGE_VERSION=$(PKG_VERSION) dgeni
