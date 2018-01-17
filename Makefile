# Check if running on CI
ifeq ($(CI),true)
  PIP_REQUIREMENTS=.requirements-timestamp
  VENV_BIN=
else
  PIP_REQUIREMENTS=.venv/.requirements-timestamp
  VENV_BIN=.venv/bin/
endif


# ********************
# Variable definitions
# ********************

# Google Closure Library depswriter script
DEPSWRITER = $(shell find node_modules/google-closure-library -name 'depswriter.py')

# Google Closure Compiler
COMPILER = $(shell find node_modules/google-closure-compiler -name 'compiler.jar')

# Package name
PKG = oereb_client

# Static directories
BUILD_DIR = $(PKG)/static/build/.timestamp
CSS_DIR = $(PKG)/static/css/.timestamp
FONTS_DIR = $(PKG)/static/fonts/.timestamp
LIB_DIR = $(PKG)/static/lib/.timestamp

# Compiled files
APP_JS = $(dir $(BUILD_DIR))oereb.min.js
APP_CSS = $(dir $(BUILD_DIR))oereb.min.css

# External JavaScript libraries
LIB_JS = \
	$(dir $(LIB_DIR))angular.min.js \
	$(dir $(LIB_DIR))angular-animate.min.js \
	$(dir $(LIB_DIR))jquery.min.js \
	$(dir $(LIB_DIR))bootstrap.min.js \
	$(dir $(LIB_DIR))ol.js \
	$(dir $(LIB_DIR))proj4.js

# JavaScript source files
SRC_JS = $(shell find $(PKG)/static/js -name '*.js')

# HTML source files
SRC_HTML = $(shell find oereb_client/static/html -name '*.html')

# LESS source files
SRC_LESS = $(shell find oereb_client/static/less -name '*.less')

# JavaScript test specifications
TEST_JS = $(shell find test/js -name '*.spec.js')

# Google Closure Library dependencies for tests
TEST_DEPS = test/js/deps.js

# Angular template cache
TEMPLATE_CACHE = $(dir $(BUILD_DIR))templates.js

# Python source files
SRC_PY = $(shell find oereb_client -name '*.py')

# Node modules
NODE_MODULES = node_modules/.timestamp


# *******************
# Set up environments
# *******************

.requirements-timestamp: requirements.txt
	pip install --upgrade -r requirements.txt
	touch $@

.venv/.timestamp:
	virtualenv .venv
	touch $@

.venv/.requirements-timestamp: .venv/.timestamp requirements.txt
	$(VENV_BIN)pip install -r requirements.txt
	touch $@

$(NODE_MODULES): package.json
	npm install
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

$(LIB_DIR):
	mkdir -p $(dir $(LIB_DIR))
	touch $@


# **************************************************
# Build test dependencies for Google Closure Library
# **************************************************

$(TEST_DEPS): $(NODE_MODULES) $(SRC_JS)
	$(VENV_BIN)python $(DEPSWRITER) \
	--root_with_prefix="./oereb_client/static/js ../../../../oereb_client/static/js" \
	--root_with_prefix="./node_modules/google-closure-library/closure/goog ../../../../node_modules/google-closure-library/closure/goog" \
	> $@


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


# *********************
# Copy application libs
# *********************

$(dir $(LIB_DIR))jquery.min.js: $(LIB_DIR)
	cp $(dir $(NODE_MODULES))jquery/jquery.min.js $(dir $(LIB_DIR))

$(dir $(LIB_DIR))angular.min.js: $(LIB_DIR)
	cp $(dir $(NODE_MODULES))angular/angular.min.js $(dir $(LIB_DIR))

$(dir $(LIB_DIR))angular-animate.min.js: $(LIB_DIR)
	cp $(dir $(NODE_MODULES))angular-animate/angular-animate.min.js $(dir $(LIB_DIR))

$(dir $(LIB_DIR))bootstrap.min.js: $(LIB_DIR)
	cp $(dir $(NODE_MODULES))bootstrap/dist/js/bootstrap.min.js $(dir $(LIB_DIR))

$(dir $(LIB_DIR))ol.js: $(LIB_DIR)
	cp $(dir $(NODE_MODULES))openlayers/dist/ol.js $(dir $(LIB_DIR))

$(dir $(LIB_DIR))proj4.js: $(LIB_DIR)
	cp $(dir $(NODE_MODULES))proj4/dist/proj4.js $(dir $(LIB_DIR))


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

$(APP_JS): $(NODE_MODULES) $(BUILD_DIR) $(TEMPLATE_CACHE) $(SRC_JS) $(LIB_JS)
	java -jar $(COMPILER) \
	--compilation_level='ADVANCED' \
	--externs='$(dir $(NODE_MODULES))google-closure-compiler/contrib/externs/angular-1.5.js' \
	--externs='$(dir $(NODE_MODULES))google-closure-compiler/contrib/externs/jquery-1.9.js' \
	--externs='$(dir $(NODE_MODULES))openlayers/externs/proj4js.js' \
	--externs='$(dir $(NODE_MODULES))openlayers/externs/oli.js' \
	--externs='$(dir $(NODE_MODULES))openlayers/externs/olx.js' \
	--externs='externs/ol.js' \
	--externs='externs/bootstrap.js' \
	--externs='externs/localStorage.js' \
	--js='$(dir $(NODE_MODULES))google-closure-library/closure/goog/**.js' \
	--js='!$(dir $(NODE_MODULES))google-closure-library/closure/goog/**_test.js' \
	--js='$(PKG)/static/js/**.js' \
	--js='$(TEMPLATE_CACHE)' \
	--extra_annotation_name='ngdoc' \
	--extra_annotation_name='ngname' \
	--export_local_property_definitions \
	--generate_exports \
	--dependency_mode='LOOSE' \
	--entry_point='$(PKG)' \
	--angular_pass \
	--create_source_map='$(dir $(BUILD_DIR))oereb.min.js.map' \
    > $@


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
	rm -rf .tox
	rm -rf .cache
	rm -f .coverage
	rm -f npm-debug.log
	rm -rf $(dir $(LIB_DIR))
	rm -rf $(dir $(CSS_DIR))
	rm -rf $(dir $(FONTS_DIR))
	rm -rf $(dir $(BUILD_DIR))
	rm -f $(TEST_DEPS)

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut --fields=1 --delimiter=' '`

.PHONY: lint-py
lint-py: $(PIP_REQUIREMENTS) setup.cfg $(SRC_PY)
	$(VENV_BIN)flake8

.PHONY: test-py
test-py: $(PIP_REQUIREMENTS) $(SRC_PY)
	$(VENV_BIN)py.test -vv --cov-config .coveragerc --cov oereb_client test/py

.PHONY: tox
tox: $(PIP_REQUIREMENTS) tox.ini $(SRC_PY)
	$(VENV_BIN)tox --recreate --skip-missing-interpreters

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
serve: $(PIP_REQUIREMENTS) $(NODE_MODULES) $(dir $(CSS_DIR))oereb.css development.ini
	$(VENV_BIN)pserve development.ini

.PHONY: build
build: $(APP_CSS) $(APP_JS)

.PHONY: install
install: $(PIP_REQUIREMENTS) build

.PHONY: updates-py
updates-py: $(PIP_REQUIREMENTS)
	$(VENV_BIN)pip list --outdated --format=columns

.PHONY: updates-js
updates-js: package.json
	-npm outdated

.PHONY: updates
updates: updates-py updates-js
