var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Board'
var ObjectId = Schema.Types.ObjectId

var taskSchema = new Schema({
  title: {type: String},
  author: {type: String},
  description: {type: String, required: true},
  created: { type: Number, required: true, default: Date.now() },
  comment: {type: String},
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  }
})

var listSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String},
  description: {type: String},
  created: { type: Number, required: true, default: Date.now() },
  tasks: [taskSchema],
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  }
})

var boardSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String},
  description: {type: String},
  lists: [listSchema],
  created: { type: Number, required: true, default: Date.now() },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true
  }
})

boardSchema.pre('save', function(next) {
  this.markModified('lists')
  next()
})

listSchema.pre('save', function(next) {
  this.markModified('tasks')
  next()
})


module.exports = mongoose.model(schemaName, boardSchema)