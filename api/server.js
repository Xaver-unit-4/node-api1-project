// BUILD YOUR SERVER HERE
const express = require('express')

const db = require("./users/model")

const server = express()

server.use(express.json())

server.get("/", (req,res) => {
  res.json({message: "My message on the webpage"})
})

server.post("/api/users", async (req, res) => {
  const newUser = await db.insert({
    id: req.body.id,
    name: req.body.name,
    bio: req.body.bio,
  })
  console.log(newUser)
  res.json(newUser)
})


server.get("/api/users", (req, res) => {
  db.find().then(users => {
    res.json(users)
  })
})

server.get("/api/users/:id", async (req, res) => {
  const user = await db.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      message: "check user ID",
    })
  }
})

server.delete("/api/users/:id", async (req, res) => {
  const user = await db.findById(req.params.id)

  if (user) {
    db.remove(user.id)
    res.status(200).json({
      message: "The user was deleted"
    });
  } else {
    res.status(404).json({
      message: "user not found"
    })
  }
})

server.put("/api/users/:id", async (req, res) => {
  const user = await db.update((req.params.id))

  if (user) {
    const updatedUser = db.update(user.id, {
      id: req.body.id || user.id,
      name: req.body.name || user.name,
      bio: req.body.bio || user.bio 
    })
    // res.status(204).json({
    //   message: "User name and bio updated"
    // })
    res.json(updatedUser)
    
  } else {
    res.status(404).json({
  message: "user not found"
  })  
  }
})

module.exports = server // EXPORT YOUR SERVER instead of {}
