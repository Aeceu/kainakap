const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../utils/dbConnect");
const cloudinary = require("../utils/cloudinary");
const transporter = require("../utils/transporter");
const GenerateQRCode = require("../utils/generateQRCode");
const calculateExpirationDate = require("../utils/calculateExpDate");

const signup = async (req, res) => {
  const { newUser } = req.body;

  try {
    // Check if user already exists
    const [userExists] = await connection
      .promise()
      .query("SELECT * FROM `user` WHERE `email` = ?", [newUser.email]);

    if (userExists.length > 0) {
      return res.status(403).json({ message: "Email already registered!" });
    }

    // Hash the password
    const hashPass = await bcrypt.hash(newUser.password, 12);
    const newID = uuid();

    // Insert new user
    const [userResult] = await connection.promise().query(
      `INSERT INTO \`user\` (
          \`id\`, 
          \`firstName\`, 
          \`middleName\`, 
          \`lastName\`, 
          \`suffix\`, 
          \`age\`, 
          \`birthdate\`, 
          \`birthplace\`, 
          \`gender\`, 
          \`religion\`, 
          \`citizenship\`, 
          \`civil\`, 
          \`email\`, 
          \`phone\`, 
          \`landline\`, 
          \`houseno\`, 
          \`street\`, 
          \`baranggay\`, 
          \`city\`, 
          \`province\`, 
          \`region\`, 
          \`zipcode\`, 
          \`elementary\`, 
          \`attain\`, 
          \`highschool\`, 
          \`attain1\`, 
          \`senior\`, 
          \`attain2\`, 
          \`college\`, 
          \`attain3\`, 
          \`employment\`, 
          \`occupation\`, 
          \`yearEmploy\`, 
          \`skill1\`, 
          \`skill2\`, 
          \`yearUnemploy\`, 
          \`skill1_1\`, 
          \`skill2_1\`, 
          \`blood\`, 
          \`height\`, 
          \`weight\`, 
          \`disability\`, 
          \`visibility\`, 
          \`made_disabled\`, 
          \`status\`, 
          \`device\`, 
          \`specificDevice\`, 
          \`medicine\`, 
          \`specificMedicine\`, 
          \`others\`, 
          \`password\`, 
          \`role\`
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        newID,
        newUser.firstName,
        newUser.middleName,
        newUser.lastName,
        newUser.suffix,
        newUser.age,
        newUser.birthdate,
        newUser.birthplace,
        newUser.gender,
        newUser.religion,
        newUser.citizenship,
        newUser.civil,
        newUser.email,
        newUser.phone,
        newUser.landline,
        newUser.houseno,
        newUser.street,
        newUser.baranggay,
        newUser.city,
        newUser.province,
        newUser.region,
        newUser.zipcode,
        newUser.elementary,
        newUser.attain,
        newUser.highschool,
        newUser.attain1,
        newUser.senior,
        newUser.attain2,
        newUser.college,
        newUser.attain3,
        newUser.employment,
        newUser.occupation,
        newUser.yearEmploy,
        newUser.skill1,
        newUser.skill2,
        newUser.yearUnemploy,
        newUser.skill1_1,
        newUser.skill2_1,
        newUser.blood,
        newUser.height,
        newUser.weight,
        newUser.disability,
        newUser.visibility,
        newUser.made_disabled,
        newUser.status,
        newUser.device,
        newUser.specificDevice,
        newUser.medicine,
        newUser.specificMedicine,
        newUser.others,
        hashPass,
        "user",
      ]
    );

    // Insert emergency person data
    await connection.promise().query(
      `INSERT INTO \`emergency_person\` (
          \`id\`, 
          \`firstName\`, 
          \`middleName\`, 
          \`lastName\`, 
          \`suffix\`, 
          \`age\`, 
          \`gender\`, 
          \`relationship\`, 
          \`religion\`, 
          \`email\`, 
          \`phone\`, 
          \`landline\`, 
          \`houseno\`, 
          \`street\`, 
          \`baranggay\`, 
          \`city\`, 
          \`province\`, 
          \`region\`, 
          \`zipcode\`, 
          \`userId\`
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        uuid(),
        newUser.emergency_person.firstName,
        newUser.emergency_person.middleName,
        newUser.emergency_person.lastName,
        newUser.emergency_person.suffix,
        newUser.emergency_person.age,
        newUser.emergency_person.gender,
        newUser.emergency_person.relationship,
        newUser.emergency_person.religion,
        newUser.emergency_person.email,
        newUser.emergency_person.phone,
        newUser.emergency_person.landline,
        newUser.emergency_person.houseno,
        newUser.emergency_person.street,
        newUser.emergency_person.baranggay,
        newUser.emergency_person.city,
        newUser.emergency_person.province,
        newUser.emergency_person.region,
        newUser.emergency_person.zipcode,
        newID,
      ]
    );

    // Generate QR code and upload to Cloudinary
    const qrCodeLink = `https://yourdomain.com/user/${newID}`;
    const qrCodeImage = await GenerateQRCode(qrCodeLink);
    const resultUpload = await cloudinary.uploader.upload(qrCodeImage, {
      folder: "kainakap/qrcode",
    });

    // Update user with QR code info
    await connection.promise().query(`UPDATE \`user\` SET \`qr_code\` = ? WHERE \`id\` = ?`, [
      JSON.stringify({
        image_id: resultUpload.public_id,
        secure_url: resultUpload.secure_url,
      }),
      newID,
    ]);

    console.log("New user created:", userResult);
    res.status(200).json({ message: "New user created!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to signup!",
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;

    // Check if user already exists
    const [userExists] = await connection
      .promise()
      .query("SELECT * FROM `user` WHERE `email` = ?", [data.email]);

    if (userExists.length <= 0) {
      return res.status(403).json("User does not exists!");
    }

    const validPass = await bcrypt.compare(data.password, userExists[0].password);
    if (!validPass) {
      return res.status(400).json("Invalid password!");
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: data.email,
      subject: "Verfiy your email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the signup</p><p> This code <b>expires in 1 hour</b>.</p>`,
    };

    const hashOTP = await bcrypt.hash(otp, 10);

    await connection.promise().query(
      `INSERT INTO \`otp\`(
        \`id\`, 
        \`userId\`, 
        \`otpCode\`, 
        \`createdAt\`, 
        \`updatedAt\`, 
        ) VALUES (?, ?, ?, ?, ?)`,
      [uuid(), userExists[0].id, hashOTP, new Date().toISOString(), calculateExpirationDate()]
    );

    await transporter.sendMail(mailOption);
    res.status(200).json({
      status: "PENDING",
      message: "Verification otp email sent",
      id: userExists[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!otp || !userId) return res.status(400).json("Please input the otp code!");

    // Fetch OTP record
    const [otpRecords] = await connection
      .promise()
      .query("SELECT * FROM `otp` WHERE `userId` = ?", [userId]);

    if (otpRecords.length === 0) {
      return res
        .status(403)
        .json("Account record doesn't exist or has been verified already. Please sign up or login");
    }

    const otpRecord = otpRecords[0];
    const { updatedAt } = otpRecord;
    const hashOTP = otpRecord.otpCode;

    const now = new Date();
    if (new Date(updatedAt) < now) {
      connection.promise().query("DELETE FROM `otp` WHERE `userId` = ?", [userId]);
      return res.status(403).json("Code has expired. Please request again");
    }

    // Validate OTP
    const validOTP = await bcrypt.compare(otp, hashOTP);
    if (!validOTP) {
      return res.status(403).json("Invalid code. Please check your inbox again");
    }

    // Fetch user data
    const [users] = await connection
      .promise()
      .query("SELECT * FROM `user` WHERE `id` = ?", [userId]);

    if (users.length === 0) return res.status(403).json("User does not exist!");

    const user = users[0];

    // Delete OTP record
    await connection.promise().query("DELETE FROM `otp` WHERE `userId` = ?", [userId]);

    // Generate tokens
    const user_data = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(user_data, process.env.TOKEN_SECRET, {
      expiresIn: "10s",
    });
    const userRefreshToken = jwt.sign(user_data, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Update user with refresh token
    connection
      .promise()
      .query("UPDATE `user` SET `refreshToken` = ? WHERE `id` = ?", [userRefreshToken, user.id]);

    // Send the refresh token as a cookie
    res.cookie("jwt", userRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Exclude sensitive data from user
    const userWithoutPass = { ...user };
    delete userWithoutPass.password;
    delete userWithoutPass.refreshToken;

    // Send response
    res.status(200).json({
      message: `${user.role} AUTHENTICATED!`,
      accessToken,
      user: userWithoutPass,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to verify OTP!",
      error,
    });
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await connection
    .promise()
    .query("SELECT * from `user` WHERE `refreshToken` = ?", [refreshToken]);

  if (foundUser.length <= 0) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser?.email !== decoded.email) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      {
        user_data: {
          id: foundUser.id,
          email: foundUser.email,
          role: foundUser.role,
        },
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "10s",
      }
    );

    delete foundUser[0].password;
    delete foundUser[0].refreshToken;
    res.json({ user: userWithoutPass, accessToken });
  });
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(24);

  const refreshToken = cookies.jwt;
  const foundUser = await connection
    .promise()
    .query("SELECT * from `user` WHERE `refreshToken` = ?", [refreshToken]);

  if (foundUser.length <= 0) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  const userFound = foundUser[0];
  await connection
    .promise()
    .query("UPDATE `user` SET `refreshToken` = NULL WHERE `id` = ?", [userFound.id]);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.status(200).send("Cookie removed");
};

const getUsersColumn = async (req, res) => {
  const userId = req.params.userId;
  let data = {};
  try {
    // Fetch user data
    const [userResult] = await connection
      .promise()
      .query("SELECT * FROM user WHERE id = ?", [userId]);
    if (userResult.length > 0) {
      data = userResult[0];
    } else {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch emergency_person data
    const [emergencyPersonResult] = await connection
      .promise()
      .query("SELECT * FROM emergency_person WHERE userId = ?", [userId]);
    if (emergencyPersonResult.length > 0) {
      data.emergency_person = emergencyPersonResult[0];
    } else {
      return res.status(404).json({ message: "Emergency contact not found" });
    }

    // Respond with combined data
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  const createEmergencyPersonTableSQL = `
  CREATE TABLE IF NOT EXISTS \`emergency_person\` (
    \`id\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`firstName\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`middleName\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`lastName\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`suffix\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    \`age\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`gender\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`relationship\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`religion\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`email\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`phone\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`landline\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`houseno\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`street\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`baranggay\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`city\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    \`province\` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    \`region\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`zipcode\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
    \`userId\` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    PRIMARY KEY (\`id\`),
    FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;
  try {
    connection.query("SELECT * FROM user", (err, result) => {
      if (err) {
        console.log(err);
        res.status(403).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { signup, getUsers, getUsersColumn, login, verifyOTP, handleRefreshToken, logout };
