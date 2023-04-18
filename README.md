# Projet O'Draw

- ViteJs
- VueJS
- TypeScript
- Websocket

## Typescript

- C'est du Js avec des types
  - Compilé vers du JS : les fichiers TS sont traduits en JS

## Workflow

- Ici notre backend va servir notre front
  - On va intégrer notre "sous projet front VueJS" dans le code du backend, on compile et on sert statiquement
  - => On sert statiquement le résultat du build de notre code front `client/dist/`

- Pour l'instant lorsqu'on fait un `npm run dev` depuis le dossier `client/`, on a un serveur de dev qui nous sert le front.
  - On va venir modifier ça pour que le front soit servit par notre app express
