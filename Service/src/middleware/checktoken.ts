import jwt from "jsonwebtoken";

export const checkToken = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      res.status(401).json({ success: false, msg: "token is missing" });
      return;
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ");
    const decode = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET_KEY);

    if (typeof decode !== "object" || !("user" in decode) || decode.user.role === "FAN") {
      res.status(401).json({ success: false, error: "unauthorization" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
    console.log(req.headers["authorization"]);
  }
};