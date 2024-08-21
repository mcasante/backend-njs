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

# Install dependencies
$ pnpm install # or npm install

# Start container
$ make up
```

## Running the app

```bash
# # Start the development server
make dev

# The app will be running at http://localhost:4000
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
# Stop container
$ make down

# Format code
make format

# Clean up node_modules and related files
make clean

# Enter the container bash
make bash
```

## API Reference

#### Get all sellers

```http
GET /api/sellers
```

#### Get all orders

```http
GET /api/orders
```

| Parameter   | Type         | Description                                                  | Default     |
| :---------- | :----------- | :----------------------------------------------------------- | :---------- |
| `page`      | `number`     | Page number for pagination.                                  | `1`         |
| `limit`     | `number`     | Number of orders per page.                                   | `10`        |
| `sort`      | `SortFields` | Field to sort by                                             | `orderId`   |
| `order`     | `string`     | Sort order, either `asc` (ascending) or `desc` (descending). | `asc`       |
| `sellerIds` | `string`     | Comma-separated list of seller IDs to filter by.             | `undefined` |

`SortFields`: `orderId`, `product`, `seller.name`, `country`, `price`.

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
