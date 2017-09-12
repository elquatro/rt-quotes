all: venv deps gen

venv:
	if [ ! -d .venv ]; then virtualenv .venv; fi

deps:
	source .venv/bin/activate; pip install -r requirements

gen:
	rm -rf dist/
	mkdir -p dist/json
	source .venv/bin/activate; bin/gen
	cp -r src/img dist/img
	cp -r src/vendor/* dist/
	cp src/app.js dist/
	cp src/index.html dist/
	cp src/style.css dist/
	cp src/favicon.png dist/

dev:
	devd dist
