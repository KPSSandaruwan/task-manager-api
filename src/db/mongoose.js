const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false //Overcome the deprecation warnings
})







//Instances

// const task = new Task({
//   description: 'Eat dinner'
// })

// task.save().then(() => {
//   console.log(task)
// }).catch((error) => {
//   console.log(error)
// })


// const me = new User({
//   name: '  Sandarwan  ',
//   email: 'San@gmail.com  ',
//   password: 'phone098!',
//   age: 24
// })

// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log('Error!', error)
// })