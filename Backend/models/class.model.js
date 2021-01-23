const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
  classId: { type: String, required: true },
  className: { type: String, required: true },
  students: { type: Array, required: true },
  teachers: { type: Array, required: true },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
