

bare_build:
	@docker build --pull --tag ui-components .

bare_extract:
	@docker create --name ui-components ui-components
	@docker cp ui-components:/usr/local/code/dist/. ./dist
	@docker rm ui-components
