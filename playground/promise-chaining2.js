require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5fb4ab7bb3f8778ea837041e').then((task) => {
//   console.log(task)
//   return Task.countDocuments({ completed: false})
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}

deleteTaskAndCount('5fb3d4193cb3486c5c39dc43').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})