module.exports = app => {
    const TeacherController = app.controllers.teacher;
    const Auth = app.middlewares.auth;
    
    app.post('/teachers', TeacherController.create);
    app.get('/teachers', Auth.authOne, TeacherController.findAll);
    app.get('/teachers/:id', Auth.authOne, TeacherController.findById);
}