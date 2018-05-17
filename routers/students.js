module.exports = app => {
    const StudentController = app.controllers.student;
    const Auth = app.middlewares.auth;
    
    app.post('/students', Auth.authOne, StudentController.create);
    app.get('/students' , Auth.authOne, StudentController.findAll);
    app.get('/students/:id', Auth.authTwo,  StudentController.findById);
}