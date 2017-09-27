# ********************
# Variable definitions
# ********************

# Google Closure Library depswriter script
DEPSWRITER = $(shell find node_modules/google-closure-library -name 'depswriter.py')

# Google Closure Compiler
COMPILER = $(shell find node_modules/google-closure-compiler -name 'compiler.jar')

# JavaScript source files
SRC_JS = $(shell find oereb_client/static/js -name '*.js')

# External JavaScript libraries
LIB_JS = \
	oereb_client/static/lib/angular.min.js \
	oereb_client/static/lib/angular-animate.min.js \
	oereb_client/static/lib/jquery.min.js \
	oereb_client/static/lib/ol.js \
	oereb_client/static/lib/proj4.js

# LESS source files
SRC_LESS = $(shell find oereb_client/static/less -name '*.less')

# JavaScript test specifications
TEST_JS = $(shell find test/js -name '*.spec.js')

# Google Closure Library dependencies for tests
TEST_DEPS = test/js/deps.js

# Python source files
SRC_PY = $(shell find oereb_client -name '*.py')


# *******************
# Set up environments
# *******************

.venv/.timestamp:
	virtualenv .venv
	touch $@

.venv/.requirements-timestamp: .venv/.timestamp requirements.txt
	.venv/bin/pip2 install -r requirements.txt
	touch $@

node_modules/.timestamp: package.json
	npm install
	touch $@

oereb_client/static/build/.timestamp:
	mkdir -p oereb_client/static/build
	touch $@


# ************************
# JavaScript code handling
# ************************

oereb_client/static/lib/.timestamp: node_modules/.timestamp
	mkdir -p oereb_client/static/lib
	touch $@

oereb_client/static/lib/jquery.min.js: oereb_client/static/lib/.timestamp
	cp node_modules/jquery/jquery.min.js oereb_client/static/lib/

oereb_client/static/lib/angular.min.js: oereb_client/static/lib/.timestamp
	cp node_modules/angular/angular.min.js oereb_client/static/lib/

oereb_client/static/lib/angular-animate.min.js: oereb_client/static/lib/.timestamp
	cp node_modules/angular-animate/angular-animate.min.js oereb_client/static/lib/

oereb_client/static/lib/ol.js: oereb_client/static/lib/.timestamp
	cp node_modules/openlayers/dist/ol.js oereb_client/static/lib/

oereb_client/static/lib/proj4.js: oereb_client/static/lib/.timestamp
	cp node_modules/proj4/dist/proj4.js oereb_client/static/lib/

oereb_client/static/build/oereb.min.js: oereb_client/static/build/.timestamp node_modules/.timestamp $(SRC_JS)
	java -jar $(COMPILER) \
	--compilation_level='ADVANCED' \
	--externs='node_modules/google-closure-compiler/contrib/externs/angular-1.5.js' \
	--externs='node_modules/google-closure-compiler/contrib/externs/jquery-1.9.js' \
	--externs='node_modules/openlayers/externs/proj4js.js' \
	--externs='node_modules/openlayers/externs/oli.js' \
	--externs='node_modules/openlayers/externs/olx.js' \
	--externs='externs/ol.js' \
	--js='node_modules/google-closure-library/closure/goog/**.js' \
	--js='!node_modules/google-closure-library/closure/goog/**_test.js' \
	--js='oereb_client/static/js/**.js' \
	--extra_annotation_name='ngdoc' \
	--extra_annotation_name='ngname' \
	--export_local_property_definitions \
	--generate_exports \
	--dependency_mode='LOOSE' \
	--entry_point='oereb_client' \
	--angular_pass \
	--create_source_map='oereb_client/static/build/oereb.min.js.map' \
    > $@

build-js: $(LIB_JS) oereb_client/static/build/oereb.min.js

$(TEST_DEPS): node_modules/.timestamp $(SRC_JS)
	.venv/bin/python $(DEPSWRITER) \
	--root_with_prefix="./oereb_client/static/js ../../../../oereb_client/static/js" \
	--root_with_prefix="./node_modules/google-closure-library/closure/goog ../../../../node_modules/google-closure-library/closure/goog" \
	> $@


# ***************************
# LESS and CSS style handling
# ***************************

oereb_client/static/css/.timestamp: node_modules/.timestamp
	mkdir -p oereb_client/static/css
	touch $@

oereb_client/static/css/oereb.css: oereb_client/static/css/.timestamp $(SRC_LESS)
	./node_modules/.bin/lessc oereb_client/static/less/oereb.less $@

oereb_client/static/build/oereb.min.css: oereb_client/static/build/.timestamp oereb_client/static/css/oereb.css
	./node_modules/.bin/cleancss -O2 -o $@ \
	node_modules/openlayers/dist/ol.css \
	node_modules/bootstrap/dist/css/bootstrap.min.css \
	node_modules/font-awesome/css/font-awesome.min.css \
	oereb_client/static/css/oereb.css

build-css: oereb_client/static/build/oereb.min.css


# **************
# Common targets
# **************

.PHONY: install
install: .venv/.requirements-timestamp node_modules/.timestamp build

.PHONY: clean
clean:
	rm -rf .venv
	rm -rf node_modules
	rm -rf .tox
	rm -f .coverage
	rm -f npm-debug.log
	rm -rf oereb_client/static/lib
	rm -rf oereb_client/static/css
	rm -rf oereb_client/static/build
	rm -f $(TEST_DEPS)

.PHONY: git-attributes
git-attributes:
	git --no-pager diff --check `git log --oneline | tail -1 | cut --fields=1 --delimiter=' '`

.PHONY: lint-py
lint-py: .venv/.requirements-timestamp setup.cfg $(SRC_PY)
	.venv/bin/flake8

.PHONY: test-py
test-py: .venv/.requirements-timestamp $(SRC_PY)
	.venv/bin/py.test -vv --cov-config .coveragerc --cov oereb_client test/py

.PHONY: tox
tox: .venv/.requirements-timestamp tox.ini $(SRC_PY)
	.venv/bin/tox --recreate --skip-missing-interpreters

.PHONY: lint-js
lint-js: node_modules/.timestamp .eslintrc.yml $(SRC_JS) $(TEST_JS)
	./node_modules/.bin/eslint $(SRC_JS) $(TEST_JS)

.PHONY: test-js
test-js: node_modules/.timestamp karma.conf.js $(SRC_JS) $(TEST_JS) $(TEST_DEPS)
	./node_modules/.bin/karma start karma.conf.js

.PHONY: check-js
check-js: git-attributes lint-js test-js

.PHONY: check-py
check-py: git-attributes lint-py tox

.PHONY: check
check: check-py check-js

.PHONY: serve
serve: .venv/.requirements-timestamp node_modules/.timestamp development.ini
	.venv/bin/pserve development.ini

.PHONY: build
build: build-js build-css

.PHONY: less
less: oereb_client/static/css/oereb.css
