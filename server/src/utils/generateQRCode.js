const QRCode = require("qrcode");
const GenerateQRCode = async (url) => {
  try {
    const qrImage = await QRCode.toDataURL(url);
    return qrImage;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = GenerateQRCode;
