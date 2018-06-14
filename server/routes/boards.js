var router = require('express').Router()
var Boards = require('../models/board')
var Users = require('../models/user')
let session = require('../auth/session')

//get users boards
router.get('/boards', (req, res) => {
  Boards.find({
    userId: req.session.uid
  }).then(boards => {
    res.status(200).send(boards)
  }).catch(err => {
    res.status(400).send({ message: 'oh noes no boardz', err })
  })
})

//find board by id
router.get('/board/:id', (req, res) => {
  Boards.findById(req.params.id)
    .then(board => {
      res.status(200).send(board)
    })
    .catch(err => {
      res.status(400).send({ message: "oh noes no boardz", err })
    })
})
//add new boards
router.post('/board', (req, res) => {
  req.body.userId = req.session.uid
  Boards.create(req.body)
    .then(newBoard => {
      res.status(200).send(newBoard)
    })
    .catch(err => {
      res.status(400).send({ message: "erroz", err })
    })
})

//edit boards
router.put('/board/:id', (req, res) => {
  Boards.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(board => {
      res.status(200).send(board)
    })
    .catch(err => {
      res.send(400).send({ message: "erroz", err })
    })
})


//add single list to board
router.put('/board/:id/list/', (req, res) => {
  Boards.findById(req.params.id)
    .then(board => {
      board.lists.addToSet(req.body)
      board.save().then(newBoard => {
        var test = newBoard
        res.status(200).send(newBoard)
      }).catch(err => {
        res.status(500).send({ message: "erroz", err })
      })
    })
    .catch(err => {
      res.status(400).send({ message: "erroz", err })
    })
})

//add single task to board
router.put('/board/:id/list/:listId/task/', (req, res) => {
  Boards.findById(req.params.id)
    .then(board => {
      var list = board.lists.id(req.params.listId)
      list.tasks.addToSet(req.body)
      board.save().then(newBoard => {
        res.status(200).send(newBoard)
      })
        .catch(err => {
          res.send(400).send({ message: "erroz", err })
        })
    })
    .catch(err => {
      res.send(400).send({ message: "erroz", err })
    })
})
//delete boards
router.delete('/board/:id', (req, res) => {
  Boards.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send("itz gonez!!!")
    })
    .catch(err => {
      res.status(400).send({ message: "oh noes it brokez", err })
    })
})
//delete list
router.delete('/board/:id/list/:listId', (req, res) => {
  Boards.findById(req.params.id)
    .then(board => {
      var index = board.lists.findIndex(list => {
        return list.id == req.params.listId
      })
      board.lists.splice(index, 1)
      board.save().then(newBoard => {
        res.status(200).send(newBoard)
      })
        .catch(err => {
          res.status(500).send({ message: "oh noes it brokez", err })
        })
    })
    .catch(err => {
      res.status(400).send({ message: "oh noes it brokez", err })
    })
})

router.delete('/board/:id/list/:listId/task/:taskId', (req, res) => {
  Boards.findById(req.params.id)
    .then(board => {
      var list = board.lists.id(req.params.listId)
      var index = list.tasks.findIndex(task => {
        return task.id == req.params.taskId
      })
      list.tasks.splice(index, 1)
      board.save().then(newBoard => {
        res.status(200).send(newBoard)
      })
    })
    .catch(err => {
      res.status(400).send({ message: "oh noes it brokez", err })
    })
})

router.delete('/end-demo/:id', (req, res) => {
  Boards.deleteMany({ "userId": req.params.id })
    .then(data => {
      req.session.destroy(() => {
        res.send({
          message: 'You have successfully been logged out. Please come back soon!'
        })
    
      })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = {
  router
}