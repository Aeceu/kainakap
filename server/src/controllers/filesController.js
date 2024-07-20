const vision = require("@google-cloud/vision");
const connection = require("../utils/dbConnect");
const decodeImage = require("../utils/decodeImage");
const identifyIDType = require("../utils/identifyIdType");
const {
  extractDriversLicenseData,
  extractNationalIDData,
  extractPhilHealthData,
} = require("../utils/extractIdTypeData");

const extractDataFromID = async (req, res) => {
  try {
    const { file } = req.body;
    const image = decodeImage(file);

    const client = new vision.ImageAnnotatorClient({
      keyFilename: "./src/keys/kain-429714-633a2134f7c1.json",
    });

    const [result] = await client.textDetection(image);
    const detections = result.textAnnotations;

    if (!detections || detections.length <= 0) {
      return res.status(403).json({
        message: "Failed to scan image, Please try again!",
      });
    }

    const extractedText = detections[0].description;
    const idType = identifyIDType(extractedText);

    let resultData = null;
    if (idType === "PhilHealth ID") {
      const philHealthData = extractPhilHealthData(extractedText);
      if (philHealthData) {
        resultData = {
          idType,
          idNumber: philHealthData.idNumber,
          firstName: philHealthData.firstName,
          lastName: philHealthData.lastName,
        };
      } else {
        return res.status(403).json({
          message: "Failed to extract PhilHealth ID or name from the image.",
        });
      }
    }

    if (idType === "National ID") {
      const nationIdData = extractNationalIDData(extractedText);
      if (nationIdData) {
        resultData = {
          idType,
          idNumber: nationIdData.idNumber,
          firstName: nationIdData.firstName,
          lastName: nationIdData.lastName,
          middleName: nationIdData.middleName,
        };
      } else {
        return res.status(403).json({
          message: "Failed to extract National ID or name from the image.",
        });
      }
    }

    if (idType === "Driver's License") {
      const driversLicenseData = extractDriversLicenseData(extractedText);
      if (driversLicenseData) {
        resultData = {
          idType,
          idNumber: driversLicenseData.idNumber,
          firstName: driversLicenseData.firstName,
          lastName: driversLicenseData.lastName,
        };
      }
    }

    if (!resultData) {
      return res.status(403).json({
        message: "Failed to identify the image!",
      });
    }
    const [users] = await connection.promise().query(
      `SELECT * FROM user WHERE 
       (firstName = ? AND lastName = ?) OR 
       (firstName = ? AND lastName = ? AND middleName = ?)`,
      [
        resultData.firstName,
        resultData.lastName,
        resultData.firstName,
        resultData.lastName,
        resultData.middleName,
      ]
    );

    if (users.length > 0) {
      return res.status(403).json({
        message: `${resultData.firstName}, ${resultData.middleName ? resultData.middleName : ""} ${
          resultData.lastName
        } is already registered!`,
      });
    }

    // Checks if the id is already registered with another user.
    const [user_files_result] = await connection
      .promise()
      .query("SELECT * FROM `user_files` WHERE `valid_id_no` = ?", [resultData.idNumber]);

    if (user_files_result.length > 0) {
      return res.status(403).json({
        message: `This ID is already registered!`,
      });
    }

    res.status(200).json({
      message: "ID is verified successfully.",
      resultData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { extractDataFromID };
