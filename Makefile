.PHONY: api-client dev down test

dev:
	docker compose up --build

down:
	docker compose down

api-client:
	docker compose run --rm --no-deps api python -m sigait_api.export_openapi > docs/api/openapi.json
	pnpm api-client:generate

test:
	docker compose run --rm --no-deps api pytest
	docker compose run --rm --no-deps api ruff check .
	docker compose run --rm --no-deps api pyright src
	pnpm --filter web lint
	pnpm --filter web typecheck
	pnpm --filter web test
	pnpm --filter web build
