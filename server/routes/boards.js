var router = require('express').Router()
var Boards = require('../models/board')
var Users = require('../models/user')
let session = require('../auth/session')

//get users boards
router.get('/boards', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      Boards.find({
        userId: req.session.uid
      }).then(boards => {
        res.status(200).send(boards)
      }).catch(err => {
        res.status(400).send({ message: 'oh noes no boardz' })
      })
    })
    .catch(err => {
      res.status(401).send({ message: "plz login" })
    })
})
//find board by id
router.get('/board/:id', (req, res) => {
  Users.findById(req.session.uid)
   .then(user => {
     Boards.findById(req.params.id)
      .then(board => {
        res.status(200).send(board)
      })
      .catch(err => {
        res.status(400).send({message: "oh noes no boardz"})
      })
   })
})
//add new boards
router.post('/new-board', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      req.body.userId = req.session.uid
      Boards.create(req.body)
        .then(newBoard => {
          res.status(200).send(newBoard)
        })
        .catch(err => {
          res.status(400).send({ message: "erroz" })
        })
    })
    .catch(err => {
      res.status(401).send({ message: "Plz logz in" })
    })
})
//edit boards
router.put('/board/:id', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      Boards.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
        .then(board => {
          res.status(200).send(board)
        })
        .catch(err => {
          res.send(400).send({ message: "erroz" })
        })
    })
    .catch(err => {
      res.send(401).send({ message: "why no logz in????" })
    })
})
//delete boards
router.delete('/board/:id', (req, res) => {
  Users.findById(req.session.uid)
    .then(user => {
      Boards.findByIdAndRemove(req.params.id)
        .then(data => {
          res.send("itz gonez!!!")
        })
        .catch(err => {
          res.status(400).send({ message: "oh noes it brokez" })
        })
    })
    .catch(err => {
      res.status(400).send({ message: "oh noes it brokez" })
    })
})

module.exports = {
  router
}