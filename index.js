const express = require("express");
const cors = require('cors')
const logger = require("./logger");
const app = express();


app.use(cors()) //para que no haga problema la app
app.use(express.json()); //la request primero pasa x aca
app.use(logger)


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
    date: "2025-11-2"
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
     date: "2025-1-22"
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
     date: "2025-11-22"
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Testeando express en pagina principal</h1>");
});
app.get("/api/notes", (request, response) => {
  response.json(notes);
});
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id == id);

  console.log({ note });

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id != id);
  response.status(204).end();
});

app.post("/api/notes/", (request, response) => {
  const note = request.body;
  if (!note || !note.content) {
    return response.status(400).json({
      error: "La nota de momento no tiene contenido",
    });
  }

  console.log(note);
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNota = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important != "undefined" ? note.important : false,
    date: new Date().toISOString(),
  };
  notes = [...notes, newNota];
  response.json(newNota);
});

app.use((request,response) =>{
response.status(404).json({
  error: 'No se encontro lo que deseas buscar'
})
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//NOTAS:
//el nodemon se arranca con este comando para verlo en el localhost "dev": "nodemon index.js" PONIENDOLO EN EL PACKAJE JSON. De esta forma se actualiza cada cambio sin tener que cerrar y abrir terminal nueva
// para arrancar la terminal con los cambios de arriba: npm run dev

//para ESLINT: npm install standard -D
//en consola: ./node_modules/.bin/esLint --init y seguirlas opciones

//guardar en packaje.json:
//  "eslintConfig": {
//     "extends": "./node_modules/standard/eslintrc.json"
//   }

//middleware: funcion que intercepta la request que pasa por mi api.
