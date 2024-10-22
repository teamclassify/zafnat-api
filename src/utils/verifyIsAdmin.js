import UsersOnRoles from "../services/UsersOnRolesService.js";

const verifyIsAdmin = async (req, res) => {
  const usersOnRolesService = new UsersOnRoles();
  const user = await usersOnRolesService.find({
    userId: req.uid,
    roleId: 1,
  });

  return user.length > 0;
}

export default verifyIsAdmin;