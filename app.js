const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys/index')
const app = express()
const favicon = require('express-favicon');
const fileMiddleware = require('./middleware/file')
const PORT = keys.PORT || 5000
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')


app.use(favicon(__dirname + '/client/build/favicon.ico'))
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(fileMiddleware.single('avatar'))
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',require('./routes/auth.route'))
app.use('/users',require('./routes/users.route'))
app.use('/users',require('./routes/create.route'))
app.use('/users/:id',require('./routes/userEdit.route'))
app.use('/profile',require('./routes/profile.route'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


async function start(){
    try{
        await mongoose.connect(keys.MONGO_URI,{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=> {
            console.log(`server running on ${PORT}`)
        })
    }catch(e){
        console.log(e)
        process.exit(1)
    }
}

start()
