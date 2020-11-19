require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5fb3d1b47089e6582c0d771b', { age: 24 }).then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 24 })
// }).then((result) => {
//   console.log(result)
// }).catch((e) => {
//   console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('5fb3d1b47089e6582c0d771b', 25).then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})



