import Course from "../models/courseModel"


// requires admin role
export const createCourse = (res, params) => {
    Course.create(params)
    .then(course => {
        return res.json({
            success: true,
            message: "course has been created"
        });
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "invalid data format, make sure to match requirements"
        });
    })
}

export const deleteCourse = (res, courseId) => {
    Course.findOneAndRemove({ id: courseId }) 
    .exec(function(err, course) {
        if (err) {
            return res.status(500).json({
                success: false, 
                message: "failed to delete course"
            });
        }       
        if (!item) {
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
            $push: {
                enrolledStudents: secureUser.id
            }
        }
    ).then(course => {
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
        return res.json({
            success: true,
            message: "course has been rated"
        });
    }).catch(err => {
        return res.status(500).json({
            success: false,
            message: "could not rate course: " + err.errmsg
        });
    });
}