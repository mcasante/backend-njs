include .env

COMMAND=docker exec -it $(APP_NAME)
PNPM=$(COMMAND) pnpm
COMPOSE=docker-compose

ifeq (, $(shell command -v docker-compose))
	COMPOSE=docker compose
endif

up: ## Start the containers
	$(COMPOSE) up -d && \
	$(PNPM) install --no-frozen-lockfile

down: ## Stop the containers
	$(COMPOSE) down

dev:
	$(PNPM) start:dev

bash:
	$(COMMAND) /bin/bash

clean:
	$(COMMAND) rm -rf node_modules .pnpm-store pnpm-lock.yaml