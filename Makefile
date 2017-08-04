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

.PHONY: check
check: git-attributes
