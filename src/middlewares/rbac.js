function checkPermission(role) {
  return (req, res, next) => {
    const userRole = req.user ? req.user.role : "anonymous";

    if (userRole.includes(role)) {
      return next();
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  };
}

export default checkPermission;
