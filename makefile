all: gen

gen:
	./bin/gen

dev:
	python -m SimpleHTTPServer 8000
