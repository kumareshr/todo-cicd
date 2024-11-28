#!/bin/sh

echo "Injecting environment variables into React app..."

# Iterate through all environment variables and replace placeholders in index.html
for var in $(env | grep REACT_APP_); do
  key=$(echo $var | cut -d '=' -f 1)
  value=$(echo $var | cut -d '=' -f 2-)
  echo "Injecting: $key=$value"
  sed -i "s|\${$key}|$value|g" /usr/share/nginx/html/index.html
done

echo "Environment variable injection complete."
