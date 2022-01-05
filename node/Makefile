# Check that given variables are set with values or throw error.


check_defined = $(if $(value $1),,$(error Undefined $1 ($(strip $2))))

.PHONY: help config\:gen

help:
	@echo ''
	@echo 'Usage: make [TARGET] [ARGUMENTS]'
	@echo ''

config\:gen:
	$(call check_defined, CONFIG_SOURCE, Source configuration)
	$(call check_defined, CONFIG_TARGET, Target configuration)

	(source ./scripts/aws-temp-key.sh && source ./scripts/kms-get-parameters.sh)