const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../utils/dbConnect");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [adminExists] = await connection
      .promise()
      .query("SELECT * FROM admin WHERE email = ?", [email]);

    if (adminExists.length === 0) {
      return res.status(403).json({
        message: "Email not registered!",
      });
    }
    const admin = adminExists[0];
    const validPass = await bcrypt.compare(password, admin.password);

    if (!validPass) {
      return res.status(403).json({
        message: "Password incorrect!",
      });
    }

    // Generate tokens
    const admin_data = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
    };

    const accessToken = jwt.sign(admin_data, process.env.TOKEN_SECRET, {
      expiresIn: "10s",
    });
    const adminRefreshToken = jwt.sign(admin_data, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // Update user with refresh token
    const [rt_result] = await connection
      .promise()
      .query("UPDATE `admin` SET `refreshToken` = ? WHERE `id` = ?", [adminRefreshToken, admin.id]);

    // Send the refresh token as a cookie
    res.cookie("jwt", adminRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send response
    res.status(200).json({
      message: `${admin.role} AUTHENTICATED!`,
      accessToken,
      admin: admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const signup = async (req, res) => {
  const { newAdmin } = req.body;
  try {
    const [adminExists] = await connection
      .promise()
      .query("SELECT * FROM admin WHERE email = ?", [newAdmin.email]);

    if (adminExists.length > 0) {
      return res.status(403).json({
        message: "Email already registered!",
      });
    }

    const hashPass = await bcrypt.hash(newAdmin.password, 12);
    const newID = uuid();
    await connection.promise().query(
      `INSERT INTO \`admin\` (
        \`id\`, 
        \`userName\`, 
        \`firstName\`, 
        \`lastName\`, 
        \`phone\`, 
        \`email\`, 
        \`password\`,
        \`role\`
        ) VALUES (?,?,?,?,?,?,?,?)`,
      [
        newID,
        newAdmin.userName,
        newAdmin.firstName,
        newAdmin.lastName,
        newAdmin.phone,
        newAdmin.email,
        hashPass,
        newAdmin.role,
      ]
    );
    res.status(200).json({ message: "New admin created!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to signup!",
      error,
    });
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundAdmin = await connection
    .promise()
    .query("SELECT * from `admin` WHERE `refreshToken` = ?", [refreshToken]);

  if (foundAdmin.length <= 0) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  const adminFound = foundAdmin[0];
  await connection
    .promise()
    .query("UPDATE `admin` SET `refreshToken` = NULL WHERE `id` = ?", [adminFound.id]);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.status(200).send("Cookie removed");
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const [foundAdmin] = await connection
    .promise()
    .query("SELECT * from `admin` WHERE `refreshToken` = ?", [refreshToken]);

  if (foundAdmin.length <= 0) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err || foundAdmin[0].email !== decoded.email) {
      return res.sendStatus(403);
    }

    const admin = foundAdmin[0];
    const accessToken = jwt.sign(
      {
        admin_data: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        },
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "10s",
      }
    );
    delete admin.password;
    delete admin.refreshToken;
    res.json({ admin, accessToken });
  });
};

module.exports = { login, signup, logout, handleRefreshToken };
