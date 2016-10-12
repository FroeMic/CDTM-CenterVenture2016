var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  birthday:  {
    type: Date,
    weight: 2
  }
  gender: {
    type: String,
    enum: ['m', 'w', 'wm'],
    default: 'w',
  },
  occupation: String,
  nightowl: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 2
  },
  guests: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 2
  },
  party: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 3
  },
  music: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 2
  },
  smoke: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 3
  },
  mates: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 3
  },
  privacy: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 3
  },
  sharing: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 3
  },
  Me: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  kitchen: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 3
  },
  hardworking: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  tidy: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 2
  },
  cold: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  considerate: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  helpless: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 2
  },
  stressed: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  literature: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  philosophy: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  people: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 1
  },
  happy: {
    type: Number,
    enum: [1,2,3,4,5],
    weight: 2
  },

});

module.exports = mongoose.model('PersonalityProfile', schema);
