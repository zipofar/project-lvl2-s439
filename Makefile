start:
	npx babel-node -- src/bin/gendiff.js
lint:
	npx eslint .
publish:
	npm publish
build:
	npm run-script build
test:
	npm run-script test
testw:
	npm run-script test-watch
.PHONY: test
