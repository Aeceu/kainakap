const uuid = require("uuid").v4;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../utils/dbConnect");
const cloudinary = require("../utils/cloudinary");
const transporter = require("../utils/transporter");
const GenerateQRCode = require("../utils/generateQRCode");
const calculateExpirationDate = require("../utils/calculateExpDate");
const { getUserByIdQuery, getUsersQuery } = require("../queries/getUserById");

const signup = async (req, res) => {
  const { newUser, files, idData } = req.body;

  try {
    // Check if user already exists
    const [userExists] = await connection
      .promise()
      .query("SELECT * FROM `user` WHERE `email` = ?", [newUser.email]);

    if (userExists.length > 0) {
      return res.status(403).json({ message: "Email already registered!" });
    }

    // Check if user already exists
    const [users] = await connection.promise().query(
      `SELECT * FROM user WHERE
              (firstName = ? AND lastName = ?) OR
              (firstName = ? AND lastName = ? AND middleName = ?)
              `,
      [newUser.firstName, newUser.lastName, newUser.firstName, newUser.lastName, newUser.middleName]
    );

    if (users.length > 0) {
      return res.status(403).json({
        message: `${newUser.firstName}, ${newUser.middleName} ${newUser.lastName} is already registered!`,
      });
    }

    // * PROCEED WITH REGISTRATION AFTER VERIFICATION

    const hashPass = await bcrypt.hash(newUser.password, 12);
    const newID = uuid();

    // Upload files to Cloudinary and get URLs
    const uploadPromises = Object.keys(files).map(async (key) => {
      if (files[key]) {
        const result = await cloudinary.uploader.upload(files[key], {
          folder: `kainakap/user_files/${newUser.lastName}`,
        });
        return { key, public_id: result.public_id, secure_url: result.secure_url };
      }
    });

    const uploadResults = await Promise.all(uploadPromises);

    // Prepare data for insertion
    const fileData = {
      profile_photo_id: "",
      profile_photo_url: "",
      resume_id: "",
      resume_url: "",
      pwd_id_id: "",
      pwd_id_url: "",
      brgy_residence_certificate_id: "",
      brgy_residence_certificate_url: "",
      medical_certificate_id: "",
      medical_certificate_url: "",
      proof_of_disability_id: "",
      proof_of_disability_url: "",
      valid_id_no: idData.idNumber,
      valid_id_id: "",
      valid_id_url: "",
    };

    uploadResults.forEach((item) => {
      switch (item.key) {
        case "profilePhoto":
          fileData.profile_photo_id = item.public_id;
          fileData.profile_photo_url = item.secure_url;
          break;
        case "resume":
          fileData.resume_id = item.public_id;
          fileData.resume_url = item.secure_url;
          break;
        case "pwd_id":
          fileData.pwd_id_id = item.public_id;
          fileData.pwd_id_url = item.secure_url;
          break;
        case "baranggay_residence_certificate":
          fileData.brgy_residence_certificate_id = item.public_id;
          fileData.brgy_residence_certificate_url = item.secure_url;
          break;
        case "medical_certificate":
          fileData.medical_certificate_id = item.public_id;
          fileData.medical_certificate_url = item.secure_url;
          break;
        case "proof_of_disability":
          fileData.proof_of_disability_id = item.public_id;
          fileData.proof_of_disability_url = item.secure_url;
          break;
        case "valid_id":
          fileData.valid_id_id = item.public_id;
          fileData.valid_id_url = item.secure_url;
          break;
        default:
          break;
      }
    });

    // Insert new user
    await connection.promise().query(
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
        newUser.emergencyPerson.firstName,
        newUser.emergencyPerson.middleName,
        newUser.emergencyPerson.lastName,
        newUser.emergencyPerson.suffix,
        newUser.emergencyPerson.age,
        newUser.emergencyPerson.gender,
        newUser.emergencyPerson.relationship,
        newUser.emergencyPerson.religion,
        newUser.emergencyPerson.email,
        newUser.emergencyPerson.phone,
        newUser.emergencyPerson.landline,
        newUser.emergencyPerson.houseno,
        newUser.emergencyPerson.street,
        newUser.emergencyPerson.baranggay,
        newUser.emergencyPerson.city,
        newUser.emergencyPerson.province,
        newUser.emergencyPerson.region,
        newUser.emergencyPerson.zipcode,
        newID,
      ]
    );

    // Inset user_files of user
    await connection.promise().query(
      `INSERT INTO \`user_files\` (
          \`id\`, 
          \`userId\`,
          \`profile_photo_id\`,
          \`profile_photo_url\`,
          \`resume_id\`,
          \`resume_url\`,
          \`pwd_id_id\`,
          \`pwd_id_url\`,
          \`brgy_residence_certificate_id\`,
          \`brgy_residence_certificate_url\`,
          \`medical_certificate_id\`,
          \`medical_certificate_url\`,
          \`proof_of_disability_id\`,
          \`proof_of_disability_url\`,
          \`valid_id_no\`,
          \`valid_id_id\`,
          \`valid_id_url\`
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        uuid(),
        newID,
        fileData.profile_photo_id,
        fileData.profile_photo_url,
        fileData.resume_id,
        fileData.resume_url,
        fileData.pwd_id_id,
        fileData.pwd_id_url,
        fileData.brgy_residence_certificate_id,
        fileData.brgy_residence_certificate_url,
        fileData.medical_certificate_id,
        fileData.medical_certificate_url,
        fileData.proof_of_disability_id,
        fileData.proof_of_disability_url,
        fileData.valid_id_no,
        fileData.valid_id_id,
        fileData.valid_id_url,
      ]
    );

    // Generate QR code and upload to Cloudinary
    const qrCodeLink = `https://pwd-kainakap.vercel.app/user/${newID}`;
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
        \`expiredAt\`
        ) VALUES (?, ?, ?, ?, ?)`,
      [uuid(), userExists[0].id, hashOTP, new Date(), calculateExpirationDate()]
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
    const [users] = await connection.promise().query(getUserByIdQuery, [userId]);
    if (users.length === 0) return res.status(403).json("User does not exist!");
    const user = users[0];

    const result = {
      id: user.userID,
      firstName: user.userFirstName,
      middleName: user.userMiddleName,
      lastName: user.userLastName,
      suffix: user.userSuffix,
      age: user.userAge,
      birthdate: user.userBirthdate,
      birthplace: user.userBirthplace,
      gender: user.userGender,
      religion: user.userReligion,
      citizenship: user.userCitizenship,
      civil: user.userCivil,
      email: user.userEmail,
      phone: user.userPhone,
      landline: user.userLandline,
      houseno: user.userHouseno,
      street: user.userStreet,
      baranggay: user.userBaranggay,
      city: user.userCity,
      province: user.userProvince,
      region: user.userRegion,
      zipcode: user.userZipcode,
      elementary: user.userElementary,
      attain: user.userAttain,
      highschool: user.userHighschool,
      attain1: user.userAttain1,
      senior: user.userSenior,
      attain2: user.userAttain2,
      college: user.userCollege,
      attain3: user.userAttain3,
      employment: user.userEmployment,
      occupation: user.userOccupation,
      yearEmploy: user.userYearEmploy,
      skill1: user.userSkill1,
      skill2: user.userSkill2,
      yearUnemploy: user.userYearUnemploy,
      skill1_1: user.userSkill1_1,
      skill2_1: user.userSkill2_1,
      blood: user.userBlood,
      height: user.userHeight,
      weight: user.userWeight,
      disability: user.userDisability,
      visibility: user.userVisibility,
      made_disabled: user.userMadeDisabled,
      status: user.userStatus,
      device: user.userDevice,
      specificDevice: user.userSpecificDevice,
      medicine: user.userMedicine,
      specificMedicine: user.userSpecificMedicine,
      others: user.userOthers,
      role: user.userRole,
      verificationStatus: user.verificationStatus,
      qr_code: user.userQRCode,
      emergencyPerson: {
        firstName: user.emergencyPersonFirstName,
        middleName: user.emergencyPersonMiddleName,
        lastName: user.emergencyPersonLastName,
        suffix: user.emergencyPersonSuffix,
        age: user.emergencyPersonAge,
        gender: user.emergencyPersonGender,
        relationship: user.emergencyPersonRelationship,
        religion: user.emergencyPersonReligion,
        email: user.emergencyPersonEmail,
        phone: user.emergencyPersonPhone,
        landline: user.emergencyPersonLandline,
        houseno: user.emergencyPersonHouseno,
        street: user.emergencyPersonStreet,
        baranggay: user.emergencyPersonBaranggay,
        city: user.emergencyPersonCity,
        province: user.emergencyPersonProvince,
        region: user.emergencyPersonRegion,
        zipcode: user.emergencyPersonZipcode,
      },
      userFiles: {
        profilePhotoId: user.profilePhotoId,
        profilePhotoUrl: user.profilePhotoUrl,
        resumeId: user.resumeId,
        resumeUrl: user.resumeUrl,
        pwdIdId: user.pwdIdId,
        pwdIdUrl: user.pwdIdUrl,
        brgyResidenceCertificateId: user.brgyResidenceCertificateId,
        brgyResidenceCertificateUrl: user.brgyResidenceCertificateUrl,
        medicalCertificateId: user.medicalCertificateId,
        medicalCertificateUrl: user.medicalCertificateUrl,
        proofOfDisabilityId: user.proofOfDisabilityId,
        proofOfDisabilityUrl: user.proofOfDisabilityUrl,
        validIdId: user.validIdId,
        validIdNo: user.validIdNo,
        validIdUrl: user.validIdUrl,
      },
    };

    // Delete OTP record
    await connection.promise().query("DELETE FROM `otp` WHERE `userId` = ?", [userId]);

    // Generate tokens
    const user_data = {
      id: user.userID,
      email: user.userEmail,
      role: user.userRole,
    };

    const accessToken = jwt.sign(user_data, process.env.TOKEN_SECRET, {
      expiresIn: "10s",
    });
    const userRefreshToken = jwt.sign(user_data, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Update user with refresh token
    const [rt_result] = await connection
      .promise()
      .query("UPDATE `user` SET `refreshToken` = ? WHERE `id` = ?", [userRefreshToken, userId]);

    // Send the refresh token as a cookie
    res.cookie("jwt", userRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send response
    res.status(200).json({
      message: `${result.role} AUTHENTICATED!`,
      accessToken,
      user: result,
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
  const [foundUser] = await connection
    .promise()
    .query("SELECT * from `user` WHERE `refreshToken` = ?", [refreshToken]);
  if (foundUser.length <= 0) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err || foundUser[0].email !== decoded.email) {
      return res.sendStatus(403);
    }
    const [rows] = await connection.promise().query(getUserByIdQuery, [decoded.id]);
    const user = rows[0];

    const result = {
      id: user.userID,
      firstName: user.userFirstName,
      middleName: user.userMiddleName,
      lastName: user.userLastName,
      suffix: user.userSuffix,
      age: user.userAge,
      birthdate: user.userBirthdate,
      birthplace: user.userBirthplace,
      gender: user.userGender,
      religion: user.userReligion,
      citizenship: user.userCitizenship,
      civil: user.userCivil,
      email: user.userEmail,
      phone: user.userPhone,
      landline: user.userLandline,
      houseno: user.userHouseno,
      street: user.userStreet,
      baranggay: user.userBaranggay,
      city: user.userCity,
      province: user.userProvince,
      region: user.userRegion,
      zipcode: user.userZipcode,
      elementary: user.userElementary,
      attain: user.userAttain,
      highschool: user.userHighschool,
      attain1: user.userAttain1,
      senior: user.userSenior,
      attain2: user.userAttain2,
      college: user.userCollege,
      attain3: user.userAttain3,
      employment: user.userEmployment,
      occupation: user.userOccupation,
      yearEmploy: user.userYearEmploy,
      skill1: user.userSkill1,
      skill2: user.userSkill2,
      yearUnemploy: user.userYearUnemploy,
      skill1_1: user.userSkill1_1,
      skill2_1: user.userSkill2_1,
      blood: user.userBlood,
      height: user.userHeight,
      weight: user.userWeight,
      disability: user.userDisability,
      visibility: user.userVisibility,
      made_disabled: user.userMadeDisabled,
      status: user.userStatus,
      device: user.userDevice,
      specificDevice: user.userSpecificDevice,
      medicine: user.userMedicine,
      specificMedicine: user.userSpecificMedicine,
      others: user.userOthers,
      role: user.userRole,
      verificationStatus: user.verificationStatus,
      qr_code: user.userQRCode,
      emergencyPerson: {
        firstName: user.emergencyPersonFirstName,
        middleName: user.emergencyPersonMiddleName,
        lastName: user.emergencyPersonLastName,
        suffix: user.emergencyPersonSuffix,
        age: user.emergencyPersonAge,
        gender: user.emergencyPersonGender,
        relationship: user.emergencyPersonRelationship,
        religion: user.emergencyPersonReligion,
        email: user.emergencyPersonEmail,
        phone: user.emergencyPersonPhone,
        landline: user.emergencyPersonLandline,
        houseno: user.emergencyPersonHouseno,
        street: user.emergencyPersonStreet,
        baranggay: user.emergencyPersonBaranggay,
        city: user.emergencyPersonCity,
        province: user.emergencyPersonProvince,
        region: user.emergencyPersonRegion,
        zipcode: user.emergencyPersonZipcode,
      },
      userFiles: {
        profilePhotoId: user.profilePhotoId,
        profilePhotoUrl: user.profilePhotoUrl,
        resumeId: user.resumeId,
        resumeUrl: user.resumeUrl,
        pwdIdId: user.pwdIdId,
        pwdIdUrl: user.pwdIdUrl,
        brgyResidenceCertificateId: user.brgyResidenceCertificateId,
        brgyResidenceCertificateUrl: user.brgyResidenceCertificateUrl,
        medicalCertificateId: user.medicalCertificateId,
        medicalCertificateUrl: user.medicalCertificateUrl,
        proofOfDisabilityId: user.proofOfDisabilityId,
        proofOfDisabilityUrl: user.proofOfDisabilityUrl,
        validIdId: user.validIdId,
        validIdNo: user.validIdNo,
        validIdUrl: user.validIdUrl,
      },
    };

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
    res.json({ user: result, accessToken });
  });
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

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
  try {
    // const user_table = [];
    // const emergency_person_table = [];
    // const admin_table = [];
    // const user_files_table = [];

    // const [user_schema] = await connection.promise().query("DESCRIBE user");
    // user_schema.map((item) => user_table.push(`${item.Field}, ${item.Type}`));

    // const [emergency_person_schema] = await connection.promise().query("DESCRIBE emergency_person");
    // emergency_person_schema.map((item) =>
    //   emergency_person_table.push(`${item.Field}, ${item.Type}`)
    // );

    // const [admin_schema] = await connection.promise().query("DESCRIBE admin");
    // admin_schema.map((item) => admin_table.push(`${item.Field}, ${item.Type}`));

    // const [user_files_schema] = await connection.promise().query("DESCRIBE user_files");
    // user_files_schema.map((item) => user_files_table.push(`${item.Field}, ${item.Type}`));
    // res.status(200).json({ user_table, emergency_person_table, admin_table, user_files_table });

    const [result] = await connection.promise().query("SELECT * from user_files");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    connection.query(getUsersQuery, (err, result) => {
      if (err) {
        console.log(err);

        res.status(403).json(err);
      } else {
        const users = result.map((user) => ({
          id: user.userID,
          firstName: user.userFirstName,
          middleName: user.userMiddleName,
          lastName: user.userLastName,
          suffix: user.userSuffix,
          age: user.userAge,
          birthdate: user.userBirthdate,
          birthplace: user.userBirthplace,
          gender: user.userGender,
          religion: user.userReligion,
          citizenship: user.userCitizenship,
          civil: user.userCivil,
          email: user.userEmail,
          phone: user.userPhone,
          landline: user.userLandline,
          houseno: user.userHouseno,
          street: user.userStreet,
          baranggay: user.userBaranggay,
          city: user.userCity,
          province: user.userProvince,
          region: user.userRegion,
          zipcode: user.userZipcode,
          elementary: user.userElementary,
          attain: user.userAttain,
          highschool: user.userHighschool,
          attain1: user.userAttain1,
          senior: user.userSenior,
          attain2: user.userAttain2,
          college: user.userCollege,
          attain3: user.userAttain3,
          employment: user.userEmployment,
          occupation: user.userOccupation,
          yearEmploy: user.userYearEmploy,
          skill1: user.userSkill1,
          skill2: user.userSkill2,
          yearUnemploy: user.userYearUnemploy,
          skill1_1: user.userSkill1_1,
          skill2_1: user.userSkill2_1,
          blood: user.userBlood,
          height: user.userHeight,
          weight: user.userWeight,
          disability: user.userDisability,
          visibility: user.userVisibility,
          made_disabled: user.userMadeDisabled,
          status: user.userStatus,
          device: user.userDevice,
          specificDevice: user.userSpecificDevice,
          medicine: user.userMedicine,
          specificMedicine: user.userSpecificMedicine,
          others: user.userOthers,
          role: user.userRole,
          verificationStatus: user.verificationStatus,
          qr_code: user.userQRCode,
          emergencyPerson: {
            firstName: user.emergencyPersonFirstName,
            middleName: user.emergencyPersonMiddleName,
            lastName: user.emergencyPersonLastName,
            suffix: user.emergencyPersonSuffix,
            age: user.emergencyPersonAge,
            gender: user.emergencyPersonGender,
            relationship: user.emergencyPersonRelationship,
            religion: user.emergencyPersonReligion,
            email: user.emergencyPersonEmail,
            phone: user.emergencyPersonPhone,
            landline: user.emergencyPersonLandline,
            houseno: user.emergencyPersonHouseno,
            street: user.emergencyPersonStreet,
            baranggay: user.emergencyPersonBaranggay,
            city: user.emergencyPersonCity,
            province: user.emergencyPersonProvince,
            region: user.emergencyPersonRegion,
            zipcode: user.emergencyPersonZipcode,
          },
          userFiles: {
            profilePhotoId: user.profilePhotoId,
            profilePhotoUrl: user.profilePhotoUrl,
            resumeId: user.resumeId,
            resumeUrl: user.resumeUrl,
            pwdIdId: user.pwdIdId,
            pwdIdUrl: user.pwdIdUrl,
            brgyResidenceCertificateId: user.brgyResidenceCertificateId,
            brgyResidenceCertificateUrl: user.brgyResidenceCertificateUrl,
            medicalCertificateId: user.medicalCertificateId,
            medicalCertificateUrl: user.medicalCertificateUrl,
            proofOfDisabilityId: user.proofOfDisabilityId,
            proofOfDisabilityUrl: user.proofOfDisabilityUrl,
            validIdId: user.validIdId,
            validIdNo: user.validIdNo,
            validIdUrl: user.validIdUrl,
          },
        }));
        res.status(200).json(users);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserByID = async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await connection.promise().query(getUserByIdQuery, [userId]);
    const user = rows[0];

    const result = {
      refreshToken: user.refreshToken,
      id: user.userID,
      firstName: user.userFirstName,
      middleName: user.userMiddleName,
      lastName: user.userLastName,
      suffix: user.userSuffix,
      age: user.userAge,
      birthdate: user.userBirthdate,
      birthplace: user.userBirthplace,
      gender: user.userGender,
      religion: user.userReligion,
      citizenship: user.userCitizenship,
      civil: user.userCivil,
      email: user.userEmail,
      phone: user.userPhone,
      landline: user.userLandline,
      houseno: user.userHouseno,
      street: user.userStreet,
      baranggay: user.userBaranggay,
      city: user.userCity,
      province: user.userProvince,
      region: user.userRegion,
      zipcode: user.userZipcode,
      elementary: user.userElementary,
      attain: user.userAttain,
      highschool: user.userHighschool,
      attain1: user.userAttain1,
      senior: user.userSenior,
      attain2: user.userAttain2,
      college: user.userCollege,
      attain3: user.userAttain3,
      employment: user.userEmployment,
      occupation: user.userOccupation,
      yearEmploy: user.userYearEmploy,
      skill1: user.userSkill1,
      skill2: user.userSkill2,
      yearUnemploy: user.userYearUnemploy,
      skill1_1: user.userSkill1_1,
      skill2_1: user.userSkill2_1,
      blood: user.userBlood,
      height: user.userHeight,
      weight: user.userWeight,
      disability: user.userDisability,
      visibility: user.userVisibility,
      made_disabled: user.userMadeDisabled,
      status: user.userStatus,
      device: user.userDevice,
      specificDevice: user.userSpecificDevice,
      medicine: user.userMedicine,
      specificMedicine: user.userSpecificMedicine,
      others: user.userOthers,
      role: user.userRole,
      verificationStatus: user.verificationStatus,
      qr_code: user.userQRCode,
      emergencyPerson: {
        firstName: user.emergencyPersonFirstName,
        middleName: user.emergencyPersonMiddleName,
        lastName: user.emergencyPersonLastName,
        suffix: user.emergencyPersonSuffix,
        age: user.emergencyPersonAge,
        gender: user.emergencyPersonGender,
        relationship: user.emergencyPersonRelationship,
        religion: user.emergencyPersonReligion,
        email: user.emergencyPersonEmail,
        phone: user.emergencyPersonPhone,
        landline: user.emergencyPersonLandline,
        houseno: user.emergencyPersonHouseno,
        street: user.emergencyPersonStreet,
        baranggay: user.emergencyPersonBaranggay,
        city: user.emergencyPersonCity,
        province: user.emergencyPersonProvince,
        region: user.emergencyPersonRegion,
        zipcode: user.emergencyPersonZipcode,
      },
      userFiles: {
        profilePhotoId: user.profilePhotoId,
        profilePhotoUrl: user.profilePhotoUrl,
        resumeId: user.resumeId,
        resumeUrl: user.resumeUrl,
        pwdIdId: user.pwdIdId,
        pwdIdUrl: user.pwdIdUrl,
        brgyResidenceCertificateId: user.brgyResidenceCertificateId,
        brgyResidenceCertificateUrl: user.brgyResidenceCertificateUrl,
        medicalCertificateId: user.medicalCertificateId,
        medicalCertificateUrl: user.medicalCertificateUrl,
        proofOfDisabilityId: user.proofOfDisabilityId,
        proofOfDisabilityUrl: user.proofOfDisabilityUrl,
        validIdId: user.validIdId,
        validIdNo: user.validIdNo,
        validIdUrl: user.validIdUrl,
      },
    };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUserByID = async (req, res) => {
  const userId = req.params.userId;
  try {
    // Step 1: Get user information including file details
    const [userResult] = await connection.promise().query(
      `
        SELECT 
          qr_code,
          user_files.profile_photo_id,
          user_files.resume_id,
          user_files.pwd_id_id,
          user_files.brgy_residence_certificate_id,
          user_files.medical_certificate_id,
          user_files.proof_of_disability_id,
          user_files.valid_id_id
        FROM user
        LEFT JOIN user_files ON user.id = user_files.userId
        WHERE user.id = ?
      `,
      [userId]
    );

    if (userResult.length === 0) {
      res.status(404).json("User not found");
      return;
    }

    const user = userResult[0];

    // Step 2: Delete images from Cloudinary
    const fileIds = [
      user.qr_code.image_id,
      user.profile_photo_id,
      user.resume_id,
      user.pwd_id_id,
      user.brgy_residence_certificate_id,
      user.medical_certificate_id,
      user.proof_of_disability_id,
      user.valid_id_id,
    ];

    const deletePromises = fileIds
      .filter((id) => id) // Filter out null or undefined ids
      .map((id) => cloudinary.uploader.destroy(id));

    await Promise.all(deletePromises);

    // Step 3: Delete user record
    const [deleteResult] = await connection
      .promise()
      .query("DELETE FROM user WHERE id = ?", [userId]);

    if (deleteResult.affectedRows === 0) {
      res.status(404).json("User not found");
      return;
    }

    res.status(200).json("User deleted successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserByQR = async (req, res) => {
  try {
    const userId = req.params.userId;

    const [rows] = await connection.promise().query(getUserByIdQuery, [userId]);

    const user = rows[0];
    const result = {
      id: user.userID,
      firstName: user.userFirstName,
      middleName: user.userMiddleName,
      lastName: user.userLastName,
      suffix: user.userSuffix,
      age: user.userAge,
      birthdate: user.userBirthdate,
      birthplace: user.userBirthplace,
      gender: user.userGender,
      religion: user.userReligion,
      citizenship: user.userCitizenship,
      civil: user.userCivil,
      email: user.userEmail,
      phone: user.userPhone,
      landline: user.userLandline,
      houseno: user.userHouseno,
      street: user.userStreet,
      baranggay: user.userBaranggay,
      city: user.userCity,
      province: user.userProvince,
      region: user.userRegion,
      zipcode: user.userZipcode,
      elementary: user.userElementary,
      attain: user.userAttain,
      highschool: user.userHighschool,
      attain1: user.userAttain1,
      senior: user.userSenior,
      attain2: user.userAttain2,
      college: user.userCollege,
      attain3: user.userAttain3,
      employment: user.userEmployment,
      occupation: user.userOccupation,
      yearEmploy: user.userYearEmploy,
      skill1: user.userSkill1,
      skill2: user.userSkill2,
      yearUnemploy: user.userYearUnemploy,
      skill1_1: user.userSkill1_1,
      skill2_1: user.userSkill2_1,
      blood: user.userBlood,
      height: user.userHeight,
      weight: user.userWeight,
      disability: user.userDisability,
      visibility: user.userVisibility,
      made_disabled: user.userMadeDisabled,
      status: user.userStatus,
      device: user.userDevice,
      specificDevice: user.userSpecificDevice,
      medicine: user.userMedicine,
      specificMedicine: user.userSpecificMedicine,
      others: user.userOthers,
      role: user.userRole,
      verificationStatus: user.verificationStatus,
      qr_code: user.userQRCode,
      emergencyPerson: {
        firstName: user.emergencyPersonFirstName,
        middleName: user.emergencyPersonMiddleName,
        lastName: user.emergencyPersonLastName,
        suffix: user.emergencyPersonSuffix,
        age: user.emergencyPersonAge,
        gender: user.emergencyPersonGender,
        relationship: user.emergencyPersonRelationship,
        religion: user.emergencyPersonReligion,
        email: user.emergencyPersonEmail,
        phone: user.emergencyPersonPhone,
        landline: user.emergencyPersonLandline,
        houseno: user.emergencyPersonHouseno,
        street: user.emergencyPersonStreet,
        baranggay: user.emergencyPersonBaranggay,
        city: user.emergencyPersonCity,
        province: user.emergencyPersonProvince,
        region: user.emergencyPersonRegion,
        zipcode: user.emergencyPersonZipcode,
      },
      userFiles: {
        profilePhotoId: user.profilePhotoId,
        profilePhotoUrl: user.profilePhotoUrl,
        resumeId: user.resumeId,
        resumeUrl: user.resumeUrl,
        pwdIdId: user.pwdIdId,
        pwdIdUrl: user.pwdIdUrl,
        brgyResidenceCertificateId: user.brgyResidenceCertificateId,
        brgyResidenceCertificateUrl: user.brgyResidenceCertificateUrl,
        medicalCertificateId: user.medicalCertificateId,
        medicalCertificateUrl: user.medicalCertificateUrl,
        proofOfDisabilityId: user.proofOfDisabilityId,
        proofOfDisabilityUrl: user.proofOfDisabilityUrl,
        validIdId: user.validIdId,
        validIdNo: user.validIdNo,
        validIdUrl: user.validIdUrl,
      },
    };
    if (!user) {
      return res.status(403).json("User not found!");
    }
    const user_data = {
      id: user.userID,
      email: user.userEmail,
      role: user.userRole,
    };

    const accessToken = jwt.sign(user_data, process.env.TOKEN_SECRET, {
      expiresIn: "10s",
    });
    const userRefreshToken = jwt.sign(user_data, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Update user with refresh token
    const [rt_result] = await connection
      .promise()
      .query("UPDATE `user` SET `refreshToken` = ? WHERE `id` = ?", [userRefreshToken, userId]);

    console.log("Query Result:", rt_result);

    // Send the refresh token as a cookie
    res.cookie("jwt", userRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send response
    res.status(200).json({
      message: `${result.role} AUTHENTICATED!`,
      accessToken,
      user: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getUserByQR,
  signup,
  getUsers,
  getUsersColumn,
  login,
  verifyOTP,
  handleRefreshToken,
  logout,
  getUserByID,
  deleteUserByID,
};
