all: venv deps gen

venv:
	if [ ! -d .venv ]; then virtualenv -p python3 .venv; fi

deps:
	source .venv/bin/activate; pip install -r requirements

travis_install:
	pip install -r requirements
	mkdir -p dist/json
	cp src/index.html dist/
	./gen
	cp -r src/img dist/img
	cp -r src/vendor/* dist/
	cp src/app.js dist/
	cp src/style.css dist/
	cp src/favicon.png dist/

gen:
	rm -rf dist/
	mkdir -p dist/json
	cp src/index.html dist/
	source .venv/bin/activate; ./gen
	cp -r src/img dist/img
	cp -r src/vendor/* dist/
	cp src/app.js dist/
	cp src/style.css dist/
	cp src/favicon.png dist/

dev:
	devd dist

.PHONY: gen
