const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let bookma = {
  persons: [
    {
      name: "Dolan Choo",
      number: "True... yeah...",
      id: 2
    },
    {
      name: "Okra Laue",
      number: "BIG TIDDY BUNNY HHHNGGGGGGAAAAAA-",
      id: 3
    },
    {
      name: "No run wrong",
      number: "What's up gamers.",
      id: 4
    },
    {
      name: "asdf",
      number: "asdf",
      id: 5
    }
  ]
}

app.get('/', (request, response) => {
  response.send('<h1>Welcome to Gaymerbooke!</h1>')
})

app.get('/api/bookma', (request, response) => {
  response.json(bookma.persons)
})

app.get('/api/bookma/:id', (request, response) => {
  const id = Number(request.params.id)
  const guy = bookma.persons.find(x => x.id === id)

  if (guy) {
    response.json(guy)
      } else {
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = bookma.persons.length > 0
    ? Math.max(...bookma.persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/bookma', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'quote missing'
    })
  }

  const guy = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  bookma.persons = bookma.persons.concat(guy)

  response.json(guy)
})

app.delete('/api/bookma/:id', (request, response) => {
  const id = Number(request.params.id)
  bookma.persons = bookma.persons.filter(x => x.id !== id)
  console.log(bookma)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
