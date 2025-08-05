# Étape 1 : build Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers nécessaires pour le build
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Étape 2 : serveur nginx
FROM nginx:stable-alpine

# Supprimer la config par défaut de NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés d'Angular vers nginx
COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html

# Copier une config nginx personnalisée (optionnel)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
