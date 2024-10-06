const authorization = {
  admin: async (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized as admin" });
    }
  },
  member: async (req, res, next) => {
    if (req.user && req.user.role === "Member") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized as member" });
    }
  },
};

module.exports = authorization;
