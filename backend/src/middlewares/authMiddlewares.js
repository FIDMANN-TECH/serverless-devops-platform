const { verifyToken } = require("../services/jwt");

module.exports = (handler) => async (event) => {
  try {
    const token = event.headers.Authorization;
    const user = verifyToken(token);

    event.user = user;
    return handler(event);

  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized" })
    };
  }
};