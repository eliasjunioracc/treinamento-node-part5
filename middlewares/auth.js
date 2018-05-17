module.exports = (app) => {
    const JWTManager = app.utils.jwt;
  
    this.authOne = function(req, res, next) {
      let token = req.headers['x-access-token'];
      if(!token) {
        return res.status(401).json({ error: {type: 401, message: 'Token is required'}});
      }
      JWTManager.decyptAuthTokenCb(token, (error, dataFromToken) => {
        if(error) {
          return res.status(401).json({ error: {type: 401, message: 'Invalid token [1]'}});
        }
  
        if(dataFromToken.acessLvl !== 1) {
          return res.status(401).json({ error: {type: 403, message: 'Not authorized'}});
        }
  
        return next();
      });
    };

    this.authTwo = function(req, res, next) {
      let token = req.headers['x-access-token'];
      if(!token) {
        return res.status(401).json({ error: {type: 401, message: 'Token is required'}});
      }
      JWTManager.decyptAuthTokenCb(token, (error, dataFromToken) => {
        if(error) {
          return res.status(401).json({ error: {type: 401, message: 'Invalid token [1]'}});
        }
        
        if(dataFromToken.acessLvl > 2) {
          return res.status(401).json({ error: {type: 403, message: 'Not authorized'}});
        }
  
        return next();
      });
    };
  
    return this;
  };
  