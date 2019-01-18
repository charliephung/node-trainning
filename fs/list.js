var fs = require("fs");

fs.readdir("../spawn", (err, fol) => {
    if (err) {
        throw err;
    }
    console.log(fol);
})
console.log("Reading...");