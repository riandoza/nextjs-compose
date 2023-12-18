# create:
# 	yarn create next-app . --ts --eslint --tailwind --src-dir --app --import-alias --use-yarn

# Development locally
dev:
    yarn dev

# Development inside docker
compose-dev:
    docker compose up -d

# Production inside docker
compose-prod:
	docker compose -f "docker-compose.prod.yml" up -d --build

# Restart docker
compose-restart:
    docker compose restart

# Stop docker
compose-stop:
    docker compose down
