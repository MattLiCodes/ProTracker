const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let Student = require("../Backend/models/student.model");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(require('body-parser').json());

const uri = "mongodb+srv://averma:BmcnAM91iAtXBi3b@hackcovid.fqrea.mongodb.net/Tracing?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const studentsRouter = require("./routes/students");
const teachersRouter = require("./routes/teachers");
const classesRouter = require("./routes/classes");
const classroomsRouter = require("./routes/classrooms");

app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);
app.use("/classes", classesRouter);
app.use("/classrooms", classroomsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
