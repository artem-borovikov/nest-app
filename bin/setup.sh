#!/bin/bash
COMPOSE_PROJECT_NAME=app

docker network create "$COMPOSE_PROJECT_NAME" 2> /dev/null

export COMPOSE_PROJECT_NAME="$COMPOSE_PROJECT_NAME"
export APP_HOST=185.93.110.217
export JWT_SECRET="ruly_develop_test_secret"
export MYSQL_HOST=81.31.247.100
export MYSQL_PORT=3306
export MYSQL_USER=zdrUde
export MYSQL_PASSWORD=WWquViuEjmmZGXhs
export MYSQL_DATABASE=CwaQWGLI
export NETWORK_NAME="$COMPOSE_PROJECT_NAME"

docker compose -f docker-compose.proxy.yaml -f docker-compose.api.yaml up -d --force-recreate
