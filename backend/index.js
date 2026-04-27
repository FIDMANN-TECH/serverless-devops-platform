const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const dynamodb = new AWS.DynamoDB.DocumentClient();

// ⚠️ In production, use environment variables
const SECRET = "mySuperSecretKey";

exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const path = event.rawPath || "/";
    const method = event.requestContext?.http?.method;

    // -----------------------------
    // SIGNUP ROUTE
    // -----------------------------
    if (path === "/signup" && method === "POST") {
      if (!body.email || !body.password) {
        return response(400, "Email and password required");
      }

      const hashedPassword = await bcrypt.hash(body.password, 10);

      const user = {
        id: uuidv4(),
        email: body.email,
        password: hashedPassword,
      };

      await dynamodb.put({
        TableName: "UsersTable",
        Item: user,
      }).promise();

      return response(201, { message: "User created successfully" });
    }

    // -----------------------------
    // LOGIN ROUTE
    // -----------------------------
    if (path === "/login" && method === "POST") {
      if (!body.email || !body.password) {
        return response(400, "Email and password required");
      }

      const result = await dynamodb.scan({
        TableName: "UsersTable",
      }).promise();

      const user = result.Items.find(u => u.email === body.email);

      if (!user) {
        return response(404, "User not found");
      }

      const isMatch = await bcrypt.compare(body.password, user.password);

      if (!isMatch) {
        return response(401, "Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "1h" }
      );

      return response(200, { accessToken: token });
    }

    // -----------------------------
    // PROTECTED ROUTE
    // -----------------------------
    if (path === "/admin" && method === "GET") {
      const token = event.headers?.Authorization;

      if (!token) {
        return response(401, "Unauthorized");
      }

      try {
        jwt.verify(token, SECRET);

        return response(200, "Welcome Admin 🚀");
      } catch (err) {
        return response(403, "Forbidden");
      }
    }

    // -----------------------------
    // DEFAULT ROUTE
    // -----------------------------
    return response(200, { message: "API running 🚀" });

  } catch (error) {
    console.error(error);
    return response(500, error.message);
  }
};

// -----------------------------
// RESPONSE HELPER
// -----------------------------
function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}