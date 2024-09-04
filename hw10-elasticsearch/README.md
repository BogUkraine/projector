# Homework #11 for Projector course

Create ES index that will serve autocomplete needs with leveraging typos and errors (max 3 typos if word length is bigger than 7).
Please use english voc. Ang look at google as a ref.

## Setup

1. `docker compose up`
2. `npm i`
3. `node src/create-es-index.js`
4. `node src/fill-es-dictionary` - takes English words, that start with 'A' character.

## Results

```
GET http://localhost:3000/autocomplete?query=astronuat

[
"astronauts",
"astronauts",
"astronauts",
"astronauts",
"astronaut",
"astronaut",
"astronaut",
"astronaut",
"astrolatry",
"astrolatry"
]
```
