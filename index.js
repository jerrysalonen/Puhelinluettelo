require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Martti Tienari",
        "number": "040-123456",
        "id": 2
    },
    {
        "name": "Arto Järvinen",
        "number": "040-123456",
        "id": 3
    },
    {
        "name": "Lea Kutvonen",
        "number": "040-123456",
        "id": 4
    },
    {
        "name": "Santeri Tenhunen",
        "number": "2424",
        "id": 6
    },
    {
        "name": "Jerry Salonen",
        "number": "2222222",
        "id": 7
    }
]

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan((tokens, req, res) => {
    morgan.token('data', ((req, res) => { return JSON.stringify(req.body) }))
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.data(req, res)
    ].join(' ')
}))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Puhelinluettelossa on ${persons.length} numeroa.<p>
        <p>${Date(Date.now()).toString()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (person) {
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        res.status(404)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name not sepecified'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number not sepecified'
        })
    } else if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'content not specified'
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save().then(newPerson => {
        res.json(newPerson.toJSON())
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})