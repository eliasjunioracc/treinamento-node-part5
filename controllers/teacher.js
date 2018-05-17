module.exports = (app) => {
    const TeacherModel = app.models.teacher;
    const UserModel = app.models.user;
    const JWTManager = app.utils.jwt;
    return {
        create: (req, res) => {
            try {
                const bcrypt = require('bcrypt-nodejs');
                let passwordHash = bcrypt.hashSync(req.body.password);
                const teacher = new TeacherModel(req.body);
                teacher.save()
                    .then(() => {
                        const user = new UserModel(req.body);
                        user.password = passwordHash;
                        user.teacher_id = teacher._id;
                        user.save()
                            .then(() => {
                                res.json({
                                    status: 'success',
                                    data: 'Teacher successfully registered'
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
                    from: "teachers",
                    localField: "teacher_id",
                    foreignField: "_id",
                    as: "teachers"
                },
            }, {
                $unwind: "$teachers"
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
                .populate('teacher')
                .then((result) => {
                    res.json({
                        status: 'success',
                        data: result
                    });
                }).catch(error => {
                    res.json({
                        status: 'error',
                        data: 'Teacher not found'
                    });
                });
        }
    };
}