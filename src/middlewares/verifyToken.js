import auth from "../config/firebase.js";
import ResponseDataBuilder from "../models/ResponseData.js";

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.split(" ")[1]) {
    const response = new ResponseDataBuilder()
      .setStatus(401)
      .setError("invalid token")
      .setMsg("unauthorized")
      .build();

    return res.status(401).json(response);
  }

  token = token.split(" ")[1];

  auth
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const uid = decodedToken.uid;
      req.id = uid;
      next();
    })
    .catch(() => {
      const response = new ResponseDataBuilder()
        .setStatus(401)
        .setError("invalid token")
        .setMsg("unauthorized")
        .build();

      return res.status(401).json(response);
    });
};

export default verifyToken;
