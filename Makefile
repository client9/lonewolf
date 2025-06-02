install:
	npm install --save-dev eslint@latest @eslint/js@latest
	npm install --save-dev --save-exact prettier

test:
	node --test --test-reporter=dot *.js
coverage:
	node --test --experimental-test-coverage --test-reporter=lcov --test-reporter-destination=main.info *.js
	lcov --summary main.lcov
lint:
	npx prettier . --write
	npx eslint *.js


