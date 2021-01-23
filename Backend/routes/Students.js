const router = require("express").Router();
let Student = require("../models/student.model");
router.route("/").get((req, res) => {
  Student.find()
    .then((Students) => {
      res.json(Students);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const studentId = req.body.studentId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const isCovidPositive = req.body.isCovidPositive;
  const teachers = req.body.teachers;
  const classes = req.body.classes;

  const newStudent = new Student({
    studentId,
    firstName,
    lastName,
    email,
    isCovidPositive,
    teachers,
    classes,
  });

  newStudent
    .save()
    .then(() => res.json("Student added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Student.findById(req.params.id)
    .then((request) => res.json(request))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/spread").get((req, res) => {
  Student.find()
    .then((Students) => {
      res.json(Students);
      const data = JSON.stringify(Students);
      console.log(data);
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
