# Utiliser une image Node.js comme base
FROM node:14-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (le cas échéant)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu du répertoire local dans le répertoire de travail du conteneur
COPY . .

# Construire l'application React pour la production
RUN npm run build

# Exposer le port 3000 sur le conteneur
EXPOSE 3000

# Commande par défaut pour démarrer l'application React
CMD ["npm", "start"]
