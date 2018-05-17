exports.id = {
    id: {
        exists: true,
        in: ["params"],
        isInt: true,
        errorMessage: 'Id is Invalid'
    }
};

exports.postStudents = {
    name: {
        exists: true,
        in: ["body"],
        errorMessage: 'Name is required'
    },
    age: {
        exists: true,
        in: ["body"],
        isInt: true,
        errorMessage: 'Age is required'
    }
}
