module.exports = app => {
    const UserController = app.controllers.user;
    
    app.post('/login', UserController.login);
}