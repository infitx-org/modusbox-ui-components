
.DEFAULT_GOAL := yarn

MAKE_DIRECTORY := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

DATE := $(shell date +'%Y%m%d%H%M%S')
CONTAINER_NAME := ui_components_$(DATE)



yarn:
	@docker run -it --rm -v $(MAKE_DIRECTORY)/src:/usr/local/code/src $(options) ui-components $(cmd)

test: cmd := run test
test: yarn

add: cmd := add $(package)
remove: cmd := remove $(package)
add remove : options := -v $(MAKE_DIRECTORY)/:/usr/local/code
add remove : yarn install


start: cmd := start
start: options := -p 8080:8080 -p 8081:8081
start: yarn

eslint:
	@docker run -it --rm -v $(MAKE_DIRECTORY)/src:/usr/local/code/src $(options) ui-components eslint

prettier:
	@docker run -it --rm -v $(MAKE_DIRECTORY)/src:/usr/local/code/src $(options) ui-components prettier

lint: prettier eslint


extract: install bare_build bare_extract

install:
	@docker build --pull --tag ui-components .

bare_build:
	@docker run --rm ui-components run test

bare_extract:
	@docker run --name $(CONTAINER_NAME) ui-components build
	@docker cp $(CONTAINER_NAME):/usr/local/code/dist/. ./dist
	@docker rm $(CONTAINER_NAME)

release:
	@git add -f dist/index.js
	@git add -f dist/mulesoft.css
	@git add -f dist/modusbox.css
	@git commit -m 'Automatically releasing...'
	@git push origin master
