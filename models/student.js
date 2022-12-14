const { Schema, model } = require('mongoose');
const joi = require('joi');

module.exports.Student = model('Student', Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    sid: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "active"
    }
}, { timestamps: true }));

module.exports.validate = student => {
    const schema = joi.object({
        name: joi.string().required().min(5).max(255),
        email: joi.string().required().min(5).max(255).email(),
        phone: joi.number().required(),
        sid: joi.number().required()
    });
    return schema.validate(student, {abortEarly: false});
}