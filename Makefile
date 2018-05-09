
.DEFAULT_GOAL := yarn

MAKE_DIRECTORY := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

DATE := $(shell date +'%Y%m%d_%H%M%S')
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

build: install bare_build bare_extract

install:
	@docker build --pull --tag ui-components .

bare_build:
	@docker run --rm ui-components run test

bare_extract:
	@docker run --name $(CONTAINER_NAME) ui-components pack --filename modusbox-ui-components.tgz
	@docker cp $(CONTAINER_NAME):/usr/local/code/modusbox-ui-components.tgz ./
	@docker rm $(CONTAINER_NAME)

upload_release:
	@set -e ;\
	VERSION=$$(docker run --rm ui-components -s printversion) ;\
	RELEASE="ui-components/$(DATE)/$(CODEBUILD_BUILD_ID)/modusbox-ui-components-$$VERSION.tgz" ;\
	echo Releasing to https://modusbox-release-artifacts.s3.amazonaws.com/$$RELEASE ;\
	aws s3 cp modusbox-ui-components.tgz s3://modusbox-release-artifacts/$$RELEASE --acl public-read
