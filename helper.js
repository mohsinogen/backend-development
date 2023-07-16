const fs = require("fs");

// Function to read array of objects from JSON file
function read(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    throw new Error("Error reading file:", err);
  }
}

module.exports = {
    read
}