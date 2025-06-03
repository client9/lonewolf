
lonewolf.js: src/*.js
	mkdir -p build
	cat src/expr.js src/list.js src/functional.js src/string.js src/html.js src/color.js > lonewolf.js

test: lonewolf.js
	node --test --test-reporter=dot tests/*.js

test-raw: lonewolf.js
	node --test tests/*.js

coverage:
	node --test --experimental-test-coverage --test-reporter=lcov --test-reporter-destination=main.lcov *.js
	lcov --summary main.lcov

lint:
	npx prettier src/*.js --write
	npx eslint src/*.js

clean:
	rm *.lcov


install:
	npm install --save-dev eslint@latest @eslint/js@latest
	npm install --save-dev --save-exact prettier
