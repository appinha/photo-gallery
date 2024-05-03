TEST_CONTAINER_NAME=photo-gallery-test-db

all:
	flask run

.PHONY: install
install:
	python -m venv venv
	source venv/bin/activate
	pip install -r requirements. txt

.PHONY: test-env
test-env:
	docker run --name $(TEST_CONTAINER_NAME) -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5431:5432 -d postgres

.PHONY: test
test:
	pytest

.PHONY: del-test-env
del-test-env:
	docker rm -f $(TEST_CONTAINER_NAME)

.PHONY: lint
lint:
	flake8 *.py api/

.PHONY: format
prettier:
	black --line-length=79 *.py api/
