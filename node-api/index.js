const express = require("express");

const app = express();

app.use(express.json());

require("./connection");

const Student = require("./models/Student");

const cors = require("cors");
app.use(cors());

//POST METHOD
app.post("/student", async (req, res) => {
  try {
    const student = new Student(req.body);
    const createStudent = await student.save();
    res.status(201).send(createStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET METHOD
app.get("/student", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (e) {
    res.status(400).send(e);
  }
});

//UPDATE METHOD
app.put("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.send(student);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//DELETE METHOD
app.delete("/student/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await Student.findByIdAndDelete(_id, req.body, {
      new: true,
    });
    res.send(student);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
