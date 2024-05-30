import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).json("you need to login");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(user);
    if (err) return res.status(403).json("token is not valid");

    req.user = user;
    next();
  });
};
