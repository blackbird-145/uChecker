// Import dependencies
const XLSX = require("xlsx");

// Import modules
let dataMod = require("./modules/dataMod");

// Define global-variables and methods
let profileData = dataMod.profileData;
let wb = dataMod.wb;
let utCheck = require("./modules/UTchk")

// declare async function uChecker (array, fn) for each data set
async function uChecker (array, fn) {

    // Declare an empty array 'results' to store the contents of the Excel file.
    let result = [];

    for (let i = 0; i < array.length; i++){
        let r = await fn (array[i]);

        result.push(r)
    }

    return result; // Will be resolved value of promise
}

// Calling the asynchronous defined above
uChecker(profileData, utCheck).then(function(results) {
    
    // Convert the JSON to sheets and store into variable
    let newWS = XLSX.utils.json_to_sheet(profileData);

    // Create new workbook and store into variable.
    let newWB = XLSX.utils.book_new();

    // Append the new worksheet (newWS) to the workbook(wb) and name the tab "New Data"  
    XLSX.utils.book_append_sheet(newWB, newWS, "New Data");

    // Write the new workbook (newWB) to the 'data' folder 
    XLSX.writeFile(newWB, "data/newData.xlsx");

}, function(reason) {
    // in case of rejection
    console.log("Something is wrong with the program. Contact the Author.")
});
