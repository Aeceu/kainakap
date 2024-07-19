const identifyIDType = (extractedTexts) => {
  const text = extractedTexts?.toLowerCase();

  if (!text) {
    return "Text is unknown";
  }

  if (text.includes("passport") && text.includes("department of foreign affairs")) {
    return "Passport";
  } else if (text.includes("driver's license") && text.includes("land transportation office")) {
    return "Driver's License";
  } else if (text.includes("professional regulation commission")) {
    return "PRC ID";
  } else if (text.includes("unified multi-purpose id") || text.includes("umid")) {
    return "UMID";
  } else if (text.includes("philippine postal id")) {
    return "Postal ID";
  } else if (text.includes("commission on elections") || text.includes("voter's id")) {
    return "Voter's ID";
  } else if (text.includes("senior citizens")) {
    return "Senior Citizen ID";
  } else if (text.includes("person with disability") || text.includes("pwd")) {
    return "PWD ID";
  } else if (text.includes("tax identification number") || text.includes("tin")) {
    return "TIN ID";
  } else if (text.includes("philhealth")) {
    return "PhilHealth ID";
  } else if (text.includes("philippine identification card")) {
    return "National ID";
  } else if (text.includes("bureau of internal revenue") || text.includes("bir")) {
    return "BIR ID";
  } else if (text.includes("student") || text.includes("school")) {
    return "School ID";
  } else if (text.includes("alien certificate of registration") || text.includes("acr")) {
    return "ACR";
  } else if (text.includes("integrated bar of the philippines") || text.includes("ibp")) {
    return "IBP ID";
  } else if (text.includes("barangay certification") || text.includes("barangay id")) {
    return "Barangay ID";
  } else if (text.includes("overseas workers welfare administration") || text.includes("owwa")) {
    return "OWWA ID";
  } else if (
    text.includes("department of social welfare and development") ||
    text.includes("dswd")
  ) {
    return "DSWD ID";
  } else if (text.includes("seaman's book") || text.includes("marina")) {
    return "Seaman’s Book";
  } else if (text.includes("national bureau of investigation") || text.includes("nbi")) {
    return "NBI Clearance";
  } else if (text.includes("police clearance")) {
    return "Police Clearance";
  } else {
    return "Unknown ID Type";
  }
};

module.exports = identifyIDType;
