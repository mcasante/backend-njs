# Backend

## Overview

A backend application built with NestJS, TypeScript, and MySQL, using Docker for containerization and Makefile for task automation.

## Prerequisites

- **Node.js** v16.x or higher
- **pnpm** v8.x or higher
- **Docker** v20.x or higher
- **Make** (for using the Makefile)

<!-- # Setup -->

## Installation

```bash
# Copy the .env.example to .env
$ cp .env.example .env

# Start container & install dependencies
$ make up

# Stop container
$ make down
```

## Running the app

```bash
make dev
```

## Tests

```bash
# Run unit tests
make test-unit

# Generate code coverage report
make test-cov
```

## Other Make Commands

```bash
# Format code
make format

# Clean up node_modules and related files
make clean

# Enter the container bash
make bash
```

## Test Coverage

```ls
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |     100 |      100 |     100 |     100 |
 order                 |     100 |      100 |     100 |     100 |
  order.controller.ts  |     100 |      100 |     100 |     100 |
  order.service.ts     |     100 |      100 |     100 |     100 |
 seed                  |     100 |      100 |     100 |     100 |
  seed.service.ts      |     100 |      100 |     100 |     100 |
 seller                |     100 |      100 |     100 |     100 |
  seller.controller.ts |     100 |      100 |     100 |     100 |
  seller.service.ts    |     100 |      100 |     100 |     100 |
-----------------------|---------|----------|---------|---------|-------------------
```
