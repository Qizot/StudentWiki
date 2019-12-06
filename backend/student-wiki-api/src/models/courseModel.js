import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        match: /https?:[/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ects: {
        type: Number,
        min: 1,
        max: 30,
        required: true
    },
    semester: {
        type: Number,
        min: 1,
        max: 9,
        required: true
    },
    courseForm: {
        type: String,
        enum: [
            "Lecture",
            "Project",
            "Lab",
            "Excercise"
        ],
        required: true
    },
    maxStudents: {
        type: Number,
        required: true
    },
    ratings: [
        {
            studentId: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true
            }
        }
    ],
    enrolledStudents: [{
        type: String,
        unique: true
    }]
});



const Course = mongoose.model('Course', courseSchema);


export default Course;