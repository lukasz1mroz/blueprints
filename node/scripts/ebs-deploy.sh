#!/usr/bin/env bash

set -o errexit
set -o pipefail
set +o xtrace

if [ -z "$APP_VERSION" ]; then
    echo "exit: No APP_VERSION provided"
    exit
fi

npm run build

npm run build:app

aws s3 cp ./app.zip s3://blueprints-backend/app.zip

aws elasticbeanstalk create-application-version --application-name bprints --version-label "$APP_VERSION" --source-bundle S3Bucket="blueprints-backend",S3Key="app.zip"

aws elasticbeanstalk update-environment --application-name bprints --environment-name Bprints-env --version-label "$APP_VERSION"
