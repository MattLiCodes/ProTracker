const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  isCovidPositive: { type: Boolean, required: true },
  DOC: { type: String, required: true },
  teachers: { type: Array, required: true },
  classes: { type: Array, required: true },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
