#!/bin/bash
COMPOSE_PROJECT_NAME=app

docker network create "$COMPOSE_PROJECT_NAME" 2> /dev/null

export COMPOSE_PROJECT_NAME="$COMPOSE_PROJECT_NAME"
export APP_HOST=localhost
export JWT_SECRET=SECRET
export MYSQL_HOST=******
export MYSQL_PORT=3306
export MYSQL_USER=******
export MYSQL_PASSWORD=******
export MYSQL_DATABASE=******
export NETWORK_NAME="$COMPOSE_PROJECT_NAME"

docker compose -f docker-compose.proxy.yaml -f docker-compose.api.yaml up -d --force-recreate
