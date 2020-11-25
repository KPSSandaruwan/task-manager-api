const express = require('express')
const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

// router.get('/test', (req, res) => {
//   res.send('From a new file')
// })


//User model (Creating data)
router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    //Using await
    await user.save()
    //sending welcome email
    sendWelcomeEmail(user.email, user.name)
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
  
  // user.save().then(() => {
  //   res.status(201).send(user)
  // }).catch((e) => {
  //   res.status(400).send(e)
  // })
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    //Using tokens
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})


router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

// //Fetching multiple users (Read data)
// router.get('/users', auth, async (req, res) => {
//   try {
//     const users = await User.find({})
//     res.send(users)
//   } catch (e) {
//     res.status(500).send()
//   }

//   // User.find({}).then((users) => {
//   //   res.send(users)
//   // }).catch((e) => {
//   //   res.status(500).send()
//   // })
// })

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})


//Updating indvidual by ID
//Old one
// router.patch('/users/:id', async (req, res) => {
//   const updates = Object.keys(req.body)
//   //What user allowed to update
//   const allowedUpdates = ['name', 'email', 'password', 'age']
  
//   //Using every
//   //every -> It will give true if all the things are valid otherwise false
//   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' })
//   }

//   try {
//     const user = await User.findById(req.params.id)
//     updates.forEach((update) => user[update] = req.body[update])
//     await user.save()

//     // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//     if (!user) {
//       return res.status(404).send()
//     }
//     res.send(user)
//   } catch (e) {
//     res.status(400).send(e)
//   }
// })

//Updating User
//New one
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  //What user allowed to update
  const allowedUpdates = ['name', 'email', 'password', 'age']
  
  //Using every
  //every -> It will give true if all the things are valid otherwise false
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//Deleting from the database
router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)
    // if (!user) {
    //   return res.status(404).send()
    // }

    await req.user.remove()
    //Sending email for deliting the account
    sendCancelationEmail(req.user.email, req.user.name)
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

// Configuring multar
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))  { //regular expressions
      return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
  }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  // This syntax is needed otherwise express doesn't know this is a error handler
  res.status(400).send({ error: error.message })
})


router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined
  await req.user.save()
  res.send()
})


router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user || !user.avatar) {
      throw new Error()
    }
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (e) {
    res.status(404).send()
  }
})

module.exports = router