const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const personSchema = new Schema({
	firstname: {
    type:String,
    trim:true,
    required: true
  },
	lastname: {
    type:String,
    trim:true,
    required: true
  },
	age: {
    type:Number,
    required: true
  },
	gender: {
    type:String,
    trim:true,
    required: true
  },
  date: {
   type: Date,
   default: Date.now
  }
});

module.exports = person = mongoose.model('person', personSchema);
