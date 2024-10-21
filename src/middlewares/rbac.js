const ROLES = {
  ADMIN: 0,
  SALES: 1,
  USER: 2,
};

function checkPermission(role) {
  return (req, res, next) => {
    const userRole = req.user ? req.user.roles : "anonymous";

    if (userRole.includes(ROLES[role])) {
      return next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  };
}

export default checkPermission;
