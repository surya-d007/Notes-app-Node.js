const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  email: String,
  notes: [
    {
      content: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const NoteModel = mongoose.model('user_notes', noteSchema);

module.exports = NoteModel;
