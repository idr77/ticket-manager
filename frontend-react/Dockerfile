FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Installer serve globalement
RUN npm install -g serve

EXPOSE 3000

# Démarrer l'application
CMD ["serve", "-s", "build", "-l", "3000"]