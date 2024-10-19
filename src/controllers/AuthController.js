import AuthService from "../services/UserService.js";

class AuthController {
  constructor() {
    this.userService = new AuthService();
  }

  login = async (req, res) => {
    const id = req.id;

    const user = await this.userService.findOne(id);

    if (user) {
      // get user
      res.json(user);
    } else {
      // create user in db
      const userCreated = await this.userService.create({
        ...req.body,
        id: id
      });

      console.log(userCreated);

      res.json(userCreated);
    }
  };
}

export default AuthController;
