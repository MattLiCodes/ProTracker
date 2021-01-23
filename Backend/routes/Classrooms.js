const router = require("express").Router();
let Classroom = require("../models/classroom.model");

router.route("/").get((req, res) => {
  Classroom.find()
    .then((Classrooms) => res.json(Classrooms))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const classroomId = req.body.classroomId;
  const classes = req.body.classes;

  const newClassroom = new Classroom({
    classroomId,
    classes,
  });

  newClassroom
    .save()
    .then(() => res.json("Classroom added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
