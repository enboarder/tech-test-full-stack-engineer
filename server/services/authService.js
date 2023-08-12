class Auth {
    async validateToken(req, res, next) {
        console.log('validateToken', req.headers)
        let token = null
        if (req.headers.hasOwnProperty('authorization')) {
          token = req.get('authorization').replace('Bearer ', '')
        } else {
          token = req.query.token
        }
      
       if ((token !== undefined && token !== null && token !== '')) {
          // TODO: need to verify token
          return next();
        }
        res.status(401).json({authenticationFailureMessage: 'Authorization Denied!'})
    }
}

module.exports = new Auth();