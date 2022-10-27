const router = require('express').Router();
const { createStudent, getStudents, studentDetails, updateStudent, deleteStudent, studentStatus, sortStudents } = require('../controllers/studentController');

router.route('/')
    .get(getStudents)
    .post(createStudent);

router.route('/:id')
    .get(studentDetails)
    .put(updateStudent)
    .delete(deleteStudent);

router.route('/status/:id')
    .put(studentStatus);

router.route('/sort/:status')
    .get(sortStudents);

module.exports = router;