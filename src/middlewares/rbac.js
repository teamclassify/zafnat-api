const ROLES = {
  ADMIN: 1,
  SALES: 3,
  USER: 2,
};

function checkPermission(role) {
  return (req, res, next) => {
    const userRole = req.user ? req.user.roles.map(r => r.roleId) : [];
    
    if (userRole.includes(ROLES[role])) {
      return next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  };
}

export default checkPermission;
