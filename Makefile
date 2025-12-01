####### MAKE VARIABLES #######
MAKEFLAGS += --no-print-directory

COMPOSE = docker compose
COMPOSE_FILE = src/docker-compose.yml

export PATH := /usr/local/bin:/usr/bin:/bin:/sbin:/usr/sbin:$(PATH)

.PHONY: all up down fclean remove re logs stop ps up-service nginx ascii dirs

####### COLORS #######
RED    = \033[0;31m
GREEN  = \033[0;32m
YELLOW = \033[0;33m
CYAN   = \033[0;36m
RESET  = \033[0m

all: up

####### LOADING SYSTEM #######
define pretty_do
	@\
	printf "$(YELLOW)[···]$(RESET) $(1) ...\n"; \
	( \
		while :; do \
			for s in ".  " ".. " "..." "   "; do \
				printf "\r\033[K$(YELLOW)[%s]$(RESET) $(1) ..." "$$s"; \
				sleep 0.3; \
			done \
		done \
	) & \
	SPIN_PID=$$!; \
	{ $(2); } & \
	MAIN_PID=$$!; \
	trap "kill $$SPIN_PID $$MAIN_PID 2>/dev/null; exit 1" INT TERM; \
	wait $$MAIN_PID; \
	RESULT=$$?; \
	kill $$SPIN_PID >/dev/null 2>&1; \
	wait $$SPIN_PID 2>/dev/null; \
	trap - INT TERM; \
	if [ $$RESULT -eq 0 ]; then \
		printf "\r\033[K$(GREEN)[✔] $(1)$(RESET)\n"; \
	else \
		printf "\r\033[K$(RED)[✖] $(1)$(RESET) (Código $$RESULT)\n"; \
		exit $$RESULT; \
	fi
endef

####### MAKEFILE UTILS #######

up: 
	@echo "$(CYAN)2048$(RESET)"
	$(call pretty_do,Levantando contenedor nginx,$(COMPOSE) -f $(COMPOSE_FILE) up --build -d nginx)

down: ascii
	$(call pretty_do,Parando contenedor nginx,$(COMPOSE) -f $(COMPOSE_FILE) down)

fclean: down
	$(call pretty_do,Limpiando volúmenes y sistema,$(COMPOSE) -f $(COMPOSE_FILE) down --volumes --remove-orphans && docker volume prune -f && docker system prune -af)

remove: fclean
	$(call pretty_do,Eliminando imágenes y redes,docker network prune -f && docker rmi $$(docker images -aq) || true)

re: fclean up

####### DOCKER UTILS #######

logs: ascii
	@$(COMPOSE) -f $(COMPOSE_FILE) logs -f

stop: ascii
	$(call pretty_do,Parando nginx,$(COMPOSE) -f $(COMPOSE_FILE) stop)

ps: ascii
	$(call pretty_do,Contenedores activos,docker ps)

####### SERVICES #######

up-service: ascii
	@if [ -z "$(SERVICE)" ]; then \
		echo "$(RED)[✖] Debes especificar SERVICE=nombre$(RESET)"; \
		exit 1; \
	else \
		$(call pretty_do,Levantando servicio $(SERVICE),$(COMPOSE) -f $(COMPOSE_FILE) up --build -d $(SERVICE)); \
	fi

nginx: ascii
	$(call pretty_do,Levantando nginx,$(COMPOSE) -f $(COMPOSE_FILE) up --build -d nginx)
