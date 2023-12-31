const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`Connecting to MongoDB: ${process.env.MONGODB_URI}`)

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then(result => {
    console.log('connected to MongoDB Atlas database')
  })
  .catch(error => {
    console.log('Failed to connect to DB', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true, // shadowed
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^[0-9]{2,3}-[0-9]{2,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
