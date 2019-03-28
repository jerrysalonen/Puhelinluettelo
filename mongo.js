const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give your password as an argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://HYFullStack:${password}@puhelinluettelo-v9zhe.mongodb.net/contacts?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  console.log(`Adding ${person.name} ${person.number} to the database`)

  person.save().then(response => {
    console.log('contact saved!');
    mongoose.connection.close();
  })
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  console.log('Invalid arguments')
  mongoose.connection.close()
  process.exit(1)
}