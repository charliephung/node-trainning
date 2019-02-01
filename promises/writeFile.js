const { writeFile } = require("fs");
const { promisify } = require("util");

const writeFilePromise = promisify(writeFile);

writeFilePromise("text.txt", "Hello world")
  .then(() => {
    console.log("Success");
  })
  .catch(err => {
    console.log(err);
  });
