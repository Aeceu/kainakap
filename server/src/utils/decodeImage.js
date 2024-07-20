const decodeImage = (file) => {
  // Decode the base64 string to a buffer
  const base64Data = file.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  const imgBuffer = Buffer.from(base64Data, "base64");
  return imgBuffer;
};

module.exports = decodeImage;
