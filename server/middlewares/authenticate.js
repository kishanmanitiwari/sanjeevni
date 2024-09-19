import jwt from "jsonwebtoken";

const jwtSecret = "your_jwt_secret"; // Ideally, store this in an environment variable

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; // Attach user info to req
    next();
  } catch (error) {
    res.status(401).send("Invalid Token");
  }
};

export default authenticate;
