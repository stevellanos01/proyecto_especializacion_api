const User = require("../models/user");
const varityToken = require("./varify-token");

function authorize(roles = []) {
  return [
    varityToken,
    async (req, res, next) => {
      const user = await User.findById(req.user.id);
      if (!user || (roles.length && !roles.includes(user.role))) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user.role = user.role;
      next();
    },
  ];
}

module.exports = authorize;
