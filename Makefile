start:
	npx babel-node -- src/bin/gendiff.js
lint:
	npx eslint .
publish:
	npm publish
build:
	npm run-script build
