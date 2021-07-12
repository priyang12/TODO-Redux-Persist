const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const TaskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    Title: {
      type: String,
      required: true,
    },
    Deadline: {
      type: String,
      required: true,
    },
    Imporantancy: {
      type: String,
      required: true,
    },
    TaskDescription: {
      type: String,
      required: true,
    },
    Status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', TaskSchema);
