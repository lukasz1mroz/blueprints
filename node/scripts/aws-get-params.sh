#!/usr/bin/env bash

set -o errexit
set -o pipefail
set +o xtrace

if [ -z "$CONFIG_SOURCE" ]; then
    echo "exit: No CONFIG_SOURCE specified"
    exit
fi

if [ -z "$CONFIG_TARGET" ]; then
    echo "exit: No CONFIG_TARGET specified"
    exit
fi

if [ -z "$CONFIG_TEMPLATE" ]; then
    echo "WARNING: No CONFIG_TEMPLATE specified. Default to local" >&2
    CONFIG_TEMPLATE=local
fi

echo "CONFIG SOURCE: " $CONFIG_SOURCE
echo "CONFIG TEMPLATE: " $CONFIG_TEMPLATE
echo "CONFIG TARGET: " $CONFIG_TARGET

APPROVAL_PARAMETERS=$(aws ssm get-parameter --name /blueprints/$CONFIG_SOURCE --region us-east-1 --with-decryption | jq --raw-output '.Parameter.Value')

VARS_TO_SUBSTITUTE=$(echo "$APPROVAL_PARAMETERS" | jq -r "to_entries|map(\"$\(.key)\")| join(\", \")")

for PARAM in $(echo "$APPROVAL_PARAMETERS" | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]"); do
    export ${PARAM}
done

TEMPLATE_FILE=$(cd ./config && ls | grep dist-env.$CONFIG_TEMPLATE.*)
TARGET_FILE=env.$CONFIG_TARGET.ts

envsubst "${VARS_TO_SUBSTITUTE}" <./config/$TEMPLATE_FILE >./config/$TARGET_FILE
