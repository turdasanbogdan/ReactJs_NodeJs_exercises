require('dotenv').config()
const { response, request } = require('express')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(cors())


app.get('/', (request, response) => {
    Note.find({}).then(note => {
        response.json(note)
    })
})

app.get('/api/notes', (request, response) => {
   Note.find({}).then(note => {
       response.json(note)
   })
})



app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        if(note){
            response.json(note)
        }else{
            response.status(404).end()
        }  
    }) 
    .catch(err=> {
        console.log(err)
        next(err)
    })
})


app.delete('/api/notes/:id', (request, response) => {
    Note.deleteOne({"_id": mongoose.Types.ObjectId(request.params.id)}).then( resp => {
        console.log('deleted')
        response.json(resp)  
    })
   
})

app.post('/api/notes', (request, response)=> {
    const body = request.body

    if(body === undefined){
        return response.status(400).json({error: 'content missing'})
    }

    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response) => {
    
   const body = request.body

   const note = {
       content: body.content,
       important: body.important
   }

   Note.findByIdAndUpdate(request.params.id, note, {new : true})
   .then(updatedNote => {
       response.json(updatedNote)
   })
   .catch(err => {
       next(err)
   })

})


const unknownEndpoint = (request , response) => {
    response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    
    return response.status(400).send({ error: 'malformed id' })
    

    next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})