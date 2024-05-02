all:
	flask run

.PHONY: install
install:
	python -m venv venv
	source venv/bin/activate
	pip install -r requirements. txt

.PHONY: lint
lint:
	flake8 *.py api/

.PHONY: format
prettier:
	black *.py api/
