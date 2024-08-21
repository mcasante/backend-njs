# Load environment variables from .env file
ifneq (,$(wildcard .env))
    include .env
    export
endif

COMMAND=docker exec -it $(APP_NAME)
PNPM=$(COMMAND) pnpm
COMPOSE=docker-compose

# Use docker compose if docker-compose is not available
ifeq (, $(shell command -v docker-compose))
	COMPOSE=docker compose
endif

up:
	$(COMPOSE) up -d && \
	$(COMPOSE) exec $(APP_NAME) pnpm install --no-frozen-lockfile

down:
	$(COMPOSE) down

clean: ## Clean up node_modules and related files
	$(COMMAND) rm -rf node_modules .pnpm-store pnpm-lock.yaml

bash: ## Enter the bash shell in the container
	$(COMMAND) /bin/bash

dev:
	$(PNPM) start:dev

format:
	$(PNPM) format

test-cov:
	$(PNPM) test:cov

test-unit:
	$(PNPM) test