const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { createUser, getUserByEmail } = require("../services/db");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../services/jwt");

exports.signup = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return { statusCode: 400, body: "Missing fields" };
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { statusCode: 400, body: "User already exists" };
    }

    const hashed = await bcrypt.hash(password, 10);

    await createUser({
      id: uuidv4(),
      email,
      password: hashed,
      role: "user"
    });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created" })
    };

  } catch {
    return { statusCode: 500, body: "Server error" };
  }
};

exports.login = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    const user = await getUserByEmail(email);
    if (!user) return { statusCode: 400, body: "User not found" };

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return { statusCode: 401, body: "Invalid credentials" };

    return {
      statusCode: 200,
      body: JSON.stringify({
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user)
      })
    };

  } catch {
    return { statusCode: 500, body: "Server error" };
  }
};