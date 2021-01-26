const mongoose = require('mongoose')


if(process.argv.length < 3 ){
   console.log('Please provide a valid process command')
   process.exit()
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.mwesv.mongodb.net/phone-book?retryWrites=true&w=majority`



mongoose.connect(url, {useNewParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const phoneBookEntrySchema = new mongoose.Schema({
    name: String, 
    phoneNumber: String
})

const PhoneBookEntry = mongoose.model('PhoneBookEntry', phoneBookEntrySchema) 

if(process.argv.length === 5){
    const name = process.argv[3]
    const phoneNumber = process.argv[4]

    const newEntry = new PhoneBookEntry({
        name: name,
        phoneNumber: phoneNumber
    })

    newEntry.save().then(response => {
        console.log('new phone entry added')

        mongoose.connection.close()
    })
} else {
    PhoneBookEntry.find({}).then(result => {
        result.forEach(p => console.log(p))
        mongoose.connection.close()
    })
}