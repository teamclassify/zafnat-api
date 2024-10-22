import UserService from "../services/UserService.js";
import UsersOnRolesService from "../services/UsersOnRolesService.js";
import ResponseDataBuilder from "../models/ResponseData.js";
import verifyIsAdmin from "../utils/verifyIsAdmin.js";

class UserController {
  constructor() {
    this.userService = new UserService();
    this.usersOnRolesService = new UsersOnRolesService();
  }

  findAll = async (req, res) => {

    const isAdmin = await verifyIsAdmin(req, res);

    if (!isAdmin) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(401)
        .setMsg("Unauthorized")
        .build();

      return res.json(data);
    }

    const users = await this.userService.find({});

    const data = new ResponseDataBuilder()
      .setData(users)
      .setStatus(200)
      .setMsg("Users found")
      .build();

    res.json(data);
  };

  findOne = async (req, res) => {
    const isAdmin = await verifyIsAdmin(req, res);

    if (!isAdmin) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(401)
        .setMsg("Unauthorized")
        .build();

      return res.json(data);
    }

    const id = req.params.id;

    const user = await this.userService.findOne(id);

    if (!user) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("User not found")
        .build();

      return res.json(data);
    }

    const data = new ResponseDataBuilder()
      .setData(user)
      .setStatus(200)
      .setMsg("User found")
      .build();

    res.json(data);
  }

  setRole = async (req, res) => {
    const isAdmin = await verifyIsAdmin(req, res);

    if (!isAdmin) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(401)
        .setMsg("Unauthorized")
        .build();

      return res.json(data);
    }
    const admin = await this.userService.findOne(req.id);

    const { userId, currentRoleId, newRoleId } = req.body;

    if (!userId || !currentRoleId || !newRoleId) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(400)
        .setMsg("Bad request")
        .build();

      return res.json(data);
    }
    try{
      const user = await this.usersOnRolesService.findOne(userId);

      if (!user) {
        const data = new ResponseDataBuilder()
          .setData(null)
          .setStatus(404)
          .setMsg("User not found")
          .build();

        return res.json(data);
      }else{
        const userUpdated = await this.usersOnRolesService.update(userId, currentRoleId,{
          roleId: newRoleId,
          assignedBy: admin.email
        });
        const data = new ResponseDataBuilder()
          .setData(userUpdated)
          .setStatus(200)
          .setMsg("Role set")
          .build();
        res.json(data);
      }
    }catch(err){
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(500)
        .setMsg("Internal server error")
        .build();
      res.json(data);
    }
  }

  delete = async (req, res) => {
    const id = req.id;

    if (!id) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(401)
        .setMsg("Unauthorized")
        .build();

      return res.json(data);
    }

    const user = await this.userService.findOne(id);

    if (!user) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("User not found")
        .build();

      return res.json(data);
    }

    await this.userService.delete({
      id: id,
    });

    const data = new ResponseDataBuilder()
      .setData(null)
      .setStatus(204)
      .setMsg("User deleted")
      .build();

    res.json(data);
  };
}

export default UserController;