//const http = require('http')

require("dotenv").config()

const express = require('express')
const app = express()
const Note = require("./models/note")
//const cors = require("cors")

app.use(express.static('dist'))

app.use(express.json())

//app.use(cors())



/* let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  },
  {    id: "4",
    content: "Express is a framework for building web applications in Node.js",
    important: true
  },
  {    id: "5",
    content: "JavaScript is single-threaded",
    important: false
  },
  {    id: "6",
    content: "TypeScript is a superset of JavaScript",
    important: true
  },
  {    id: "7",
    content: "React is a library for building user interfaces",
    important: true
  }

] */

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })

  /* 
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  } */
})

app.delete('/api/notes/:id', (request, response) => {
  
  Note.findByIdAndDelete(request.params.id).then(note => {
    response.json(note)
  })

  
  
  //const id = request.params.id
  //notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

/* const generateId = () => {
  const maxID = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return String(maxID + 1)
} */

app.post('/api/notes', (request, response) => {
  const body = request.body
  
  if (!body.content) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


//const PORT = 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


