# Étape 1 : Image de base
FROM node:22-alpine

# Étape 2 : Dossier de travail
WORKDIR /ng-todo-server

# Étape 3 : Copie des fichiers
COPY package*.json ./
RUN npm install

# Étape 4 : Copie du code source
COPY . .

# Déclarer une variable de build (ARG)
ARG APP_DOCKER_PORT

# La rendre accessible au runtime (ENV)
ENV APP_DOCKER_PORT=${APP_DOCKER_PORT}

# Étape 5 : Port exposé
EXPOSE ${APP_DOCKER_PORT}

# Étape 6 : Commande de démarrage
CMD ["npm", "run", "start:prod"]
