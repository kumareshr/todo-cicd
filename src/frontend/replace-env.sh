#!/bin/sh

echo "Replacing environment variables in nginx.conf..."

if [ -z "$BACKEND_SERVICE_URL" ]; then
  echo "ERROR: BACKEND_SERVICE_URL is not set."
  exit 1
fi

sed -i "s|\${BACKEND_SERVICE_URL}|$BACKEND_SERVICE_URL|g" /etc/nginx/conf.d/default.conf

echo "Starting NGINX..."
exec "$@"
