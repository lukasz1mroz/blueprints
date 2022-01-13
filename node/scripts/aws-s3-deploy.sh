#!/usr/bin/env bash

set -o errexit
set -o pipefail
set +o xtrace

# Prepare env vars

if [ -z "$DEPLOY_ENV" ]; then
    echo "exit: No DEPLOY_ENV provided"
    exit;
fi

CONFIG_SOURCE="$DEPLOY_ENV" CONFIG_TARGET="$DEPLOY_ENV" CONFIG_TEMPLATE="$DEPLOY_ENV" ./aws-get-params.sh

# Run build script and compress

npm run build && zip -r ../dist ../dist

# Push to EC2 through S3

aws s3 cp ../dist.zip s3://blueprints-deployments

# Login and fetch from EC2