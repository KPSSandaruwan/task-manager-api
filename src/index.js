const express = require('express')
const { update } = require('./models/task')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//Setting up the middleware
//Why should it come first?

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next() // To let know the middleware that things are okay and can go further
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down. Check back soon!')
// })


//Configuring express to parse the json
app.use(express.json())

app.use(userRouter)
app.use(taskRouter)


//
//Without middleware: new request -> run route handler
//
//With middleware: new request -> do something -> run route handler
//


app.listen(port, () => {
  console.log('Server is up on port ' + port)
})



const jwt = require('jsonwebtoken')
const myFunction = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse')
  console.log(token)

  const data = jwt.verify(token, 'thisismynewcourse')
  console.log(data)
}

myFunction()