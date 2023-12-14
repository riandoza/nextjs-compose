# create:
# 	yarn create next-app . --ts --eslint --tailwind --src-dir --app --import-alias --use-yarn

start-dev:
    docker compose up -d

start-prod:
	docker compose -f "docker-compose.prod.yml" up -d --build

restart:
    docker compose restart

stop:
    docker compose down

sharp:
	yarn add sharp
