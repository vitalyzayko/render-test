const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://vitalyzayko:${password}@learningfullstack.jrspuux.mongodb.net/noteApp?appName=LearningFullstack`

// mongodb+srv://vitalyzayko:<db_password>@learningfullstack.jrspuux.mongodb.net/?appName=LearningFullstack

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

/* const note = new Note({
  content: 'Wanna be free',
  important: true,
})  */

Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

/* note.save().then(result => {
  //console.log("result:", result)
  console.log('note saved!')
  mongoose.connection.close()
}) */