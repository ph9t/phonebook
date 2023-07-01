const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('please enter password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ph9t:${password}@an9el.7dvxbvi.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    result.forEach(p => console.log(`${p.name} ${p.number}`))
    mongoose.connection.close()
  })
}
