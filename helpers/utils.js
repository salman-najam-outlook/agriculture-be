const fs = require("fs");
const path = require("path");

const retriveAllFilesInDirectory = (dirPath, filesList) => {
  const files = fs.readdirSync(dirPath);
  let allFiles = filesList || [];
  files.forEach((file) => {
    const currentFilePath = path.join(dirPath, "/", file);
    if (fs.statSync(currentFilePath).isDirectory()) {
      allFiles = retriveAllFilesInDirectory(currentFilePath, allFiles);
    } else {
      allFiles.push(currentFilePath);
    }
  });
  return allFiles;
};

const  capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const orgFilter = (orgId, whereObj) => {
  if(whereObj) {
    whereObj.org_id = orgId
    return whereObj
  } else {
    return {
      org_id: orgId
    }
  }
}

const generateRandomString= (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}


const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-8) + 'A1!';
}

const generateOrgCode = (name) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, ''); 
}


module.exports = { retriveAllFilesInDirectory, capitalizeFirstLetter, orgFilter,generateRandomString, generateRandomPassword, generateOrgCode };
