# Check that given variables are set with values or throw error.

check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
      $(error Undefined $1$(if $2, ($2))))
	  
.PHONY: help config\:gen

help:
	@echo ''
	@echo 'Usage: make [TARGET] [ARGUMENTS]'
	@echo ''

config\:gen:
	$(call check_defined, CONFIG_SOURCE, Source configuration)
	$(call check_defined, CONFIG_TARGET, Target configuration)

	(source ./scripts/aws-get-params.sh)