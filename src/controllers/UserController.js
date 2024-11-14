import UserService from "../services/UserService.js";
import UsersOnRolesService from "../services/UsersOnRolesService.js";
import ResponseDataBuilder from "../models/ResponseData.js";
import verifyIsAdmin from "../utils/verifyIsAdmin.js";
import RoleService from "../services/RoleService.js";

class UserController {
  constructor() {
    this.userService = new UserService();
    this.usersOnRolesService = new UsersOnRolesService();
    this.roleService = new RoleService();
  }

  findAll = async (req, res) => {
    const roles = req.query.roles.split(",").filter(r => r!=='') ?? []
    let query = {}
    
    if(roles.length > 0){
      query = {
        roles: {
          some: {
            role: {
              name: {
                in: roles,
              },
            },
          },
        },
      }
    }
    
    const users = await this.userService.find({
      ...query
    });
    
    const data = new ResponseDataBuilder()
      .setData(users)
      .setStatus(200)
      .setMsg("Users found")
      .build();

    return res.json(data);
  };

  findOne = async (req, res) => {
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

    return res.json(data);
  }

  setRole = async (req, res) => {

    const { userId, roleId } = req.body;

    const user = await this.userService.findOne(userId);

    if (!user) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("User not found")
        .build();

      return res.json(data);
    }

    const userOnRole = await this.usersOnRolesService.findOne(userId, roleId);

    if (!userOnRole) {
      const newUser = await this.usersOnRolesService.create({
        userId,
        roleId,
        assignedBy: req.id,
      });
      const data = new ResponseDataBuilder()
      .setData(newUser)
      .setStatus(200)
      .setMsg("Role set")
      .build();
      return res.json(data);
    }else{
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(409)
        .setMsg("User already has this role")
        .build();
      
        return res.json(data);
    }
  }

  unsetRole = async (req, res) => {
    const { userId, roleId } = req.body;

    const user = await this.userService.findOne(userId);

    if (!user) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("User not found")
        .build();

      return res.json(data);
    }

    const userOnRole = await this.usersOnRolesService.findOne(userId, roleId);

    if (!userOnRole) {
      const data = new ResponseDataBuilder()
        .setData(null)
        .setStatus(404)
        .setMsg("User does not have this role")
        .build();
      return res.json(data);
    }else{
      const deletedUser = await this.usersOnRolesService.delete({
        userId_roleId: {
          userId,
          roleId,
        },
      });
      const data = new ResponseDataBuilder()
        .setData(deletedUser)
        .setStatus(200)
        .setMsg("Role unset")
        .build();
      
      return res.json(data);
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

    return res.json(data);
  };

  update = async (req, res) => {
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
    const updatedUser = await this.userService.update(id, {
      ...req.body,
    });

    const data = new ResponseDataBuilder()
      .setData(updatedUser)
      .setStatus(200)
      .setMsg("User updated")
      .build();

    return res.json(data);
  };
  
  getRoles = async (req, res) => {
    const roles = await this.roleService.find({});
      
    console.log(roles)
    
    const data = new ResponseDataBuilder()
      .setData(roles)
      .setStatus(200)
      .setMsg("Roles found")
      .build();

    return res.json(data);
  };
}

export default UserController;