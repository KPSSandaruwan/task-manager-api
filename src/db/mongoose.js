const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
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