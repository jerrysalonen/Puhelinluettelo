if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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
    let count = 0
    Person.find({}).then(results => {
        count = results.length
        res.send(
            `<p>Puhelinluettelossa on ${count} numeroa.<p>
            <p>${Date(Date.now()).toString()}</p>`
        )
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findById(id).then(person => {
        if (person) {
            res.json(person.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id).then(result => {
        res.status(204).end()
    })
    .catch(error => {
        next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save().then(newPerson => {
        res.json(newPerson.toJSON())
    })
    .catch(error => {
        next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
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

    const person = {
        name: body.name,
        number: body.number
    }
    
    Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(newNote => {
        res.json(newNote.toJSON())
    })
    .catch(error => {
        next(error)
    })
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const badIdError = (error, req, res, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({error: 'id not valid'})
    }

    next(error)
}

app.use(badIdError)

const invalidContentError = (error, rew, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    }

    next(error)
}

app.use(invalidContentError)

const errorDefault = (error, req, res) => {
    res.status(500).send({error: "unknown server error"})
}

app.use(errorDefault)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})