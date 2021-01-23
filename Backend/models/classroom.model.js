const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  classroomId: { type: String, required: true },
  classes: { type: Array, required: true },
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
