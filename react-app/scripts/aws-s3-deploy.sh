# Run build script 

npm run webpack-build

# Push to S3

aws s3 cp ./dist s3://blueprints-react --recursive
