# Next.js 15 Application Makefile
# Development and deployment commands for Docker Compose setup

.PHONY: help dev build test clean install setup compose-dev compose-prod compose-restart compose-stop compose-logs compose-shell db-migrate db-seed db-studio lint format

# Default target
help: ## Show this help message
	@echo "Next.js 15 Application Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development Commands
dev: ## Start development server locally
	yarn dev

install: ## Install dependencies
	yarn install

setup: ## Initial project setup (install deps, generate prisma, seed db)
	yarn install
	yarn db:generate
	yarn db:push
	yarn db:seed

build: ## Build the application
	yarn build

test: ## Run tests
	yarn test

lint: ## Run ESLint
	yarn lint

format: ## Format code with Prettier
	yarn format:fix

clean: ## Clean build artifacts and dependencies
	rm -rf .next out build dist node_modules .yarn/cache .eslintcache *.tsbuildinfo

# Docker Commands
compose-dev: ## Start development environment with Docker Compose
	docker compose up -d

compose-prod: ## Start production environment with Docker Compose
	docker compose -f "docker-compose.prod.yml" up -d --build

compose-restart: ## Restart Docker containers
	docker compose restart

compose-stop: ## Stop Docker containers
	docker compose down

compose-logs: ## View Docker container logs
	docker compose logs -f

compose-shell: ## Open shell in the app container
	docker compose exec app sh

compose-clean: ## Remove all containers, networks, and volumes
	docker compose down -v --remove-orphans
	docker system prune -f

# Database Commands
db-migrate: ## Run Prisma migrations
	yarn db:migrate

db-seed: ## Seed the database
	yarn db:seed


db-reset: ## Reset database (migrate + seed)
	yarn db:push
	yarn db:seed

# Quality Commands
check: ## Run all quality checks (lint, build, test)
	yarn lint
	yarn build
	yarn test

# Deployment Commands
deploy-dev: compose-dev ## Deploy to development environment

deploy-prod: compose-prod ## Deploy to production environment
