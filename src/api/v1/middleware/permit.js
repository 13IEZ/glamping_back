const permit = (...roles) => {

  return (req, res, next) => {

    if (!req.user) {
      return res.status(400).send({error: 'Unauthenticated'});
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).send({error: 'Unauthorized'});
    }

    next();
  };

};

module.exports = permit;