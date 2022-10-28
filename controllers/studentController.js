const { Student, validate } = require('../models/student');
const _ = require('lodash');

module.exports.createStudent = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            error.details.forEach(err => {
                err[`${err.context.key}`] = err.message + "!";
                delete err.message;
                delete err.path;
                delete err.type;
                delete err.context;
            });
            const [name, email, phone, sid] = error.details;
            const Error = {...name, ...email, ...phone, ...sid};
            return res.status(400).send(Error);
        } else {
            let student = await Student.findOne({ email: req.body.email });
            if (student) {
                return res.status(400).send({ message: "Student already taken!" });
            } else {
                student = new Student(req.body);
                const result = await student.save();
                return res.status(201).send({
                    message: "Student created successfully",
                    data: result
                });
            }
        }
    } catch (error) {
        return res.status(400).send({ message: "Student created failed!" });
    }
}

module.exports.getStudents = async (req, res) => {
    try {
        if (await Student.count() > 0) {
            const students = await Student.find();
            return res.status(200).send(students);
        } else {
            return res.status(200).send({ message: "No student available!" });
        }
    } catch (error) {
        return res.status(400).send({ message: "Failed to fetch students!" });
    }
}

module.exports.studentDetails = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        return res.status(200).send(student);
    } catch (error) {
        return res.status(400).send({ message: "Failed to fetch student details!" });
    }
}

module.exports.updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findByIdAndUpdate(studentId, req.body, {new: true});
        return res.status(200).send({ message: "Student updated successfully" });
    } catch (error) {
        return res.status(400).send({ message: "Student updated failed!" });
    }
}

module.exports.deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findByIdAndDelete(studentId);
        return res.status(200).send({ message: "Student deleted successfully" });
    } catch (error) {
        return res.status(400).send({ message: "Student deleted failed!" });
    }
}

module.exports.studentStatus = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId);
        if (student.status === "active") {
            await Student.findByIdAndUpdate(studentId, {status: "deactive"});
            return res.status(200).send({ message: "Status updated successfully!" });
        } else {
            await Student.findByIdAndUpdate(studentId, {status: "active"});
            return res.status(200).send({ message: "Status updated successfully!" });
        }
    } catch (error) {
        return  res.status(400).send({ message: "Status updated failed!" });
    }
}

module.exports.sortStudents = async (req, res) => {
    try {
        const status = req.params.status;
        if (req.params.status == "active" || req.params.status == "deactive") {
            if (await Student.find({status: status}).count() > 0) {
                const students = await Student.find({status: status});
                return res.status(200).send(students);
            } else {
                return res.status(400).send({ message: "No student available!" });
            }
        } else {
            return res.status(400).send({ message: "No student available!" });
        }
    } catch (error) {
        return res.status(400).send({ message: "Failed to fetch students!" });
    }
}