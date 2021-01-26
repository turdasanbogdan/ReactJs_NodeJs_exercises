const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an arg : node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.mwesv.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url , {useNewParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const noteSchema = new mongoose.Schema({
    content: String, 
    date: Date,
    important : Boolean,
})  

const Note = mongoose.model('Note', noteSchema)

// const note = new Note(
//     {
//         content: 'Callback-functions sucks',
//         date: new Date(),
//         important: true
//     }
// )

// note.save().then(result => {
//     console.log('note saved !')
//     mongoose.connection.close()
// })

Note.find({}).then(result => 
    {
        result.forEach(n => {
            console.log(n)
        })
    mongoose.connection.close()
    })