.PHONY: web
web:
	./scripts/start_web_dev.sh

.PHONY: api
api:
	./scripts/start_api.sh

.PHONY: styler
styler:
	./scripts/start_styler.sh
