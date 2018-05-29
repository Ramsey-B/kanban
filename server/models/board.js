var mongoose = require('mongoose')
var Schema = mongoose.Schema
var schemaName = 'Board'
var ObjectId = Schema.Types.ObjectId

var taskSchema = new Schema({
  title: {type: String},
  author: {type: String},
  description: {type: String, required: true}
})

var listSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String},
  description: {type: String},
  tasks: [taskSchema]
})

var boardSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String},
  description: {type: String},
  lists: [listSchema],
  userId: {
    type: ObjectId,
    ref: "user",
    required: true
  }
})

boardSchema.pre('save', function(next) {
  this.markModified('songs')
  next()
})

module.exports = mongoose.model(schemaName, boardSchema)