import ResponseDataBuilder from "../models/ResponseData.js";
import AuthService from "../services/UserService.js";

class AuthController {
  constructor() {
    this.userService = new AuthService();
  }

  login = async (req, res) => {
    const id = req.id;

    const user = await this.userService.findOne(id);

    if (user) {
      // get user from db and return it
      const data = new ResponseDataBuilder()
        .setData(user)
        .setStatus(200)
        .setMsg("User found")
        .build()

      res.json(data);
    } else {
      // create user in db and return it
      const userCreated = await this.userService.create({
        ...req.body,
        id: id,
      });

      const data = new ResponseDataBuilder()
        .setData(userCreated)
        .setStatus(201)
        .setMsg("User created")
        .build()

      res.json(data);
    }
  };
}

export default AuthController;
