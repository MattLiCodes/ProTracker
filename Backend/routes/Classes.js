const router = require("express").Router();
let Class = require("../models/class.model");

router.route("/").get((req, res) => {
  Class.find()
    .then((Classes) => res.json(Classes))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const classId = req.body.classId;
  const className = req.body.className;
  const students = req.body.students;
  const teachers = req.body.teachers;

  const newClass = new Class({
    classId,
    className,
    students,
    teachers,
  });

  newClass
    .save()
    .then(() => res.json("Class added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
