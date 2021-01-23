const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  teacherId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  isCovidPositive: { type: Boolean, required: true },
  students: { type: Array, required: true },
  classes: { type: Array, required: true },
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
