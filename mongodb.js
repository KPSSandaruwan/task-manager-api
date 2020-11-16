// CRUD => create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

//Destructuring
const {MongoClient, ObjectID} = require('mongodb')

// const id = new ObjectID() //This is a constructor function
// console.log(id)
// console.log(id.getTimestamp())

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database!')
  }
  // console.log('Connected correctly!')
  const db = client.db(databaseName)
  
  //Inserting Data to the database

  // Inserting just one user
  // db.collection('users').insertOne({
  //   name: 'Gavidu',
  //   age: 22
  // }, (error, result) => { // Callback to check for error
  //   if (error) {
  //     return console.log('Unable to insert user')
  //   }
  //   console.log(result.ops) // To ckeck -> It will display to the conole the data
  // })

  // Insert many
  // db.collection('users').insertMany([
  //   {
  //     name: 'Vikum',
  //     age: 24
  //   }, {
  //     name: 'Lahiru',
  //     age: 26
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert documents!')
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Go to town',
  //     completed: true
  //   }, {
  //     description: 'Clean the room',
  //     completed: false
  //   }, {
  //     description: 'Water plants',
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert tasks')
  //   }
  //   console.log(result.ops)
  // })



  //Finding data in db 
  

  //Finding one by one

  // db.collection('users').findOne({ name: 'Vikum' }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(user)
  // })

  // db.collection('users').findOne({ _id: new ObjectID("5fb26c090a9fdb4d50d47585") }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //   console.log(user)
  // })


  // //Finding many
  // db.collection('users').find({ age: 23 }).toArray((error, users) => {
  //   console.log(users)
  // })

  // db.collection('users').find({ age: 23 }).count((error, count) => {
  //   console.log(count)
  // })


  // db.collection('tasks').findOne({ _id: new ObjectID("5fb2672a9a93d305bcb804f1")}, (error, task) => {
  //   console.log(task)
  // })

  // db.collection('tasks').find({ completed: false }).toArray((error, task) => {
  //   console.log(task)
  // })



  //Update database

  // //Update one by one
  // db.collection('users').updateOne({
  //   _id: new ObjectID("5fb26159afd2c77adc60c7e3")
  // }, {
  //   $set: {
  //     name: 'Ravidu'
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  // //Update many
  // db.collection('tasks').updateMany({
  //   completed: false
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })


  // Delete from database

  // //Delete many
  // db.collection('users').deleteMany({
  //   age: 28
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })


  //Delete one
  db.collection('tasks').deleteOne({
    description: 'Clean the room'
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
})