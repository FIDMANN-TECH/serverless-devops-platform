const authMiddleware = require("../middlewares/authMiddleware");
const { checkRole } = require("../services/rbac");

const handler = async (event) => {
  if (!checkRole(event.user, "admin")) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Admin data" })
  };
};

module.exports.getAdminData = authMiddleware(handler);