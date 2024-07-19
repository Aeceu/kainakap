const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");

const cloudinary = require("../utils/cloudinary");
const connection = require("../utils/dbConnect");
const GenerateQRCode = require("../utils/generateQRCode");

const signup = async (req, res) => {
  const { newUser } = req.body;

  try {
    // Check if user already exists
    const [userExists] = await connection
      .promise()
      .query("SELECT * FROM `user` WHERE `email` = ?", [newUser.email]);

    if (userExists.length > 0) {
      return res.status(403).json("Email already registered!");
    }

    // Hash the password
    const hashPass = await bcrypt.hash(newUser.password, 12);
    const newID = uuid();
    // Insert new user
    const [result] = await connection.promise().query(
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

    const newUserId = newID;
    const qrCodeLink = `https://yourdomain.com/user/${newUserId}`;
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
      newUserId,
    ]);
    console.log(result);
    res.status(200).json("New user created!");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to signup!",
      error,
    });
  }
};

const getUsersColumn = async (req, res) => {
  try {
    connection.query("describe user;", (err, result) => {
      if (err) {
        console.log(err);
        res.status(403).json(err);
      }

      res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    connection.query("select * from user ", (err, result) => {
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

module.exports = { signup, getUsers, getUsersColumn };
