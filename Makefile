
lonewolf.js: src/*.js
	rollup src/index.js --file lonewolf.js --format es

start: lonewolf.js
	python3 -m http.server

test: lonewolf.js
	node --test --test-reporter=dot tests/*.js

test-raw: lonewolf.js
	node --test tests/*.js

coverage:
	node --test --experimental-test-coverage --test-reporter=lcov --test-reporter-destination=main.lcov *.js
	lcov --summary main.lcov

lint:
	npx prettier src/*.js tests/*.js --write
	npx eslint src/*.js

clean:
	rm -f *.lcov
	rm -f lonewolf.js
	rm -rf dist

install:
	npm install --global rollup
	npm install --save-dev eslint@latest @eslint/js@latest
	npm install --save-dev --save-exact --save-exact prettier
