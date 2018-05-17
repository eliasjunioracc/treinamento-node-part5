module.exports = (app) => {
    const UserModel = app.models.user;
    const JWTManager = app.utils.jwt;
    return {
        login: (req, res) => {
            const { email, password } = req.body;

            UserModel.findOne({ email })
            .then((user) => {
                user.validPassword(password, (err, isValid) => {
                    if (err || !isValid) {
                        res.json({
                            status: 'error',
                            data: 'Authentication failed. Invalid credentials'
                        });
                    } else {
                        const payload = { id: user._id, name: user.name, acessLvl: user.accessLvl };
                        const userToken = JWTManager.generateAuthToken(payload);
                        return res.json({ token: userToken });
                    }
                });
            }).catch(error => {
                res.json({
                    status: 'error',
                    data: 'Register not found'
                });
            });
        }
    };
}