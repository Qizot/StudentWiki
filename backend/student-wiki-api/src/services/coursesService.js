import Course from "../models/courseModel"


export const listCourses = (res) => {
    Course.find()
    .then(courses => {
        return res.json(courses);
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: "failed to fetch courses: " + err.errmsg
        })
    })
}

export const getCourse = (res, courseId) => {
    Course.findOne({_id: courseId})
    .then(course => {
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "course has not been found"
            });
        }
        return res.json(course);
    })
    .catch(err => {
        return res.status(500).json({
            success: false,
            message: "failed to fetch course: " + err.errmsg
        })
    })
}

// requires admin role
export const createCourse = (res, params) => {
    Course.create(params)
    .then(course => {
        return res.json({
            success: true,
            message: "course has been created",
            courseId: course._id
        });
    }).catch(err => {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "invalid data format, make sure to match requirements: " + err.errmsg
        });
    })
}

export const deleteCourse = (res, courseId) => {
    Course.findOneAndRemove({ _id: courseId }) 
    .exec(function(err, course) {
        if (err) {
            return res.status(500).json({
                success: false, 
                message: "failed to delete course"
            });
        }       
        if (!course) {
            return res.status(404).json({
                success: false, 
                message: "course has not been found"
            });
        }  
        return res.json({
            success: true, 
            message: "course has been deleted"
        });
    });
}

export const enrollOnCourse = (res, courseId, secureUser) => {

    Course.findOneAndUpdate(
        {
            _id: courseId
        }, 
        {
            $addToSet: {
                enrolledStudents: secureUser.id
            }
        }
    ).then(course => {
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "course has not been found"
            });
        }
        return res.json({
            success: true,
            message: "enrolled student on a course"
        });
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "failed to enroll student on a course"
        });
    });
}

export const delistFromCourse = (res, courseId, secureUser) => {
    Course.findOneAndUpdate(
        {
            _id: courseId,
            enrolledStudents: secureUser.id
        }, 
        {
            $pull: {
                enrolledStudents: secureUser.id,
                ratings: {
                    studentId: secureUser.id
                }
            },
        }
    ).then(course => {
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "student has not been enrolled on given course"
            });
        }

        return res.json({
            success: true,
            message: "delisted student from course"
        });
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "failed to delist student on a course"
        });
    });
}

export const rateCourse = (res, courseId, rating, secureUser) => {
    Course.findOneAndUpdate(
        {
            _id: courseId,
            "ratings.studentId": {$nin: [secureUser.id]}
        },
        {
            $push: {
                ratings: {
                    studentId: secureUser.id,
                    rating: rating
                }
            }
        }
    ).then(course => {
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "student must be enrolled on a course and can rate it only once"
            });
        }
        return res.json({
            success: true,
            message: "course has been rated"
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not rate course: " + err.errmsg
        });
    });
}

export const rateCourseUpdate = (res, courseId, rating, secureUser) => {
    Course.findOneAndUpdate(
        {
            _id: courseId,
            "ratings.studentId": {$in: [secureUser.id]}
        },
        {
            $set: {
                "ratings.$.rating": rating
            }
        }
    ).then(course => {
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "student rating has not been found"
            });
        }
        return res.json({
            success: true,
            message: "course rate has been updated"
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not update course rating " + err.errmsg
        });
    });
}

export const rateCourseDelete = (res, courseId, secureUser) => {
    Course.findOneAndUpdate(
        {
            _id: courseId,
            "ratings.studentId": {$in: [secureUser.id]}
        },
        {
            $pull: {
                "ratings.studentId": {$in: [secureUser.id]}
            }
        }
    ).then(course => {
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "student rating has not been found"
            });
        }
        return res.json({
            success: true,
            message: "course rate has been deleted"
        });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "could not delete course rating " + err.errmsg
        });
    });
}