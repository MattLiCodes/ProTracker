const router = require("express").Router();
let Teacher = require("../models/teacher.model");

router.route("/").get((req, res) => {
  Teacher.find()
    .then((Teachers) => res.json(Teachers))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const teacherId = req.body.teacherId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const isCovidPositive = req.body.isCovidPositive;
  const DOC = req.body.DOC;
  const students = req.body.teachers;
  const classes = req.body.classes;

  const newTeacher = new Teacher({
    teacherId,
    firstName,
    lastName,
    email,
    isCovidPositive,
    DOC,
    students,
    classes,
  });

  newTeacher
    .save()
    .then(() => res.json("Teacher added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
