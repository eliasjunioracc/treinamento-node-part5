module.exports = (app) => {
    const StudentModel = app.models.student;
    const UserModel = app.models.user;
    const JWTManager = app.utils.jwt;
    const mongoose = require('mongoose');
    return {
        create: (req, res) => {
            try {
                const bcrypt = require('bcrypt-nodejs');
                let passwordHash = bcrypt.hashSync(req.body.password);
                const student = new StudentModel(req.body);
                student.save()
                    .then(() => {
                        const user = new UserModel(req.body);
                        user.password = passwordHash;
                        user.student_id = student._id;
                        user.save()
                            .then(() => {
                                res.json({
                                    status: 'success',
                                    data: 'Student successfully registered'
                                });
                            }).catch(error => {
                                res.json({
                                    status: 'error',
                                    data: 'Unexpected error',
                                    error: error.message
                                });
                            });
                    }).catch(error => {
                        res.json({
                            status: 'error',
                            data: 'Unexpected error',
                            error: error.message
                        });
                    });
            } catch (error) {
                res.json({
                    status: 'error',
                    data: 'Unexpected error',
                    error: error.message
                });
            }

        },
        findAll: (req, res) => {
            UserModel.aggregate([{
                $lookup: {
                    from: "students",
                    localField: "student_id",
                    foreignField: "_id",
                    as: "students"
                },
            }, {
                $unwind: "$students"
            },{
                $match: {
                    "students._id": mongoose.Types.ObjectId(req.query.id)
                }
            }]).then((result) => {
                res.json({
                    status: 'success',
                    data: result
                });
            }).catch(error => {
                res.json({
                    status: 'error',
                    data: 'Unexpected error',
                    error: error.message
                });
            });
        },
        findById: (req, res) => {

            const { id } = req.params;

            UserModel.findById(id)
                .populate('student')
                .then((result) => {
                    res.json({
                        status: 'success',
                        data: result
                    });
                }).catch(error => {
                    res.json({
                        status: 'error',
                        data: 'Student not found'
                    });
                });
        }
    };
}