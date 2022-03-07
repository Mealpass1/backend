const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (!req.headers.auth) {
    return res.json({
      status: "error",
      message: "No authorization specified",
    });
  } else {
    jwt.verify(
      req.header.auth,
      `${process.env.ADMINSECRET}`,
      async (err, decoded) => {
        if (err) {
          jwt.verify(
            req.headers.auth,
            `${process.env.SECRET}`,
            async (err, decoded) => {
              if (err) {
                return res.json({
                  status: "error",
                  message: "Not Authorised to this service",
                });
              } else {
                req.admin = false;
                next();
              }
            }
          );
        } else {
          req.admin = true;
          next();
        }
      }
    );
  }
};

module.exports = auth;
