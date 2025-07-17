Pour démarrer le projet :
Exécuter la commande npm install pour installer les dépendances.

Créer un fichier .env à la racine du projet contenant la variable DATABASE_URL avec les informations de connexion à la base de données et JWT_SECRET  avec  la clé secrète

Lancer la commande npx prisma migrate dev --name init pour générer la base de données à partir du schéma Prisma.

Lancer le projet : node index.js


Choix techniques : 
Next.js : utilisé pour le frontend, il permet de créer des interfaces web modernes avec rendu côté serveur.

Node.js : utilisé pour le backend, il gère la logique serveur et les routes API de manière rapide et asynchrone.

MySQL : utilisé comme base de données relationnelle pour stocker et organiser les données de manière structurée.





Architecture back end (MVC) : 

mon-projet/
├── README.md
├── index.js
├── package.json
├── package-lock.json
├── middlewares/
├── controllers/
├── prisma/
├── routers/
├── utils/
├── node_modules/






