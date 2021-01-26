const mongoose = require('mongoose')

const url = 'mongodb+srv://fullstack:sareTARE123@cluster0.mwesv.mongodb.net/note-app?retryWrites=true&w=majority'

console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true})
    .then(result => {
        console.log('connected to MongoDb')
    })
    .catch(err => {
        console.log('error at connection: ', err.message)
    })

const noteSchema = new mongoose.Schema({
    content: String, 
    date: Date,
    important: Boolean
})    

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)