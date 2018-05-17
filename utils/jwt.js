module.exports = (app) => {
    const JWTSECRET = 'SECRETKEY123TESTE';
    const jwt = require('jsonwebtoken');
  
  
    this.generateAuthToken = function(payload) {
      return jwt.sign(payload, JWTSECRET)
    },
  
    this.decyptAuthTokenCb = function(token, cb) {
      jwt.verify(token, JWTSECRET, function(err, decoded) {
        return cb(err, decoded);
      });
    },
  
    this.decyptAuthToken = function(token) {
      return jwt.verify(token, JWTSECRET);
    }
  
    return this;
  };