const extractDriversLicenseData = (text) => {
  if (!text) return null;
  const idMatch = text.match(/\b[A-Z0-9]\d{2}-\d{2}-\d{6}\b/);
  const nameMatch = text.match(
    /Last Name[., ]? First Name[., ]? Middle Name[., ]?\n([A-Za-z-]+(?: [A-Za-z-]+)*), ([A-Z][A-Za-z. ]+)/
  );

  if (idMatch && nameMatch) {
    return {
      idNumber: idMatch[0],
      firstName: nameMatch[1].trim().toLowerCase(),
      lastName: nameMatch[2].trim().toLowerCase(),
    };
  }
  return null;
};

const extractPhilHealthData = (text) => {
  if (!text) return null;
  const idMatch = text.match(/\b\d{2}-\d{9}-\d{1}\b/);
  const nameMatch = text.match(/[A-Z]+, [A-Z ]+/);

  if (idMatch && nameMatch) {
    return {
      idNumber: idMatch[0],
      firstName: nameMatch[0].split(",")[1].trim().toLowerCase(),
      lastName: nameMatch[0].split(",")[0].trim().toLowerCase(),
    };
  }
  return null;
};

const extractNationalIDData = (text) => {
  if (!text) return null;
  const idMatch = text.match(/\b\d{4}-\d{4}-\d{4}-\d{4}\b/);
  const nameMatch = text.match(
    /Apelyido\/Last Name\n([A-Z]+)\nMga Pangalan\/Given Names\n([A-Z ]+)\nGitnang Apelyido\/Middle Name\n([A-Z]+)/
  );

  if (idMatch && nameMatch) {
    return {
      idNumber: idMatch[0],
      firstName: nameMatch[2].toLowerCase(),
      lastName: nameMatch[1].toLowerCase(),
      middleName: nameMatch[3].toLowerCase(),
    };
  }
  return null;
};

module.exports = { extractDriversLicenseData, extractNationalIDData, extractPhilHealthData };
