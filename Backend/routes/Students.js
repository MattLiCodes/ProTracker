const router = require("express").Router();
let Student = require("../models/student.model");
let Teacher = require("../models/teacher.model");
let Class = require("../models/class.model");
const mongoose = require("mongoose");

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
  const DOC = req.body.DOC;
  const teachers = req.body.teachers;
  const classes = req.body.classes;

  const newStudent = new Student({
    studentId,
    firstName,
    lastName,
    email,
    isCovidPositive,
    DOC,
    teachers,
    classes,
  });

  newStudent
    .save()
    .then(() => res.json("Student added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/updateCovid").post((req, res) => {
  // Student.update({ "studentId": req.body.studentId },{ isCovidPositive: true, DOC: 0 });
  Student.findById(req.body.id)
    .then((request) => {
      res.json(request);
      const data = request;
      const classes = data["classes"];
      for (let j = 0; j < classes.length; j++) {
        Class.find({ classId: classes[j]["classId"] }).then((response) => {
          const students = response[0];
          for (let k = 0; k < students["students"].length; k++) {
            Student.update(
              {
                studentId: students["students"][k]["studentId"],
                DOC: { $gt: 0 },
              },
              { DOC: 1 },
              function (err, docs) {
                if (err) {
                  console.log(err);
                } else {
                  // console.log("Updated Docs: ", docs);
                }
              }
            );
            Student.find({
              studentId: students["students"][k]["studentId"],
            }).then((res) => {
              const classess = res[0]["classes"];
              for (let i = 0; i < classess.length; i++) {
                Class.find({ classId: classess[i]["classId"] }).then(
                  (result) => {
                    const studs = result[0];
                    for (let j = 0; j < studs["students"].length; j++) {
                      Student.update(
                        {
                          studentId: studs["students"][j]["studentId"],
                          DOC: { $gt: 1 },
                        },
                        { DOC: 2 },
                        function (err, docs) {
                          if (err) {
                            console.log(err);
                          } else {
                            // console.log("Updated Docs: ", docs);
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          }
        });
      }
      const teachers = data["teachers"];
      for (let i = 0; i < teachers.length; i++) {
        Teacher.update(
          { teacherId: teachers[i].teacherId, DOC: { $gt: 0 } },
          { DOC: 1 },
          function (err, docs) {
            if (err) {
              console.log(err);
            } else {
              // console.log("Updated Docs: ", docs);
            }
          }
        );
        Teacher.find({
          teacherId: teachers[i]["teacherId"],
        }).then((res) => {
          const classess = res[0]["classes"];
          for (let i = 0; i < classess.length; i++) {
            Class.find({ classId: classess[i]["classId"] }).then((result) => {
              const studs = result[0];
              for (let j = 0; j < studs["students"].length; j++) {
                Student.update(
                  {
                    studentId: studs["students"][j]["studentId"],
                    DOC: { $gt: 1 },
                  },
                  { DOC: 2 },
                  function (err, docs) {
                    if (err) {
                      console.log(err);
                    } else {
                      // console.log("Updated Docs: ", docs);
                    }
                  }
                );
                Student.find({
                  studentId: studs["students"][j]["studentId"],
                }).then((result) => {
                  const studs = result[0];
                  const teachers = studs["teachers"];
                  for (let i = 0; i < teachers.length; i++) {
                    Teacher.update(
                      { teacherId: teachers[i].teacherId, DOC: { $gt: 1 } },
                      { DOC: 2 },
                      function (err, docs) {
                        if (err) {
                          console.log(err);
                        } else {
                          // console.log("Updated Docs: ", docs);
                        }
                      }
                    );
                    Teacher.find({
                      teacherId: teachers[i]["teacherId"],
                    }).then((res) => {
                      const classess = res[0]["classes"];
                      for (let i = 0; i < classess.length; i++) {
                        Class.find({ classId: classess[i]["classId"] }).then(
                          (result) => {
                            const studs = result[0];
                            for (let j = 0; j < studs["students"].length; j++) {
                              Student.update(
                                {
                                  studentId: studs["students"][j]["studentId"],
                                  DOC: { $gt: 2 },
                                },
                                { DOC: 3 },
                                function (err, docs) {
                                  if (err) {
                                    console.log(err);
                                  } else {
                                    console.log("Updated Docs: ", docs);
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    })
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/getStudents/getOne").post((req, res) => {
  Student.findOne({'firstName': req.body.name}).then((student) => {
    res.send(student);
  });
});

router.route('/login').post((req, res) => {
  Student.findOne({'firstName': req.body.name}).then((student) => {
    if(student !== null && student !== undefined) res.sendStatus(200);
    else res.sendStatus(403);
  }).catch((err) => {
    res.sendStatus(403);
  })
});

module.exports = router;
